'use client'

import {
   ShoppingCartSimple,
   TipJar,
} from '@phosphor-icons/react'

import { socialUrls } from '@/const/social'
import { SocialIcon } from 'react-social-icons'

export default function Home() {
   return (
      <div className='flex gap-6 mobile:flex-col items-center justify-center w-full text-primary p-4'>
         <a
            href={'https://www.youtube.com/c/LunatrixCh?sub_confirmation=1'}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer'
         >
            <img
               alt='luna'
               src='/img/luna.png'
               className='max-h-[80vh] max-w-[40vw] mobile:max-w-[80vw] object-contain'
            />
         </a>
         <div className='flex flex-col gap-6 items-center justify-center'>
            <img
               alt='logo'
               src='/img/official-pirate.png'
               className={'max-h-[120px] mobile:w-[80vw] object-contain'}
            />
            <p className='text-2xl mobile:text-xl text-center'>
               LTX-022 aka. Lunatrix (ลูนาทริกซ์, ลูน่า)
               <br />
               Independent Vtuber, Content Creator
            </p>
            <div className='h-px w-full bg-white' />
            <p className='text-2xl mobile:text-xl text-center'>
               ติดตามลูน่าได้ทาง Social Media ต่าง ๆ<br /> ด้านล่างนี้เลย แอ้!
            </p>
            <div className='flex flex-wrap gap-3 mobile:gap-2 items-center justify-center text-[32px]'>
               {socialUrls.map((url, index) => (
                  <SocialIcon
                     key={index}
                     target='_blank'
                     url={url}
                     className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer !w-12 !h-12'
                  />
               ))}
               <a
                  href={'https://ganknow.com/lunatrix'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer rounded-full'
               >
                  <img
                     alt='gank'
                     src='/img/gank.png'
                     className='!w-12 !h-12 rounded-full'
                  />
               </a>
            </div>
            <div className='h-px w-full bg-white' />
            <div className='flex w-full gap-6 mobile:flex-col mobile:gap-2'>
               <a
                  href={'https://shop.line.me/@ltx022'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
               >
                  <ShoppingCartSimple size={24} weight='fill' />
                  <p className='text-2xl mobile:text-xl'>LINE Shop</p>
               </a>
               <a
                  href={'https://tipme.in.th/lunatrix'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer rounded-full flex justify-between bg-tertiary text-white px-4 py-2 items-center w-full'
               >
                  <TipJar size={24} weight='fill' />
                  <p className='text-2xl mobile:text-xl'>Donate via Tipme</p>
               </a>
            </div>
         </div>
      </div>
   )
}
