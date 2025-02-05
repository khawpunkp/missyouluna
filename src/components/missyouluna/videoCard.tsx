import { VideoResourceDto } from '@/dto/dto';
import { Broadcast } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import TimerComponent from './timerComponent';
import { motion } from 'framer-motion';
import { childrenContainerVariants } from '@/const/animation';

export default function VideoCard({
   data,
   targetTime,
   isUpload = false,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
   isUpload?: boolean;
}) {
   return (
      <motion.div
         whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
         }}
         onClick={() =>
            window.open(`https://www.youtube.com/watch?v=${data.id}`)
         }
         className='flex flex-col hover:cursor-pointer rounded-2xl bg-white max-w-[500px] w-full'
      >
         <div className='w-full h-fit p-2 pb-0 relative'>
            <picture>
               <img
                  src={data.snippet.thumbnails.maxres.url}
                  alt='thumbnail'
                  className='aspect-video w-full rounded-xl object-cover border'
               />
            </picture>
            {!isUpload && (
               <>
                  {data.snippet.liveBroadcastContent === 'live' && (
                     <div
                        className={
                           'absolute flex bottom-2 right-4 gap-2 text-white rounded-md p-2 bg-[#FF0000cc]'
                        }
                     >
                        {<Broadcast color='white' size={24} />}
                        <TimerComponent targetTime={targetTime} isLiveTimer />
                     </div>
                  )}
                  {data.snippet.liveBroadcastContent !== 'live' && (
                     <div
                        className={
                           'absolute flex bottom-2 right-4 gap-2 text-white rounded-md p-2 bg-[#000000cc]'
                        }
                     >
                        {<Broadcast color='white' size={24} />}
                        {dayjs(targetTime).format('ddd DD MMM เวลา HH:mm น.')}
                     </div>
                  )}
               </>
            )}
         </div>
         <div className='flex flex-col p-4'>
            <p className='text-xl'>{data.snippet.title.split('#')[0]}</p>
            {isUpload && (
               <p>
                  {'อัปโหลดเมื่อ ' +
                     dayjs(targetTime).format('DD MMM เวลา HH:mm น.')}
               </p>
            )}
         </div>
      </motion.div>
   );
}
