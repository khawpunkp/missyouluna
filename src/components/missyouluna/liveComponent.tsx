import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';

export default function LiveComponent({
   data,
   targetTime,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
}) {
   return (
      <>
         <p className='text-2xl mobile:text-xl'>{'ลูน่าไลฟ์อยู่ที่'}</p>
         <VideoCard data={data} targetTime={targetTime} />
         <div
            className='flex flex-col items-center gap-1 hover:cursor-pointer'
            onClick={() =>
               window.open(`https://www.youtube.com/watch?v=${data.id}`)
            }
         >
            <picture>
               <img src='/img/live.webp' alt='live' />
            </picture>
            <p className='text-xl'>ไปดูดิ</p>
         </div>
      </>
   );
}
