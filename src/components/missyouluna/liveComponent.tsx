import { VideoResourceDto } from '@/dto/dto';
import VideoCard from './videoCard';
import TweetButton from './tweetButton';
import { motion } from 'framer-motion';
import { childrenContainerVariants } from '@/const/animation';

export default function LiveComponent({
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
         <TweetButton />
      </motion.div>
   );
}
