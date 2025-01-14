'use client'

import Link from 'next/link'
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
      <div className='relative flex flex-col items-center text-primary p-6'>
         <div className='fixed top-0 h-screen w-full bg-black/50 flex flex-col gap-4 items-center justify-center'>
            <p className='text-9xl text-white'>DEMO KUB</p>
            <Link className='text-xl px-4 py-2 rounded-full bg-white' href={'/'}>กลับไปหน้าก่อน</Link>
         </div>
         <p className='text-7xl mb-6 mt-6'>LTX Card List</p>
         <div className='flex gap-3 mb-6'>
            <button
               onClick={() => setFilter('')}
               className={`text-xl px-4 py-2 rounded-full border transition-all duration-300 hover:bg-primary  hover:border-white hover:text-white ${
                  filter === ''
                     ? 'bg-primary  border-white text-white'
                     : 'bg-white  border-primary'
               }`}
            >{`A - Animal (All)`}</button>
            {rare.map((r, index) => (
               <button
                  key={index}
                  onClick={() => setFilter(r.code)}
                  className={`text-xl px-4 py-2 rounded-full border transition-all duration-300 hover:bg-primary  hover:border-white hover:text-white ${
                     filter === r.code
                        ? 'bg-primary  border-white text-white'
                        : 'bg-white  border-primary'
                  }`}
               >{`${r.code} - ${r.name}`}</button>
            ))}
         </div>
         <div className='flex flex-col gap-5 bg-white w-9/12 p-8 rounded-2xl'>
            {rare
               .filter((r) => r.code === filter || filter === '')
               .map((r, index) => (
                  <div key={index} className='flex flex-col gap-4'>
                     <p className='text-2xl'>{`${r.code} - ${r.name}`}</p>
                     <div className='grid grid-cols-5 gap-6'>
                        {r.cards.map((c, index) => (
                           <img
                              key={index}
                              alt=''
                              src='/img/card-demo.png'
                              className='card-shadow bg-white rounded-2xl hover:scale-[1.03] transition-all duration-300 '
                           />
                        ))}
                     </div>
                  </div>
               ))}
         </div>
      </div>
   )
}
