'use client';

import React, { useState, useEffect } from 'react';
import { getCardList } from '@/api/api';
import { RarityResourceDto } from '@/dto/dto';
import { CaretUp } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import FilterButton from '@/components/cardlist/filterButton';
import LunaLoading from '@/components/cardlist/lunaLoading';
import { motion } from 'framer-motion';
import { mainContainerVariants } from '@/const/animation';

export default function CardListPage() {
   const [filter, setFilter] = useState<string>('');
   const [loadedCount, setLoadedCount] = useState(0);
   const [isShowImage, setIsShowImage] = useState(false);

   const { data: cardListByRarity = [], isFetching } = useQuery({
      queryFn: async () => {
         const response = await getCardList();
         const data: RarityResourceDto[] = response.data;
         return data;
      },
      queryKey: ['card'],
      refetchOnWindowFocus: false,
   });

   const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };

   useEffect(() => {
      if (loadedCount === 10) {
         setIsShowImage(true);
      }
   }, [loadedCount]);

   return (
      <div className='relative w-full flex flex-col items-center text-primary p-4 mobile:px-3 mobile:pb-3'>
         {cardListByRarity[0]?.Card.slice(0, 10).map((img, index) => (
            <img
               key={index}
               className='hidden'
               src={img.imgSrc}
               alt={`Image ${index + 1}`}
               onLoad={() => setLoadedCount((count) => count + 1)}
            />
         ))}

         {!isShowImage || isFetching ? (
            <LunaLoading />
         ) : (
            <>
               <motion.button
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  whileHover={{
                     scale: 1.05,
                     transition: { duration: 0.3 },
                  }}
                  type='button'
                  title='scroll'
                  className='fixed bottom-6 right-6 p-3 mobile:p-2 text-3xl mobile:text-2xl rounded-full bg-primary/50 text-white z-50'
                  onClick={scrollToTop}
               >
                  <CaretUp weight='fill' />
               </motion.button>
               <motion.p
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  className='text-7xl mb-6 mobile:text-5xl'
               >
                  LTX Card List
               </motion.p>
               <motion.div
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  className='flex flex-wrap gap-x-3 gap-y-2 mb-6 w-full max-w-5xl text-xl mobile:text-xs items-center justify-center'
               >
                  {cardListByRarity.length > 1 && (
                     <FilterButton
                        currentFilter={filter}
                        code=''
                        onClick={() => setFilter('')}
                     >
                        <span className='mobile:hidden'>{`A - `}</span>
                        <span>{'Animal'}</span>
                     </FilterButton>
                  )}
                  {cardListByRarity.map((r, index) => (
                     <FilterButton
                        key={index}
                        code={r.code}
                        currentFilter={filter}
                        onClick={() => setFilter(r.code)}
                     >
                        <span className='mobile:hidden'>
                           {r.code}
                           {` - `}
                        </span>
                        <span>{r.title}</span>
                     </FilterButton>
                  ))}
               </motion.div>
               <motion.div
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  className='flex flex-col gap-4 bg-white max-w-7xl p-8 mobile:p-4 rounded-2xl'
               >
                  {cardListByRarity
                     .filter((r) => r.code === filter || filter === '')
                     .map((r, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                           <motion.p
                              initial={{ opacity: 0 }}
                              whileInView={{
                                 opacity: 1,
                                 transition: { duration: 0.75 },
                              }}
                              viewport={{ once: true }}
                              className='text-2xl'
                           >{`${r.code} - ${r.title}`}</motion.p>
                           <div className='grid grid-cols-5 gap-5 mobile:grid-cols-3 mobile:gap-2'>
                              {r.Card?.map((c, index) => (
                                 <motion.img
                                    key={index}
                                    whileHover={{
                                       y: -8,
                                       transition: { duration: 0.3 },
                                    }}
                                    alt={`${r.code} - ${c.runningNumber}`}
                                    src={c.imgSrc}
                                    className='card-shadow bg-white rounded-2xl mobile:rounded-lg'
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
               </motion.div>
            </>
         )}
      </div>
   );
}
