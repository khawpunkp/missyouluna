import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TimerComponent from './timerComponent';
import TweetButton from './tweetButton';
import { motion } from 'framer-motion';
import { childrenContainerVariants } from '@/const/animation';

export default function UpcomingComponent({
   data,
   targetTime,
}: {
   data: VideoResourceDto;
   targetTime: string | undefined;
}) {
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
               <TimerComponent targetTime={targetTime} isCountdown />
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
         <TweetButton />
      </motion.div>
   );
}
