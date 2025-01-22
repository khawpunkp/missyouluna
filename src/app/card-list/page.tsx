'use client';

import React, { useState, useEffect } from 'react';
import { getCardList } from '@/api/api';
import { RarityResourceDto } from '@/dto/dto';
import { CaretUp } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';

export default function CardListPage() {
   const [filter, setFilter] = useState<string>('');
   const [isShowImage, setIsShowImage] = useState(false);

   const { data: cardListByRarity = [], isFetching } = useQuery({
      queryFn: async () => {
         const response = await getCardList();
         const data: RarityResourceDto[] = response.data;
         return data;
      },
      queryKey: ['card'],
   });

   const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };

   return (
      <div className='relative w-full flex flex-col items-center text-primary p-4 mobile:px-3 mobile:pb-3'>
         <img
            alt=''
            src={cardListByRarity[0]?.Card[0]?.imgSrc}
            className='hidden'
            onLoad={() =>
               setTimeout(() => {
                  setIsShowImage(true);
               }, 500)
            }
         />
         <button
            type='button'
            title='scroll'
            className='fixed bottom-6 right-6 p-[18px] mobile:p-2 text-4xl mobile:text-2xl rounded-full bg-primary/50 text-white z-50'
            onClick={scrollToTop}
         >
            <CaretUp weight='fill' />
         </button>

         <p className='text-7xl mb-6 mobile:text-5xl'>LTX Card List</p>

         {!isShowImage || isFetching ? (
            <div className='h-full w-full flex justify-center items-center'>
               <picture>
                  <img
                     alt='loading'
                     src='/img/luna_fast.png'
                     className='animate-reverse-spin h-32'
                  />
               </picture>
            </div>
         ) : (
            <>
               <div className='flex flex-wrap gap-2 mb-6 w-full mobile:max-w-[90vw] max-w-[1000px] text-xl mobile:text-xs items-center justify-center'>
                  {cardListByRarity.length > 1 && (
                     <button
                        type='button'
                        onClick={() => setFilter('')}
                        className={`mobile:h-8 mobile:w-[31%] w-[24%] py-2 rounded-full border transition-all duration-300 hover:bg-primary hover:border-white hover:text-white ${
                           filter === ''
                              ? 'bg-primary border-white text-white'
                              : 'bg-white border-primary'
                        }`}
                     >
                        <span className='mobile:hidden'>{`A - `}</span>
                        <span>{'Animal'}</span>
                     </button>
                  )}
                  {cardListByRarity.map((r, index) => (
                     <button
                        type='button'
                        key={index}
                        onClick={() => setFilter(r.code)}
                        className={`mobile:h-8 mobile:w-[31%] w-[24%] py-2 rounded-full border transition-all duration-300 hover:bg-primary hover:border-white hover:text-white ${
                           filter === r.code
                              ? 'bg-primary border-white text-white'
                              : 'bg-white border-primary'
                        }`}
                     >
                        <span className='mobile:hidden'>
                           {r.code}
                           {` - `}
                        </span>
                        <span>{r.title}</span>
                     </button>
                  ))}
               </div>
               <div className='flex flex-col gap-4 bg-white max-w-[1320px] p-8 mobile:p-4 rounded-2xl'>
                  {cardListByRarity
                     .filter((r) => r.code === filter || filter === '')
                     .map((r, index) => (
                        <div key={index} className='flex flex-col gap-4'>
                           <p className='text-2xl'>{`${r.code} - ${r.title}`}</p>
                           <div className='grid grid-cols-5 gap-5 mobile:grid-cols-3 mobile:gap-2'>
                              {r.Card?.map((c, index) => (
                                 <picture key={index}>
                                    <img
                                       alt=''
                                       src={c.imgSrc}
                                       className='card-shadow bg-white rounded-2xl mobile:rounded-lg hover:scale-[1.03] transition-all duration-300'                                      
                                    />
                                 </picture>
                              ))}
                           </div>
                        </div>
                     ))}
               </div>
            </>
         )}
      </div>
   );
}
