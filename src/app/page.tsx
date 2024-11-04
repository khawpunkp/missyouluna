'use client'

import axios from 'axios'

import { useEffect, useState } from 'react'
import newLive from '../../public/json/live.json'
import newUpload from '../../public/json/upload.json'
import newShort from '../../public/json/short.json'
import {
   Broadcast,
   FacebookLogo,
   TiktokLogo,
   TwitchLogo,
   XLogo,
   YoutubeLogo,
} from '@phosphor-icons/react'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
dayjs.locale('th')
import duration, { Duration } from 'dayjs/plugin/duration'
dayjs.extend(duration)

type VtuberThaiInfoResponse = {
   title: string
   thumbnail: string
   datetime: string
   status: 'LIVE' | 'UNAVAILABLE' | 'UPCOMING' | 'FINISHED'
   type: 'LIVE' | 'UPLOADED' | 'SHORT'
   url: string
}

export default function Home() {
   const [lastVdos, setLastVdos] = useState<VtuberThaiInfoResponse[]>([])
   const [live, setLive] = useState<VtuberThaiInfoResponse>()
   const [upcoming, setUpcoming] = useState<VtuberThaiInfoResponse>()
   const [finished, setFinished] = useState<VtuberThaiInfoResponse>()
   const [targetTime, setTargetTime] = useState<string>('')
   const [timeLeft, setTimeLeft] = useState<Duration>()

   const fetchData = async () => {
      try {
         const live = await axios.get(
            'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/LIVE/new'
         )
         console.log(live);
         setLastVdos((prev) => [...prev, live.data.data])
         const uploaded = await axios.get(
            'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/UPLOADED/new'
         )
         console.log(uploaded);
         setLastVdos((prev) => [...prev, uploaded.data.data])
         const short = await axios.get(
            'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/SHORT/new'
         )
         console.log(short);
         setLastVdos((prev) => [...prev, short.data.data])
      } catch (error) {}
   }

   const fetchJson = async () => {
      try {
         const live = await axios.get(
            // 'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/LIVE/new'
            '/json/live.json'
         )
         setLastVdos((prev) => [...prev, live.data])
         const uploaded = await axios.get(
            // 'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/UPLOADED/new'
            '/json/upload.json'
         )
         setLastVdos((prev) => [...prev, uploaded.data])
         const short = await axios.get(
            // 'https://api.vtuberthaiinfo.com/video/talent/lunatrixch/SHORT/new'
            '/json/short.json'
         )
         setLastVdos((prev) => [...prev, short.data])
      } catch (error) {}
   }

   const findLastLive = (): boolean => {
      const lastLive = lastVdos
         ?.filter((stream) => stream.status === 'LIVE')
         .sort((a, b) => dayjs(b.datetime).diff(dayjs(a.datetime)))

      setLive(lastLive?.[0] as any)

      return lastLive && lastLive.length > 0 ? true : false
   }

   const findLastUpcoming = (): boolean => {
      const lastUpcoming = lastVdos
         ?.filter((stream) => dayjs(stream.datetime) > dayjs())
         .sort((a, b) => dayjs(b.datetime).diff(dayjs(a.datetime)))

      setUpcoming(lastUpcoming?.[0] as any)

      return lastUpcoming && lastUpcoming.length > 0 ? true : false
   }

   const findLastFinished = () => {
      const lastFinished = lastVdos
         ?.filter(
            (stream) =>
               dayjs(stream.datetime) < dayjs() && stream.type !== 'LIVE'
         )
         .sort((a, b) => dayjs(b.datetime).diff(dayjs(a.datetime)))

      setFinished(lastFinished?.[0] as any)
   }

   useEffect(() => {
      fetchData()
      // fetchJson()
   }, [])

   useEffect(() => {
      findLastLive()
      findLastUpcoming()
      findLastFinished()
   }, [lastVdos])

   useEffect(() => {
      if (live) setTargetTime(live.datetime ?? '')
   }, [live])

   useEffect(() => {
      if (!live) setTargetTime(upcoming?.datetime ?? '')
   }, [upcoming])

   useEffect(() => {
      if (!upcoming) setTargetTime(finished?.datetime ?? '')
   }, [finished])

   useEffect(() => {
      const timerId = setInterval(() => {
         const newDuration = dayjs(targetTime).isAfter(dayjs())
            ? dayjs.duration(dayjs(targetTime).diff(dayjs()))
            : dayjs.duration(dayjs(dayjs()).diff(targetTime))
         setTimeLeft(newDuration)
         dayjs()
         // Clear the interval when the countdown is complete
         if (newDuration.asSeconds() <= 0) {
            clearInterval(timerId)
         }
      }, 1000)

      // Cleanup the interval on component unmount
      return () => clearInterval(timerId)
   }, [targetTime])

   function VideoCard({ data }: { data: VtuberThaiInfoResponse }) {
      return (
         <div
            onClick={() => window.open(data.url)}
            className='flex flex-col hover:scale-[1.02] hover: cursor-pointer rounded-2xl bg-white w-[30%] mobile:w-[80%]'
         >
            <div className='w-full h-fit p-2 relative'>
               <img
                  src={data.thumbnail}
                  alt='thumbnail'
                  className='aspect-video w-full rounded-xl object-cover border'
               />
               <div
                  className={`absolute bottom-4 right-4 flex gap-2 text-white rounded-md p-2 rounded- ${
                     data.status === 'LIVE'
                        ? 'bg-[#FF0000cc]'
                        : 'bg-[#000000cc]'
                  }`}
               >
                  {dayjs(data.datetime) > dayjs() || data.status === 'LIVE' ? (
                     <Broadcast color='white' size={24} />
                  ) : (
                     'อัปโหลดเมื่อ '
                  )}
                  {data.status === 'LIVE'
                     ? timeLeft?.format('HH:mm:ss')
                     : dayjs(data.datetime).format('DD MMMM เวลา HH:mm น.')}
               </div>
            </div>
            <div className='flex flex-col gap-4 p-4 text-xl'>{data.title}</div>
         </div>
      )
   }

   return (
      <div className='h-screen overflow-hidden flex flex-col justify-between items-center text-[#985175]'>
         <div />
         <div className='flex flex-col gap-6 justify-center items-center w-full'>
            {live ? (
               <>
                  <p className='text-2xl'>ลูน่าไลฟ์อยู่ที่</p>
                  <VideoCard data={live} />
                  <div
                     className='flex flex-col items-center gap-1 hover:cursor-pointer'
                     onClick={() => window.open(live.url)}
                  >
                     <img src='/img/live.webp' alt='live' />
                     <p className='text-xl'>ไปดูดิ</p>
                  </div>
               </>
            ) : upcoming ? (
               <>
                  <p className='text-2xl'>แล้วลูน่าจะกลับมา</p>
                  <VideoCard data={upcoming} />
                  <p className='text-2xl'>
                     <span>{'ในอีก '}</span>
                     <span className='font-semibold'>
                        {timeLeft?.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}
                     </span>
                  </p>
                  <div
                     className='flex flex-col items-center gap-1 hover:cursor-pointer'
                     onClick={() => window.open(upcoming.url)}
                  >
                     <img src='/img/wait.webp' alt='wait' />
                     <p className='text-xl'>ไปรอดิ</p>
                  </div>
               </>
            ) : finished ? (
               <>
                  <p className='text-2xl'>บุคคลสูญหาย (นอน) พบเห็นล่าสุดที่</p>
                  <VideoCard data={finished} />
                  <p className='text-2xl'>
                     <span>{'เมื่อ '}</span>
                     <span className='font-semibold'>
                        {timeLeft?.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}
                     </span>
                     <span>{' ที่แล้ว'}</span>
                  </p>
                  <div className='flex flex-col items-center gap-1'>
                     <img src='/img/finished.webp' alt='missing' />
                     <p className='text-xl'>#ลูน่าไปไหน</p>
                  </div>
               </>
            ) : (
               <>
                  <p className='text-2xl'>เว็บพัง</p>
                  <img
                     src='/img/sad-jellyfish.jpg'
                     className='max-w-52'
                     alt='sad-jellyfish'
                  />
               </>
            )}
         </div>
         <footer className='flex flex-col gap-2 items-center p-2'>
            <p className='text-xl'>ช่องทางการติดตามลูน่า</p>
            <div className='flex gap-3 items-center justify-center'>
               <a
                  href='https://www.youtube.com/c/LunatrixCh?sub_confirmation=1'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer relative'
               >
                  <p
                     hidden={!!live || !!upcoming || !!finished}
                     className='absolute text-sm w-[120px] bottom-5 -left-[100px] -rotate-[30deg]'
                  >
                     ดูคลิปเก่าไปก่อน
                  </p>
                  <img
                     hidden={!!live || !!upcoming || !!finished}
                     src='/img/live.webp'
                     alt='live'
                     className='absolute -bottom-[42px] -left-16 scale-x-[-1] min-w-24'
                  />
                  <YoutubeLogo size={32} weight='fill' />
               </a>
               <a
                  href='https://www.facebook.com/LTX022/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <FacebookLogo size={32} weight='fill' />
               </a>
               <a
                  href='https://x.com/intent/follow?screen_name=LTX022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <XLogo size={32} weight='fill' />
               </a>
               <a
                  href='https://www.tiktok.com/@ltx022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <TiktokLogo size={32} weight='fill' />
               </a>
               <a
                  href='https://www.twitch.tv/ltx022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <TwitchLogo size={32} weight='fill' />
               </a>
            </div>
            <p className='text-center'>จัดทำโดยแอ้ขป.</p>
         </footer>
      </div>
   )
}
