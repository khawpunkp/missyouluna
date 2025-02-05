import { childrenContainerVariants } from '@/const/animation';
import { motion } from 'framer-motion';
import TweetButton from './tweetButton';

export default function NotFoundComponent() {
   return (
      <motion.div
         variants={childrenContainerVariants}
         className='flex flex-col gap-4 justify-center items-center'
      >
         <p className='text-2xl'>หาวิดีโอไม่เจอ</p>
         <picture>
            <img
               src='/img/sad-jellyfish.jpg'
               className='max-w-52'
               alt='sad-jellyfish'
            />
         </picture>
         <TweetButton />
      </motion.div>
   );
}
