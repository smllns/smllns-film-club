// reusable button to go back or to moviesMain page
'use client';
import { useRouter } from 'next/navigation';
import { IoArrowBackSharp } from 'react-icons/io5';

export function BackButton({ top }: { top: string }) {
  const router = useRouter();

  const handleClick = () => {
    const referrer = document.referrer;
    const isSameOrigin = referrer.startsWith(window.location.origin);
    if (isSameOrigin && window.history.length > 1) {
      router.back();
    } else {
      router.push('/moviesMain');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`hidden md:block z-30 absolute left-4 ${top} group  w-auto cursor-pointer overflow-hidden rounded-full  bg-purple-400  p-2 px-6 text-center font-semibold`}
      >
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-xl bg-white transition-all duration-300 group-hover:scale-[100.8]'></div>
          <span className='inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0'>
            BACK
          </span>
        </div>
        <div className='absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'>
          <IoArrowBackSharp />
          <span>BACK</span>
        </div>
      </button>
      <button
        onClick={handleClick}
        className={`min-[320px]:block md:hidden z-30 absolute left-4 ${top} group  w-auto cursor-pointer overflow-hidden rounded-full  bg-purple-400  p-2 px-6 text-center font-semibold`}
      >
        <div className='flex items-center gap-2'>
          <span className='flex flex-row items-center justify-center gap-2 transition-all duration-300 '>
            <IoArrowBackSharp />
            BACK
          </span>
        </div>
      </button>
    </>
  );
}
