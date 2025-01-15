import Link from 'next/link'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'คิดถึงลูน่า',
   description: '#ลูน่าอยู่ไหน',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='th'>
         {/* visit https://realfavicongenerator.net/ to generate favicon for all device and place code below*/}
         <body className='m-0 min-h-screen bg-[#FECFE7] flex flex-col'>
            <nav className='px-4 h-14 bg-white/50 flex justify-between gap-4 text-primary items-center'>
               <p className='text-2xl'>LTX022</p>
               <div className='flex gap-4 text-lg mobile:text-base'>
                  <Link href={'/'}>คิดถึงลูน่า</Link>
                  <Link href={'/card-list'}>การ์ดของลูน่า</Link>
               </div>
            </nav>
            {children}
         </body>
      </html>
   )
}
