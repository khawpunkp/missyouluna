import { XLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function TweetButton({ text }: { text?: string }) {
   const twitterText = !!text ? text : 'คิดถึงลูน่าค้าบ #Trixarium';
   return (
      <motion.a
         whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
         }}
         className={
            'flex gap-2 mobile:gap-1 items-center text-xl mobile:text-base rounded-full py-2 px-4 hover:cursor-pointer bg-primary text-white'
         }
         href={`https://twitter.com/intent/tweet?related=twitterapi%2Ctwitter&text=${encodeURIComponent(
            twitterText,
         )}`}
         target='_blank'
         rel='noopener noreferrer'
      >
         บอกคิดถึงลูน่าผ่าน
         <XLogo weight='duotone' className='text-[32px] mobile:text-xl' />
      </motion.a>
   );
}
