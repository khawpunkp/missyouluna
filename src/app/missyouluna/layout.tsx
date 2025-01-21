import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
   return {
      title: 'คิดถึงลูน่า',
      description: '#ลูน่าอยู่ไหน',
   }
}

export default function CardListLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return <>{ children }</>
}
