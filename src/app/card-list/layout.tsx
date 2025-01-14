import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
   return {
      title: 'การ์ดของลูน่า',
      description: 'LTX Cards List',
   }
}

export default function CardListLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return <>{ children }</>
}
