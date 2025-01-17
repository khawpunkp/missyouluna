import Link from 'next/link'
import './globals.css'
import { Metadata } from 'next'
import ReactQueryProvider from '@/provider/reactQueryProvider'

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
         <link
            rel='icon'
            type='image/png'
            href='/favicon-96x96.png'
            sizes='96x96'
         />
         <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
         <link rel='shortcut icon' href='/favicon.ico' />
         <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
         />
         <meta name='apple-mobile-web-app-title' content='คิดถึงลูน่า' />
         <link rel='manifest' href='/site.webmanifest' />
         {/* visit https://realfavicongenerator.net/ to generate favicon for all device and place code below*/}
         <ReactQueryProvider>
            <body className='m-0 min-h-screen bg-[#FECFE7] flex flex-col'>
               <nav className='px-4 h-14 bg-white/50 fixed w-full top-0 z-10 backdrop-filter backdrop-blur-sm flex justify-between gap-4 text-primary items-center'>
                  <Link className='text-3xl' href={'/'}>
                     LTX022
                  </Link>
                  <div className='flex gap-4 text-lg mobile:text-base'>
                     <Link href={'/'}>คิดถึงลูน่า</Link>
                     <Link href={'/card-list'}>การ์ดของลูน่า</Link>
                  </div>
               </nav>
               <div className='flex pt-14 min-h-screen'>{children}</div>
            </body>
         </ReactQueryProvider>
      </html>
   )
}
