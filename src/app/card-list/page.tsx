'use client'

import { Metadata, ResolvingMetadata } from 'next'
import React, { useState } from 'react'

type Props = {}

export default function page({}: Props) {
   const [filter, setFilter] = useState<string>('')

   const rare = [
      {
         code: 'C',
         name: 'Cat',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'UC',
         name: 'Unicorn',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'R',
         name: 'Rabbit',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'SR',
         name: 'Salmon Roll',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'AR',
         name: 'Alpaca Rare',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'FR',
         name: 'Flamingo Rare',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
      {
         code: 'GR',
         name: 'Giraffe',
         cards: [
            {
               code: 0,
               imgSrc: '',
            },
            {
               code: 1,
               imgSrc: '',
            },
            {
               code: 2,
               imgSrc: '',
            },
            {
               code: 3,
               imgSrc: '',
            },
            {
               code: 4,
               imgSrc: '',
            },
            {
               code: 5,
               imgSrc: '',
            },
            {
               code: 6,
               imgSrc: '',
            },
         ],
      },
   ]

   return (
      <div className='flex flex-col items-center text-primary p-6'>
         <p className='text-7xl mb-6 mt-6'>LTX Card List</p>
         <div className='flex gap-3 mb-6'>
            <button
               onClick={() => setFilter('')}
               className={`text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
                  filter === ''
                     ? 'bg-primary  border-white text-white'
                     : 'bg-white  border-primary'
               }`}
            >{`All`}</button>
            {rare.map((r, index) => (
               <button
                  key={index}
                  onClick={() => setFilter(r.code)}
                  className={`text-xl px-4 py-2 rounded-full border transition-all duration-300 ${
                     filter === r.code
                        ? 'bg-primary  border-white text-white'
                        : 'bg-white  border-primary'
                  }`}
               >{`${r.code} - ${r.name}`}</button>
            ))}
         </div>
         <div className='flex flex-col gap-5 bg-white w-8/12 p-6 rounded-2xl'>
            {rare
               .filter((r) => r.code === filter || filter === '')
               .map((r, index) => (
                  <div key={index} className='flex flex-col gap-4'>
                     <p className='text-2xl'>{`${r.code} - ${r.name}`}</p>
                     <div className='grid grid-cols-5 gap-4'>
                        {r.cards.map((c, index) => (
                           <div
                              key={index}
                              className='aspect-[3/4] bg-primary rounded-lg card-shadow hover:scale-[1.02] transition-all duration-300'
                           />
                        ))}
                     </div>
                  </div>
               ))}
         </div>
      </div>
   )
}
