import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TweetButton from './tweetButton';
import { childrenContainerVariants } from '@/const/animation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import buddhistDayjs from '@/utils/dayjs';
import { Duration } from 'dayjs/plugin/duration';

export default function LastUploadComponent({
   data,
   targetTime,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
}) {
   const [timeLeft, setTimeLeft] = useState<Duration>(buddhistDayjs.duration(0));

   useEffect(() => {
      if (!targetTime) return;
      const interval = setInterval(() => {
         const now = buddhistDayjs();
         const target = buddhistDayjs(targetTime);
         const diff = now.diff(target);
         const newDuration = buddhistDayjs.duration(diff);

         if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft(buddhistDayjs.duration(0));
         } else {
            setTimeLeft(newDuration);
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [targetTime]);

   return (
      <motion.div
         variants={childrenContainerVariants}
         className='flex flex-col gap-4 justify-center items-center'
      >
         <div className='flex flex-col gap-1 items-center'>
            <p className='text-2xl mobile:text-xl'>
               ทำไรอยู่ไม่รู้ แต่พบเห็นล่าสุดเมื่อ
            </p>
            <p className='text-2xl mobile:text-xl align-bottom'>
               <span className='font-semibold'>
                  {timeLeft.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}
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
         <TweetButton
            text={`คิดถึงลูน่าค้าบ\nไม่ได้ดูไลฟ์ลูน่ามา ${timeLeft.format(
               'D วัน HH ชั่วโมง mm นาที ss วินาที',
            )} แล้ว\n`}
         />
      </motion.div>
   );
}
