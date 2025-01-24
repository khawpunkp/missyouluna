import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TimerComponent from './timerComponent';

export default function UpcomingComponent({
   data,
   targetTime,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
}) {
   return (
      <>
         <p className='text-2xl mobile:text-xl'>{'แล้วลูน่าจะกลับมา'}</p>
         <VideoCard data={data} targetTime={targetTime} />
         <p className='text-2xl mobile:text-xl align-bottom	'>
            <span>{'ในอีก '}</span>
            <span className='font-semibold'>
               <TimerComponent targetTime={targetTime} isCountdown/>
            </span>
         </p>
         <div
            className='flex flex-col items-center gap-1 hover:cursor-pointer'
            onClick={() =>
               window.open(`https://www.youtube.com/watch?v=${data.id}`)
            }
         >
            <picture>
               <img src='/img/wait.webp' alt='wait' />
            </picture>
            <p className='text-xl'>ไปรอดิ</p>
         </div>
      </>
   );
}
