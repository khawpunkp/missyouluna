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
         <body className='m-0 min-h-screen bg-[#FECFE7]'>{children}</body>
      </html>
   )
}
