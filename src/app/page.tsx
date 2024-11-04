'use client'

import axios from 'axios'

import { useEffect, useState } from 'react'
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

type VideoResource = {
   kind: 'youtube#video'
   id: string
   snippet: {
      publishedAt: string
      channelId: string
      title: string
      description: string
      thumbnails: {
         maxres: {
            url: string
            width: number
            height: number
         }
      }
      channelTitle: string
      categoryId: string
      liveBroadcastContent: 'live' | 'none' | 'upcoming'
      localized: {
         title: string
         description: string
      }
   }
   liveStreamingDetails: {
      actualStartTime: string
      actualEndTime: string
      scheduledStartTime: string
      scheduledEndTime: string
   }
}
export default function Home() {
   const [resource, setResource] = useState<VideoResource[]>([])
   const [live, setLive] = useState<VideoResource>()
   const [upcoming, setUpcoming] = useState<VideoResource>()
   const [finished, setFinished] = useState<VideoResource>()
   const [targetTime, setTargetTime] = useState<{
      type: 'live' | 'none' | 'upcoming'
      time: string
   }>()
   const [timeLeft, setTimeLeft] = useState<Duration>()

   const getVideos = async () => {
      try {
         const response = await axios.get(
            'https://missyouluna-service.vercel.app/api/last-vdo'
         )
         setResource(response.data.items)
      } catch (error: any) {}
   }

   const findLastLive = (): boolean => {
      const lastLive = resource?.filter(
         (stream) => stream.snippet.liveBroadcastContent === 'live'
      )

      setLive(lastLive?.[0] as any)

      return lastLive && lastLive.length > 0 ? true : false
   }

   const findLastUpcoming = (): boolean => {
      const lastUpcoming = resource
         ?.filter(
            (stream) => stream.snippet.liveBroadcastContent === 'upcoming'
         )
         .sort((a, b) =>
            dayjs(a.liveStreamingDetails.scheduledStartTime).diff(
               dayjs(b.liveStreamingDetails.scheduledStartTime)
            )
         )

      setUpcoming(lastUpcoming?.[0] as any)

      return lastUpcoming && lastUpcoming.length > 0 ? true : false
   }

   const findLastFinished = () => {
      const lastFinished = resource
         ?.filter(
            (stream) =>
               dayjs(stream.snippet.publishedAt) < dayjs() &&
               stream.snippet.liveBroadcastContent === 'none'
         )
         .sort((a, b) =>
            dayjs(b.snippet.publishedAt).diff(dayjs(a.snippet.publishedAt))
         )

      setFinished(lastFinished?.[0] as any)
   }

   useEffect(() => {
      getVideos()
   }, [])

   useEffect(() => {
      findLastLive()
      findLastUpcoming()
      findLastFinished()
   }, [resource])

   useEffect(() => {
      if (live)
         setTargetTime({
            type: 'live',
            time: live.liveStreamingDetails.actualStartTime,
         })
   }, [live])

   useEffect(() => {
      if (!live && upcoming)
         setTargetTime({
            type: 'upcoming',
            time: upcoming?.liveStreamingDetails.scheduledStartTime,
         })
   }, [upcoming])

   useEffect(() => {
      if (!upcoming && finished)
         setTargetTime({
            type: 'none',
            time: finished?.liveStreamingDetails.actualStartTime,
         })
   }, [finished])

   useEffect(() => {
      const timerId = setInterval(() => {
         const newDuration =
            targetTime?.type === 'upcoming'
               ? dayjs.duration(dayjs(targetTime?.time).diff(dayjs()))
               : dayjs.duration(dayjs(dayjs()).diff(targetTime?.time))
         setTimeLeft(newDuration)
         dayjs()
         // Clear the interval when the countdown is complete
         if (newDuration.asSeconds() <= 0) {
            window.open('https://www.youtube.com/watch?v=' + upcoming?.id)
            clearInterval(timerId)
         }
      }, 1000)

      // Cleanup the interval on component unmount
      return () => clearInterval(timerId)
   }, [targetTime])

   function VideoCard({ data }: { data: VideoResource }) {
      return (
         <div
            onClick={() =>
               window.open('https://www.youtube.com/watch?v=' + data.id)
            }
            className='flex flex-col hover:scale-[1.02] hover: cursor-pointer rounded-2xl bg-white w-[30%] mobile:w-[80%]'
         >
            <div className='w-full h-fit p-2 pb-0 relative'>
               <img
                  src={data.snippet.thumbnails.maxres.url}
                  alt='thumbnail'
                  className='aspect-video w-full rounded-xl object-cover border'
               />
               <div
                  className={`absolute bottom-2 right-4 flex gap-2 text-white rounded-md p-2 rounded- ${
                     data.snippet.liveBroadcastContent === 'live'
                        ? 'bg-[#FF0000cc]'
                        : 'bg-[#000000cc]'
                  }`}
               >
                  {dayjs(targetTime?.time) > dayjs() ||
                  data.snippet.liveBroadcastContent !== 'none' ? (
                     <Broadcast color='white' size={24} />
                  ) : (
                     'อัปโหลดเมื่อ '
                  )}
                  {data.snippet.liveBroadcastContent === 'live'
                     ? timeLeft?.format('HH:mm:ss')
                     : dayjs(targetTime?.time).format('DD MMMM เวลา HH:mm น.')}
               </div>
            </div>
            <div className='flex flex-col gap-4 p-4 text-xl'>
               {data.snippet.title}
            </div>
         </div>
      )
   }

   function TweetButton() {
      return (
         <a
            className='flex gap-2 items-center text-xl rounded-full py-2 px-4 hover:scale-[1.1] bg-[#985175] text-[#FECFE7]'
            href='https://twitter.com/intent/tweet?hashtags=Trixarium&related=twitterapi%2Ctwitter&text=คิดถึงลูน่าค้าบ'
            target='_blank'
            rel='noopener noreferrer'
         >
            บอกคิดถึงลูน่าผ่าน
            <XLogo size={32} weight='duotone' />
         </a>
      )
   }

   return (
      <div className='h-screen overflow-hidden flex flex-col justify-between items-center text-[#985175] mobile:overflow-auto'>
         <div />
         <div className='flex flex-col gap-6 justify-center items-center w-full'>
            {!!live ? (
               <>
                  <p className='text-2xl'>ลูน่าไลฟ์อยู่ที่</p>
                  <VideoCard data={live} />
                  <div
                     className='flex flex-col items-center gap-1 hover:cursor-pointer'
                     onClick={() =>
                        window.open(
                           'https://www.youtube.com/watch?v=' + live.id
                        )
                     }
                  >
                     <img src='/img/live.webp' alt='live' />
                     <p className='text-xl'>ไปดูดิ</p>
                  </div>
               </>
            ) : !!upcoming ? (
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
                     onClick={() =>
                        window.open(
                           'https://www.youtube.com/watch?v=' + upcoming.id
                        )
                     }
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
            <TweetButton />
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
                     className='absolute text-sm text-center bottom-3 -left-[80px] -rotate-[30deg]'
                  >
                     ดูคลิปเก่า
                     <br />
                     ไปก่อน
                  </p>
                  <img
                     hidden={!!live || !!upcoming || !!finished}
                     src='/img/live.webp'
                     alt='live'
                     className='absolute -bottom-[42px] -left-16 scale-x-[-1] min-w-24'
                  />
                  <YoutubeLogo size={32} weight='duotone' />
               </a>
               <a
                  href='https://www.facebook.com/LTX022/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <FacebookLogo size={32} weight='duotone' />
               </a>
               <a
                  href='https://x.com/intent/follow?screen_name=LTX022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <XLogo size={32} weight='duotone' />
               </a>
               <a
                  href='https://www.tiktok.com/@ltx022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <TiktokLogo size={32} weight='duotone' />
               </a>
               <a
                  href='https://www.twitch.tv/ltx022'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-[1.1] hover: cursor-pointer'
               >
                  <TwitchLogo size={32} weight='duotone' />
               </a>
            </div>
            <p
               className='text-transparent'
               hidden={!!live || !!upcoming || !!finished}
            >
               .
            </p>
            <p className='text-center'>
               รูปลูน่ากับแอ้วาดโดยลูน่า เขียนเว็บโดยขป.
            </p>
         </footer>
      </div>
   )
}
