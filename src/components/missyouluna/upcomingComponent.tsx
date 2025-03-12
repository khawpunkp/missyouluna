import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TweetButton from './tweetButton';
import { motion } from 'framer-motion';
import { childrenContainerVariants } from '@/const/animation';
import { Duration } from 'dayjs/plugin/duration';
import { useState, useEffect } from 'react';
import buddhistDayjs from '@/utils/dayjs';

export default function UpcomingComponent({
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
         const diff = target.diff(now);
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
         <motion.p className='text-2xl mobile:text-xl'>
            {'แล้วลูน่าจะกลับมา'}
         </motion.p>
         <VideoCard data={data} targetTime={targetTime} />
         <motion.p className='text-2xl mobile:text-xl align-bottom	'>
            <span>{'ในอีก '}</span>
            <span className='font-semibold'>
               {timeLeft.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}
            </span>
         </motion.p>
         <motion.a
            className='flex flex-col items-center gap-1 hover:cursor-pointer'
            href={`https://www.youtube.com/watch?v=${data.id}`}
            target='_blank'
            rel='noopener noreferrer'
         >
            <picture>
               <img src='/img/wait.webp' alt='wait' />
            </picture>
            <p className='text-xl'>ไปรอดิ</p>
         </motion.a>
         <TweetButton
            text={`คิดถึงลูน่าค้าบ\nแต่กำลังจะได้ดูลูน่าไลฟ์ในอีก ${timeLeft.format(
               'D วัน HH ชั่วโมง mm นาที ss วินาที',
            )} เย่\nไปรอกัน\nhttps://www.youtube.com/watch?v=${data.id}\n#Trixarium`}
         />
      </motion.div>
   );
}
