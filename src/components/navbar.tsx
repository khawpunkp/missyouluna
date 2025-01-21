'use client'

import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
   return (
      <nav className='px-4 h-14 bg-white/50 fixed w-full top-0 z-10 backdrop-filter backdrop-blur-sm flex justify-between gap-4 text-primary items-center'>
         <Link className='hover:scale-[1.03]' href={'/'}>
            <img alt='logo' src='/img/logo-small-fill.png' className={'h-[40px] hover:scale-[1.05] transition-all duration-300 '} />
         </Link>
         <div className='flex gap-4 text-lg mobile:text-base'>
            <Link href={'/missyouluna'} className='hover:scale-[1.05] transition-all duration-300'>คิดถึงลูน่า</Link>
            <Link href={'/card-list'} className='hover:scale-[1.05] transition-all duration-300'>การ์ดของลูน่า</Link>
         </div>
         {/* <List size={32}/> */}
      </nav>
   )
}
