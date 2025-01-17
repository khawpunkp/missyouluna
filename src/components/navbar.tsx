'use client'

import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({}: Props) {
   return (
      <nav className='px-4 h-14 bg-white/50 fixed w-full top-0 z-10 backdrop-filter backdrop-blur-sm flex justify-between gap-4 text-primary items-center'>
         <Link className='text-3xl' href={'/'}>
            LTX022
         </Link>
         <div className='flex gap-4 text-lg mobile:text-base'>
            <Link href={'/'}>คิดถึงลูน่า</Link>
            <Link href={'/card-list'}>การ์ดของลูน่า</Link>
         </div>
         {/* <List size={32}/> */}
      </nav>
   )
}
