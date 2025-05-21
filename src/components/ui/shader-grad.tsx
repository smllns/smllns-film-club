// background component
'use client';
import React, { CSSProperties } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

interface ShaderGradProps {
  style?: CSSProperties;
}

const ShaderGrad: React.FC<ShaderGradProps> = ({ style }) => {
  return (
    <ShaderGradientCanvas
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
      lazyLoad={false}
      fov={undefined}
      pixelDensity={1}
      pointerEvents='none'
    >
      <ShaderGradient
        animate='on'
        type='waterPlane'
        wireframe={false}
        shader='defaults'
        uTime={8}
        uSpeed={0.3}
        uStrength={1.5}
        uDensity={1.5}
        uFrequency={0}
        uAmplitude={0}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        color1='#3b88ab'
        color2='#a55be0'
        color3='#212121'
        reflection={0.1}
        cAzimuthAngle={180}
        cPolarAngle={80}
        cDistance={2.8}
        cameraZoom={9.1}
        lightType='3d'
        brightness={1}
        envPreset='city'
        grain='off'
        toggleAxis={false}
        zoomOut={false}
        hoverState=''
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
};

export default ShaderGrad;
