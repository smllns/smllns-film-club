// reusable card for hero search component
import { slugify } from '@/lib/slugify';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Item {
  Date: string;
  Name: string;
  Year: string;
  Rating: string;
}

const FilmListItem = ({ ...item }: Item) => {
  return (
    <Link
      href={`/movies/${slugify(item.Name)}?title=${encodeURIComponent(
        item.Name
      )}&year=${item.Year}`}
    >
      <figure
        className={cn(
          'relative mx-auto min-h-fit w-full max-w-[800px] cursor-pointer overflow-hidden rounded-2xl p-4',
          'transition-all duration-200 ease-in-out hover:scale-[103%] hover:bg-black/5',
          'transform-gpu bg-transparent backdrop-blur-md [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#86dae85a_inset]'
        )}
      >
        <div className='flex flex-col overflow-hidden'>
          <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium text-white '>
            <span className='text-md sm:text-lg'>{item.Name}</span>
          </figcaption>
          <div className='flex flex-row justify-between'>
            <p className='text-md font-normal text-white/60'>
              filmed in {item.Year}
            </p>
            <p className='text-md font-normal text-white/60 min-[320px]:hidden sm:block'>
              i rated it on{' '}
              {new Date(item.Date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <p className='text-md font-normal text-white/60'>
              my rating: {item.Rating}/5
            </p>
          </div>
        </div>
      </figure>
    </Link>
  );
};
export default FilmListItem;
