'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
   const [live, setLive] = useState<{ title: string; id?: string }>({
      title: '',
      id: '',
   })
   const [schedule, setSchedule] = useState<{
      title: string
      id?: string
      timeStamp?: string
   }>({
      title: '',
      id: '',
      timeStamp: '',
   })
   const [lastSeen, setLastSeen] = useState<{
      title: string
      id?: string
      timeStamp?: string
   }>({
      title: '',
      id: '',
   })

   return (
      <div className='flex flex-col justify-center items-center'>
         {!!live.id ? (
            <div>
               ลูน่าไลฟ์อยู่ที่
               <button
                  onClick={() =>
                     window.open(`https://www.youtube.com/watch?v=${live.id}`)
                  }
                  className='bg-white p-4 rounded text-black'
               >
                  {live.title}
               </button>
               ไปดูดิ
            </div>
         ) : !!schedule.id ? (
            'ลูน่าจะกลับมาใน'
         ) : (
            'บุคคลสูญหาย พบเห็นล่าสุดเมือ'
         )}
         <button>{}</button>
      </div>
   )
}
