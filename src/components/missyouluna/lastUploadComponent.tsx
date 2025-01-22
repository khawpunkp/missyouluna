import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TimerComponent from './timerComponent';

export default function LastUploadComponent({
   data,
   targetTime,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
}) {
   return (
      <>
         <div className='flex flex-col gap-1 items-center'>
            <p className='text-2xl mobile:text-xl'>
               ทำไรอยู่ไม่รู้ แต่พบเห็นล่าสุดเมื่อ
            </p>
            <p className='text-2xl mobile:text-xl align-bottom'>
               <span className='font-semibold'>
                  <TimerComponent targetTime={targetTime} />
               </span>
               <span>{' ที่แล้ว'}</span>
            </p>
         </div>
         <VideoCard data={data} targetTime={targetTime} isUpload />
         <div className='flex flex-col items-center gap-1'>
            <picture>
               <img src='/img/finished.webp' alt='missing' />
            </picture>
            <p className='text-xl'>#ลูน่าไปไหน</p>
         </div>
      </>
   );
}
