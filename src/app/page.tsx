'use client';

import {
   Info,
   PaintBrush,
   ShoppingCartSimple,
   TipJar,
} from '@phosphor-icons/react';

import { socialUrls } from '@/const/social';
import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';
import {
   mainContainerVariants,
   childrenContainerVariants,
} from '@/const/animation';
import { useQuery } from '@tanstack/react-query';
import { getHomeImage } from '@/api/api';
import { HomeImage } from '@/dto/dto';
import { useState } from 'react';
import { preloadImages } from '@/utils/utils';

export default function Home() {
   const [imgIndex, setImgIndex] = useState<number>(-1);

   const { data: homeImage, isFetching } = useQuery({
      queryFn: async () => {
         const response = await getHomeImage();
         const data: HomeImage[] = response.data;
         preloadImages(data.map((e) => e.imgSrc));
         return data;
      },
      queryKey: ['img'],
      refetchOnWindowFocus: false,
   });

   return (
      <motion.div className='p-4 overflow-hidden w-full flex items-center justify-center'>
         <motion.div
            variants={mainContainerVariants}
            initial='hidden'
            animate='show'
            className='max-w-7xl flex gap-8 mobile:flex-col mobile:gap-4 items-center justify-center w-full text-primary '
         >
            <motion.div
               variants={{
                  hidden: { opacity: 0, scale: 0 },
                  show: {
                     opacity: 1,
                     scale: 1,
                     transition: {
                        duration: 0.5,
                        staggerChildren: 0.2,
                        scale: {
                           type: 'spring',
                           visualDuration: 0.5,
                           bounce: 0.5,
                        },
                     },
                  },
               }}
               className='max-h-[80vh] object-contain w-1/2 mobile:w-full hover:cursor-pointer aspect-square flex items-center justify-center'
               onClick={() => {
                  if (!isFetching)
                     setImgIndex(
                        Math.floor(Math.random() * (homeImage?.length ?? 0)),
                     );
               }}
            >
               <img
                  alt='luna'
                  className='h-full object-contain'
                  src={
                     imgIndex === -1
                        ? '/img/luna.png'
                        : homeImage?.[imgIndex].imgSrc
                  }
               />
            </motion.div>
            <motion.div
               variants={childrenContainerVariants}
               className='flex flex-col gap-6 mobile:gap-4  items-center justify-center w-1/2 mobile:w-full'
            >
               <motion.img
                  variants={childrenContainerVariants}
                  alt='logo'
                  src='/img/official-pirate.png'
                  className={'max-h-[120px] mobile:w-full object-contain'}
               />
               <motion.p
                  variants={childrenContainerVariants}
                  className='text-2xl mobile:text-xl text-center overflow-auto'
               >
                  LTX022, ลูนาทริกซ์, ลูน่า
                  <br />
                  Independent Vtuber, Content Creator
               </motion.p>
               <motion.div className='h-px w-full bg-white' />
               <motion.p
                  variants={childrenContainerVariants}
                  className='text-2xl mobile:text-xl text-center'
               >
                  ติดตามลูน่าได้ทาง Social Media ต่าง ๆ<br /> ด้านล่างนี้เลย
                  แอ้!
               </motion.p>
               <motion.div
                  variants={{
                     hidden: { opacity: 0, scale: 0 },
                     show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                           duration: 0.5,
                           staggerChildren: 0.05,
                           scale: {
                              type: 'spring',
                              visualDuration: 0.5,
                              bounce: 0.5,
                           },
                        },
                     },
                  }}
                  className='flex flex-wrap gap-3 mobile:gap-2 items-center justify-center text-[32px]'
               >
                  {socialUrls.map((url, index) => (
                     <motion.div
                        key={index}
                        variants={childrenContainerVariants}
                        whileHover={{
                           scale: 1.05,
                           transition: { duration: 0.3 },
                        }}
                        className='hover:cursor-pointer !w-12 !h-12 mobile:!w-8 mobile:!h-8 flex items-center justify-center'
                     >
                        <SocialIcon
                           target='_blank'
                           url={url}
                           className='!h-full !w-full transition-all'
                        />
                     </motion.div>
                  ))}
                  <motion.a
                     variants={childrenContainerVariants}
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
                           className='!w-12 !h-12 rounded-full mobile:!w-8 mobile:!h-8'
                        />
                     </picture>
                  </motion.a>
               </motion.div>
               <motion.div className='h-px w-full bg-white' />
               <motion.div
                  variants={{
                     hidden: { opacity: 0, scale: 0 },
                     show: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                           duration: 0.5,
                           staggerChildren: 0.2,
                           scale: {
                              type: 'spring',
                              visualDuration: 0.5,
                              bounce: 0.5,
                           },
                        },
                     },
                  }}
                  className='grid grid-cols-2 mobile:grid-cols-1 w-full gap-x-6 gap-y-4 mobile:gap-4'
               >
                  <motion.a
                     variants={childrenContainerVariants}
                     whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                     }}
                     href={'https://shop.line.me/@ltx022'}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
                  >
                     <ShoppingCartSimple size={24} weight='fill' />
                     <p className='text-xl flex'>LINE Shop</p>
                  </motion.a>
                  <motion.a
                     variants={childrenContainerVariants}
                     whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                     }}
                     href={'https://tipme.in.th/lunatrix'}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
                  >
                     <TipJar size={24} weight='fill' />
                     <p className='text-xl'>Donate via Tipme</p>
                  </motion.a>
                  <motion.a
                     variants={childrenContainerVariants}
                     whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                     }}
                     href={'https://ltx022.carrd.co/#guide'}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
                  >
                     <Info size={24} weight='fill' />
                     <p className='text-xl'>Fan Work Guidelines</p>
                  </motion.a>
                  <motion.a
                     variants={childrenContainerVariants}
                     whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                     }}
                     href={'https://ltx022.carrd.co/#char'}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
                  >
                     <PaintBrush size={24} weight='fill' />
                     <p className='text-xl'>Character Ref. Sheet</p>
                  </motion.a>
               </motion.div>
            </motion.div>
         </motion.div>
      </motion.div>
   );
}
