// adapted from a CodePen concept: https://codepen.io/ksenia-k/pen/NWmMxLg
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { SparklesText } from './ui/sparkles-text';
import Magnet from './ui/magnetic-effect';
import { FlipLink } from './ui/reveal-links';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface SocialLink {
  href: string;
  icon: ReactNode;
}

interface MotionLink {
  href: string;
  text: string;
  className: string;
}

interface MotionBlock {
  key: string;
  label: string;
  link: MotionLink;
}

interface GooeyOverlayProps {
  socialLinks: SocialLink[];
  motionBlocks: MotionBlock[];
}

const GooeyOverlay: React.FC<GooeyOverlayProps> = ({
  socialLinks,
  motionBlocks,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollMsgRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLButtonElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const socialCardRef = useRef<HTMLDivElement>(null);
  const letterboxdRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const tmdbRef = useRef<HTMLDivElement>(null);

  const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

  const params = {
    scrollProgress: 0,
    col_width: 0.62,
    speed: 0.7,
    scale: 0.15,
    seed: 0.47,
    color: [0.933, 0.682, 0.792],
  };

  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !pageRef.current ||
      !scrollMsgRef.current ||
      !scrollArrowRef.current ||
      !contactRef.current ||
      !socialCardRef.current ||
      !letterboxdRef.current ||
      !emailRef.current ||
      !tmdbRef.current
    ) {
      console.error('Required DOM elements are missing');
      return;
    }

    const canvas = canvasRef.current;
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      console.error('WebGL is not supported by your browser.');
      return;
    }
    glRef.current = gl;

    // Vertex Shader
    const vsSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      void main() {
        vUv = a_position;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_scroll_progr;
      uniform float u_col_width;
      uniform float u_seed;
      uniform float u_scale;
      uniform float u_time;
      uniform float u_speed;
      uniform float u_opacity;
      uniform vec3 u_color;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float get_l(vec2 v) {
        return 1. - clamp(0., 1., length(v));
      }

      float rand(float n) {
        return fract(sin(n) * 43758.5453123);
      }

      void main() {
        float scale = .001 * u_scale;
        float speed = .1 * u_speed;
        vec2 uv = vUv;
        uv.x *= (scale * u_resolution.x);
        vec2 noise_uv = uv;
        noise_uv *= 5.;
        noise_uv.y *= (.25 * scale * u_resolution.y);
        noise_uv += vec2(0., u_time * 5.0 * speed);
        float shape = 0.;
        shape += snoise(noise_uv);
        shape = clamp(.5 + .5 * shape, 0., 1.);
        shape *= pow(.5 * uv.y + .7 + pow(u_scroll_progr, 2.) + (.4 * u_scroll_progr * (1. - pow(vUv.x - .2, 2.))), 10.);
        shape = clamp(shape, 0., 1.);
        float dots = 0.;
        float bars = 0.;
        float light = 0.;
        const int num_col = 9;
        for (int i = 0; i < num_col; i++) {
          vec2 col_uv = vUv;
          float start_time_offset = rand(100. * (float(i) + u_seed));
          float c_t = fract(u_time * speed + start_time_offset);
          float drop_time = .2 + .6 * rand(10. * (float(i) + u_seed));
          float before_drop_normal = c_t / drop_time;
          float before_drop_t = pow(before_drop_normal, .4) * drop_time;
          float after_drop_normal = max(0., c_t - drop_time) / (1. - drop_time);
          float after_drop_t_dot = 3. * pow(after_drop_normal, 2.) * (1. - drop_time);
          float after_drop_t_bar = pow(after_drop_normal, 2.) * (drop_time);
          float eased_drop_t = step(c_t, drop_time) * before_drop_t;
          eased_drop_t += step(drop_time, c_t) * (drop_time + after_drop_t_dot);
          col_uv.y += (1. + 3. * rand(15. * float(i))) * u_scroll_progr;
          col_uv.x *= (u_resolution.x / u_resolution.y);
          col_uv *= (7. * scale * u_resolution.y);
          col_uv.x += (u_col_width * (.5 * float(num_col) - float(i)));
          vec2 dot_uv = col_uv;
          dot_uv.y += 4. * (eased_drop_t - .5);
          float dot = get_l(dot_uv);
          dot = pow(dot, 4.);
          float drop_grow = step(c_t, drop_time) * pow(before_drop_normal, .4);
          drop_grow += step(drop_time, c_t) * mix(1., .8, clamp(7. * after_drop_normal, 0., 1.));
          dot *= drop_grow;
          dot *= step(.5, drop_time);
          dots += dot;
          vec2 bar_uv = col_uv;
          bar_uv.y += step(c_t, drop_time) * 4. * (before_drop_t - .5);
          bar_uv.y += step(drop_time, c_t) * 4. * (drop_time - after_drop_t_bar - .5);
          float bar = smoothstep(-.5, 0., bar_uv.x) * (1. - smoothstep(0., .5, bar_uv.x));
          bar = pow(bar, 4.);
          light += bar * smoothstep(.0, .1, -bar_uv.x);
          float bar_mask = smoothstep(-.2, .2, bar_uv.y);
          bar *= bar_mask;
          bars += bar;
        }
        shape += bars;
        shape = clamp(shape, 0., 1.);
        shape += dots;
        float gooey = smoothstep(.48, .5, shape);
        gooey -= .1 * smoothstep(.5, .6, shape);
        vec3 color = u_color;
        color.r += .2 * (1. - vUv.y) * (1. - u_scroll_progr);
        color *= gooey;
        color = mix(color, vec3(1.), max(0., 1. - 2. * vUv.y) * light * smoothstep(.1, .7, snoise(.5 * uv)) * (smoothstep(.49, .6, shape) - smoothstep(.6, 1., shape)));
        gl_FragColor = vec4(color, gooey);
      }
    `;

    // Initialize WebGL
    const initShader = () => {
      const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
      if (!vertexShader || !fragmentShader) {
        console.error('Failed to create shaders');
        return;
      }
      const shaderProgram = createShaderProgram(
        gl,
        vertexShader,
        fragmentShader
      );
      if (!shaderProgram) {
        console.error('Failed to create shader program');
        return;
      }

      uniformsRef.current = getUniforms(shaderProgram);

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.error('Failed to create vertex buffer');
        return;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.useProgram(shaderProgram);

      const positionLocation = gl.getAttribLocation(
        shaderProgram,
        'a_position'
      );
      if (positionLocation === -1) {
        console.error('Failed to get attribute location for a_position');
        return;
      }
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Initialize uniforms with hardcoded values
      if (uniformsRef.current.u_col_width)
        gl.uniform1f(uniformsRef.current.u_col_width, params.col_width);
      if (uniformsRef.current.u_speed)
        gl.uniform1f(uniformsRef.current.u_speed, params.speed);
      if (uniformsRef.current.u_scale)
        gl.uniform1f(uniformsRef.current.u_scale, params.scale);
      if (uniformsRef.current.u_seed)
        gl.uniform1f(uniformsRef.current.u_seed, params.seed);
      if (uniformsRef.current.u_color)
        gl.uniform3f(
          uniformsRef.current.u_color,
          params.color[0],
          params.color[1],
          params.color[2]
        );
      if (uniformsRef.current.u_opacity)
        gl.uniform1f(uniformsRef.current.u_opacity, 1.0);
    };

    const createShader = (
      gl: WebGLRenderingContext,
      sourceCode: string,
      type: number
    ) => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createShaderProgram = (
      gl: WebGLRenderingContext,
      vertexShader: WebGLShader | null,
      fragmentShader: WebGLShader | null
    ) => {
      if (!vertexShader || !fragmentShader) return null;
      const program = gl.createProgram();
      if (!program) {
        console.error('Failed to create shader program');
        return null;
      }
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(
          'Shader program linking error:',
          gl.getProgramInfoLog(program)
        );
        return null;
      }
      return program;
    };

    const getUniforms = (program: WebGLProgram) => {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i)?.name;
        if (uniformName) {
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
      }
      return uniforms;
    };

    const resizeCanvas = () => {
      if (!canvas || !glRef.current) return;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      glRef.current.viewport(0, 0, canvas.width, canvas.height);
      if (uniformsRef.current.u_resolution) {
        glRef.current.uniform2f(
          uniformsRef.current.u_resolution,
          canvas.width,
          canvas.height
        );
      }
    };

    const render = () => {
      if (!glRef.current || !uniformsRef.current.u_time) {
        console.error('Cannot render: WebGL context or uniforms missing');
        return;
      }
      const currentTime = performance.now() / 1000;
      glRef.current.uniform1f(uniformsRef.current.u_time, currentTime);
      glRef.current.uniform1f(
        uniformsRef.current.u_scroll_progr,
        params.scrollProgress
      );
      glRef.current.clear(glRef.current.COLOR_BUFFER_BIT);
      glRef.current.drawArrays(glRef.current.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    // Initialize
    initShader();
    if (glRef.current) {
      glRef.current.clearColor(0, 0, 0, 0);
      resizeCanvas();
      render();
    } else {
      console.error('WebGL initialization failed');
    }

    // GSAP Animations
    gsap.set(pageRef.current, { opacity: 1 });
    gsap.set(contactRef.current, { pointerEvents: 'none' });
    gsap.set(
      [
        socialCardRef.current,
        letterboxdRef.current,
        emailRef.current,
        tmdbRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Button animations
    gsap.fromTo(
      scrollArrowRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 1, delay: 0.3 }
    );

    // Hover and click effects
    const button = scrollArrowRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { opacity: 1, scale: 1.1, duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { opacity: 0.6, scale: 1, duration: 0.3 });
      });
      button.addEventListener('click', () => {
        gsap.to(window, {
          scrollTo: { y: pageRef.current?.scrollHeight, autoKill: false },
          duration: 1,
          ease: 'power2.out',
        });
      });
    }

    const _tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            params.scrollProgress = self.progress;
          },
        },
      })
      .to(params, { scrollProgress: 1 }, 0)
      .to(scrollArrowRef.current, { duration: 0.2, y: 50, opacity: 0 }, 0)
      .to(scrollMsgRef.current, { opacity: 0 }, 0)
      .to(socialCardRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.5)
      .to(letterboxdRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
      .to(emailRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.7)
      .to(tmdbRef.current, { opacity: 1, y: 0, duration: 0.3 }, 0.8)
      .to(contactRef.current, { pointerEvents: 'auto', duration: 0 }, 0.5)
      .progress(0);

    // Handle Resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (button) {
        button.removeEventListener('mouseenter', () => {});
        button.removeEventListener('mouseleave', () => {});
        button.removeEventListener('click', () => {});
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={pageRef}
        className='min-h-[1500px] flex flex-col items-center bg-[#3e3e3e]'
      >
        <div
          ref={scrollMsgRef}
          className='w-full h-screen flex flex-col items-center justify-center mt-10'
        >
          <SparklesText className='text-center min-[320px]:text-6xl md:text-8xl lg:text-9xl pointer-events-none'>
            Contacts
          </SparklesText>
          <button
            ref={scrollArrowRef}
            className='text-white animate-bounce cursor-pointer flex flex-col items-center pt-10 z-30'
            aria-label='Scroll down'
          >
            <svg
              className='w-8 h-8'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
            <svg
              className='w-8 h-8 mt-[-24px]'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        id='gooey-overlay'
        className='fixed top-0 left-0 w-full h-full pointer-events-none z-10'
      />
      <div
        ref={contactRef}
        id='contact'
        className='fixed top-10 left-0 w-full h-screen flex flex-col justify-center items-center gap-4 min-[320px]:gap-2 md:gap-6 z-20'
      >
        <div
          ref={socialCardRef}
          className='bg-black/50 rounded-xl min-[320px]:gap-2 sm:gap-4 min-[320px]:p-4 sm:p-8 flex flex-col items-center shadow-2xl shadow-black mx-6 mb-4'
        >
          <SparklesText className='text-center min-[320px]:text-5xl md:text-6xl'>
            CHECK OUT MY LINKS
          </SparklesText>
          <div className='flex'>
            {socialLinks.map(({ href, icon }, index) => (
              <Magnet key={index}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white text-4xl md:text-7xl hover:cursor-pointer p-5'
                >
                  {icon}
                </a>
              </Magnet>
            ))}
          </div>
        </div>

        {motionBlocks.map(({ key, label, link }) => (
          <div
            ref={key === 'letterboxd' ? letterboxdRef : emailRef}
            key={key}
            className='flex flex-col'
          >
            <p className='text-md'>{label}</p>
            <FlipLink className={link.className} href={link.href}>
              {link.text}
            </FlipLink>
          </div>
        ))}

        <a
          href='https://www.themoviedb.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          <div ref={tmdbRef} className='cursor-pointer'>
            <div className='flex min-[320px]:flex-col sm:flex-row text-center items-center min-[320px]:gap-0 sm:gap-2 mx-4'>
              <img
                src='/tmdb.svg'
                alt='TMDB Logo'
                className='min-[320px]:w-20 min-[320px]:h-20 md:w-12 md:h-12'
              />
              <p className='min-[320px]:text-sm md:text-md min-[320px]:mt-[-20px] sm:mt-0'>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default GooeyOverlay;
