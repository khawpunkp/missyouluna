'use client'

import { useEffect, useMemo, useState } from 'react'
import {
   Broadcast,
   XLogo,
} from '@phosphor-icons/react'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
dayjs.locale('th')
import duration, { Duration } from 'dayjs/plugin/duration'
import { VideoResourceDto } from '@/dto/dto'
import { useQuery } from '@tanstack/react-query'
import { getVideos } from '@/api/api'
import Footer from '@/components/footer'
dayjs.extend(duration)

export default function Home() {
   const [targetTime, setTargetTime] = useState<string>()

   const { data: resource, isLoading } = useQuery({
      queryFn: async () => {
         const response = await getVideos()

         const data: VideoResourceDto[] = response.data.items
         return data
      },
      queryKey: ['video'],
   })

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

   function TimerComponent({
      isCountdown,
      isLiveTimer,
   }: {
      isCountdown?: boolean
      isLiveTimer?: boolean
   }) {
      const [timeLeft, setTimeLeft] = useState<Duration>()

      useEffect(() => {
         if (!targetTime) return
         const interval = setInterval(() => {
            const now = dayjs()
            const target = dayjs(targetTime)
            const diff = isCountdown ? target.diff(now) : now.diff(target)
            const newDuration = dayjs.duration(diff)

            if (diff <= 0) {
               clearInterval(interval)
               setTimeLeft(dayjs.duration(0))
            } else {
               setTimeLeft(newDuration)
            }
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
      data: VideoResourceDto
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
               <p className='text-xl'>{data.snippet.title.split('#')[0]}</p>
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
                     <TimerComponent isCountdown />
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
      if (!isLoading && resource?.length === 0)
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

   return (
      <div className='overflow-hidden w-full flex flex-col gap-4 justify-between items-center text-primary mobile:overflow-auto mobile:p-4 py-4'>
         <div className='flex flex-col gap-4 justify-center items-center w-full h-full '>
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
         <Footer />
      </div>
   )
}
