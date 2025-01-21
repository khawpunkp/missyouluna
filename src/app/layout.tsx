import './globals.css'
import { Metadata } from 'next'
import ReactQueryProvider from '@/provider/reactQueryProvider'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
   title: 'เว็บของลูน่า',
   description: 'ของแท้แน่นอน',
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
               <Navbar />
               <div className='flex pt-14 min-h-screen'>{children}</div>
            </body>
         </ReactQueryProvider>
      </html>
   )
}
