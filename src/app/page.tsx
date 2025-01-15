'use client'

import axios from 'axios'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
   Broadcast,
   FacebookLogo,
   ShoppingBag,
   TiktokLogo,
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
   liveStreamingDetails?: {
      actualStartTime?: string
      actualEndTime?: string
      scheduledStartTime?: string
      scheduledEndTime?: string
   }
}
export default function Home() {
   const [isLoading, setIsLoading] = useState<boolean>(true)
   const [resource, setResource] = useState<VideoResource[]>([])
   const [targetTime, setTargetTime] = useState<string>()
   const getVideos = async () => {
      try {
         const response = await axios.get(
            'https://missyouluna-service.vercel.app/api/last-vdo',
         )
         setResource(response.data.items)
      } catch (error: any) {
      } finally {
         setIsLoading(false)
      }
   }

   const live = useMemo(
      () =>
         resource?.find(
            (stream) => stream.snippet.liveBroadcastContent === 'live',
         ),
      [resource],
   )

   const upcoming = useMemo(
      () =>
         resource?.find(
            (stream) => stream.snippet.liveBroadcastContent === 'upcoming',
         ),
      [resource],
   )

   const finished = useMemo(
      () =>
         resource
            ?.filter(
               (stream) =>
                  dayjs(stream.snippet.publishedAt) < dayjs() &&
                  stream.snippet.liveBroadcastContent === 'none',
            )
            .sort((a, b) =>
               dayjs(b.snippet.publishedAt).diff(dayjs(a.snippet.publishedAt)),
            )[0],
      [resource],
   )

   useEffect(() => {
      getVideos()
   }, [])

   useEffect(() => {
      if (live)
         setTargetTime(
            live.liveStreamingDetails?.actualStartTime ?? dayjs().toISOString(),
         )
   }, [live])

   useEffect(() => {
      if (!live && upcoming)
         setTargetTime(
            upcoming?.liveStreamingDetails?.scheduledStartTime ??
               dayjs().toISOString(),
         )
   }, [upcoming])

   useEffect(() => {
      if (!live && !upcoming && finished) {
         const time = finished?.liveStreamingDetails
            ? finished?.liveStreamingDetails.actualStartTime
            : finished.snippet.publishedAt
         setTargetTime(time ?? dayjs().toISOString())
      }
   }, [finished])

   function TimerComponent({ isLiveTimer }: { isLiveTimer?: boolean }) {
      const [timeLeft, setTimeLeft] = useState<Duration>()

      useEffect(() => {
         if (!targetTime) return
         const interval = setInterval(() => {
            const now = dayjs()
            const newDuration = dayjs(targetTime).isAfter(now)
               ? dayjs.duration(dayjs(targetTime).diff(now))
               : dayjs.duration(now.diff(targetTime))
            setTimeLeft(newDuration)
            if (newDuration.asSeconds() <= 0) clearInterval(interval)
         }, 1000)

         return () => clearInterval(interval)
      }, [targetTime])

      if (isLiveTimer) return <span>{timeLeft?.format('HH:mm:ss')}</span>
      return (
         <span>{timeLeft?.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}</span>
      )
   }

   function VideoCard({
      data,
      isUpload = false,
   }: {
      data: VideoResource
      isUpload?: boolean
   }) {
      return (
         <div
            onClick={() =>
               window.open(`https://www.youtube.com/watch?v=${data.id}`)
            }
            className='flex flex-col hover:cursor-pointer rounded-2xl bg-white max-w-[500px] w-full hover:scale-[1.03] transition-all duration-300 '
         >
            <div className='w-full h-fit p-2 pb-0 relative'>
               <img
                  src={data.snippet.thumbnails.maxres.url}
                  alt='thumbnail'
                  className='aspect-video w-full rounded-xl object-cover border'
               />
               {!isUpload && (
                  <>
                     {data.snippet.liveBroadcastContent === 'live' && (
                        <div
                           className={
                              'absolute flex bottom-2 right-4 gap-2 text-white rounded-md p-2 bg-[#FF0000cc]'
                           }
                        >
                           {<Broadcast color='white' size={24} />}
                           <TimerComponent isLiveTimer />
                        </div>
                     )}
                     {data.snippet.liveBroadcastContent !== 'live' && (
                        <div
                           className={
                              'absolute flex bottom-2 right-4 gap-2 text-white rounded-md p-2 bg-[#000000cc]'
                           }
                        >
                           {<Broadcast color='white' size={24} />}
                           {dayjs(targetTime).format(
                              'ddd DD MMM เวลา HH:mm น.',
                           )}
                        </div>
                     )}
                  </>
               )}
            </div>
            <div className='flex flex-col p-4'>
               <p className='text-xl'>{data.snippet.title}</p>
               {isUpload && (
                  <p>
                     {'อัปโหลดเมื่อ ' +
                        dayjs(targetTime).format('DD MMM เวลา HH:mm น.')}
                  </p>
               )}
            </div>
         </div>
      )
   }

   function LiveComponent() {
      if (live && !isLoading)
         return (
            <>
               <p className='text-2xl mobile:text-xl'>{'ลูน่าไลฟ์อยู่ที่'}</p>
               <VideoCard data={live} />
               <div
                  className='flex flex-col items-center gap-1 hover:cursor-pointer'
                  onClick={() =>
                     window.open(`https://www.youtube.com/watch?v=${live.id}`)
                  }
               >
                  <img src='/img/live.webp' alt='live' />
                  <p className='text-xl'>ไปดูดิ</p>
               </div>
            </>
         )
   }

   function UpcomingComponent() {
      if (!live && !isLoading && upcoming)
         return (
            <>
               <p className='text-2xl mobile:text-xl'>{'แล้วลูน่าจะกลับมา'}</p>
               <VideoCard data={upcoming} />
               <p className='text-2xl mobile:text-xl'>
                  <span>{'ในอีก '}</span>
                  <span className='font-semibold'>
                     <TimerComponent />
                  </span>
               </p>
               <div
                  className='flex flex-col items-center gap-1 hover:cursor-pointer'
                  onClick={() =>
                     window.open(
                        `https://www.youtube.com/watch?v=${upcoming.id}`,
                     )
                  }
               >
                  <img src='/img/wait.webp' alt='wait' />
                  <p className='text-xl'>ไปรอดิ</p>
               </div>
            </>
         )
   }

   function LastUploadComponent() {
      if (!live && !isLoading && !upcoming && finished)
         return (
            <>
               <div className='flex flex-col gap-1 items-center'>
                  <p className='text-2xl mobile:text-xl'>
                     ทำไรอยู่ไม่รู้ แต่พบเห็นล่าสุดเมื่อ
                  </p>
                  <p className='text-2xl mobile:text-xl'>
                     <span className='font-semibold'>
                        <TimerComponent />
                     </span>
                     <span>{' ที่แล้ว'}</span>
                  </p>
               </div>
               <VideoCard data={finished} isUpload />
               <div className='flex flex-col items-center gap-1'>
                  <img src='/img/finished.webp' alt='missing' />
                  <p className='text-xl'>#ลูน่าไปไหน</p>
               </div>
            </>
         )
   }

   function NotFoundComponent() {
      if (!isLoading && resource.length === 0)
         return (
            <>
               <p className='text-2xl'>เว็บพัง</p>
               <img
                  src='/img/sad-jellyfish.jpg'
                  className='max-w-52'
                  alt='sad-jellyfish'
               />
            </>
         )
   }

   function TweetButton() {
      return (
         <a
            className={
               'flex gap-2 mobile:gap-1 items-center text-xl mobile:text-base rounded-full py-2 px-4 hover:scale-[1.03] transition-all duration-300 hover:cursor-pointer bg-primary text-white'
            }
            href='https://twitter.com/intent/tweet?hashtags=Trixarium&related=twitterapi%2Ctwitter&text=คิดถึงลูน่าค้าบ'
            target='_blank'
            rel='noopener noreferrer'
         >
            บอกคิดถึงลูน่าผ่าน
            <XLogo weight='duotone' className='text-[32px] mobile:text-xl' />
         </a>
      )
   }

   function FooterComponent() {
      const social = [
         {
            href: 'https://www.youtube.com/c/LunatrixCh?sub_confirmation=1',
            logo: <YoutubeLogo weight='duotone' />,
         },
         {
            href: 'https://www.facebook.com/LTX022/',
            logo: <FacebookLogo weight='duotone' />,
         },
         {
            href: 'https://x.com/intent/follow?screen_name=LTX022',
            logo: <XLogo weight='duotone' />,
         },
         {
            href: 'https://www.tiktok.com/@ltx022',
            logo: <TiktokLogo weight='duotone' />,
         },
         {
            href: 'https://shop.line.me/@ltx022',
            logo: <ShoppingBag weight='duotone' />,
         },
      ]
      return (
         <footer className='flex flex-col gap-2 mobile:gap-1 items-center mb-4'>
            <p className='text-xl mobile:text-base'>ช่องทางการติดตามลูน่า</p>
            <div className='flex gap-3 mobile:gap-2 items-center justify-center text-[32px]'>
               {social.map((s, i) => (
                  <a
                     key={i}
                     href={s.href}
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer'
                  >
                     {s.logo}
                  </a>
               ))}
            </div>
         </footer>
      )
   }

   return (
      <div className='overflow-hidden w-full flex flex-col justify-between items-center text-primary mobile:overflow-auto'>
         <div className='flex flex-col gap-4 justify-center items-center w-full h-full mobile:px-4'>
            {isLoading ? (
               <div className='flex flex-col gap-2 items-center justify-center animate-bounce '>
                  <img
                     src={'/img/sad-jellyfish.png'}
                     alt='sad-jellyfish'
                     className='w-16'
                  />
                  sad jellyfish
               </div>
            ) : (
               <>
                  <LiveComponent />
                  <UpcomingComponent />
                  <LastUploadComponent />
                  <NotFoundComponent />
                  <TweetButton />
               </>
            )}
         </div>
         <FooterComponent/>
      </div>
   )
}
