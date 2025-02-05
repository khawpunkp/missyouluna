'use client';

import { socialUrls } from '@/const/social';
import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
   return (
      <motion.footer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{
            duration: 0.5,
            ease: 'easeOut',
         }}
         className='flex flex-col gap-2 mobile:gap-1 items-center mb-2 text-primary'
      >
         <p className='text-xl mobile:text-base'>ช่องทางการติดตามลูน่า</p>
         <div className='flex gap-3 mobile:gap-2 items-center justify-center text-[32px]'>
            {socialUrls.map((url, index) => (
               <motion.div
                  key={index}
                  whileHover={{
                     scale: 1.05,
                     transition: { duration: 0.3 },
                  }}
                  className='hover:cursor-pointer !w-8 !h-8 flex items-center justify-center'
               >
                  <SocialIcon
                     target='_blank'
                     url={url}
                     className='!h-full !w-full transition-all'
                  />
               </motion.div>
            ))}
            <motion.a
               whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
               }}
               href={'https://ganknow.com/lunatrix'}
               target='_blank'
               rel='noopener noreferrer'
               className='hover:cursor-pointer rounded-full'
            >
               <picture>
                  <img
                     alt='gank'
                     src='/img/gank.png'
                     className='rounded-full !w-8 !h-8'
                  />
               </picture>
            </motion.a>
         </div>
      </motion.footer>
   );
}
