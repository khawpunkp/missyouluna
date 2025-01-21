'use client'

import { socialUrls } from '@/const/social'
import { usePathname } from 'next/navigation'
import { SocialIcon } from 'react-social-icons'

export default function Footer() {
   const pathname = usePathname()   

   if (pathname !== '/')
      return (
         <footer className='flex flex-col gap-2 mobile:gap-1 items-center mb-2 text-primary'>
            <p className='text-xl mobile:text-base'>ช่องทางการติดตามลูน่า</p>
            <div className='flex gap-3 mobile:gap-2 items-center justify-center text-[32px]'>
               {socialUrls.map((url, index) => (
                  <SocialIcon
                     key={index}
                     target='_blank'
                     url={url}
                     className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer !w-8 !h-8'
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
                     className='!w-8 !h-8 rounded-full'
                  />
               </a>
            </div>
         </footer>
      )
}
