'use client';

import { useEffect, useMemo, useState } from 'react';
import { VideoResourceDto } from '@/dto/dto';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '@/api/api';
import Footer from '@/components/layout/footer';
import LiveComponent from '@/components/missyouluna/liveComponent';
import LastUploadComponent from '@/components/missyouluna/lastUploadComponent';
import NotFoundComponent from '@/components/missyouluna/notFoundComponent';
import UpcomingComponent from '@/components/missyouluna/upcomingComponent';
import dayjs from 'dayjs';
import SadJellyfish from '@/components/missyouluna/sadJellyfish';
import { mainContainerVariants } from '@/const/animation';
import { motion } from 'framer-motion';

export default function MissYouLunaPage() {
   const [targetTime, setTargetTime] = useState<string>();
   const [sadjellyfish, setSadjellyfish] = useState(false);
   const [isShowImage, setIsShowImage] = useState(false);

   const { data: resource, isFetching } = useQuery({
      queryFn: async () => {
         const response = await getVideos();
         const data: VideoResourceDto[] = response.data.items;
         return data;
      },
      queryKey: ['video'],
      refetchOnWindowFocus: false,
   });

   const live = useMemo(
      () =>
         resource?.find(
            (stream) => stream.snippet.liveBroadcastContent === 'live',
         ),
      [resource],
   );

   const upcoming = useMemo(
      () =>
         resource
            ?.filter(
               (stream) => stream.snippet.liveBroadcastContent === 'upcoming',
            )
            .sort((a, b) =>
               dayjs(a?.liveStreamingDetails?.scheduledStartTime).diff(
                  dayjs(b?.liveStreamingDetails?.scheduledStartTime),
               ),
            )[0],
      [resource],
   );

   const lastUpload = useMemo(
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
   );

   useEffect(() => {
      if (live)
         setTargetTime(
            live.liveStreamingDetails?.actualStartTime ?? dayjs().toISOString(),
         );
   }, [live]);

   useEffect(() => {
      if (!live && upcoming)
         setTargetTime(
            upcoming?.liveStreamingDetails?.scheduledStartTime ??
               dayjs().toISOString(),
         );
   }, [upcoming]);

   useEffect(() => {
      if (!live && !upcoming && lastUpload) {
         const time = lastUpload?.liveStreamingDetails
            ? lastUpload?.liveStreamingDetails.actualStartTime
            : lastUpload.snippet.publishedAt;
         setTargetTime(time ?? dayjs().toISOString());
      }
   }, [lastUpload]);

   return (
      <div className='relative overflow-hidden w-full flex flex-col gap-4 justify-between items-center text-primary mobile:overflow-auto mobile:p-4 py-4'>
         <button
            type='button'
            title=''
            className='absolute bottom-6 right-6 mobile:bottom-0 mobile:right-0 rounded-full z-50'
            onClick={() => setSadjellyfish((prev) => !prev)}
            hidden={isFetching}
         >
            <img
               src={'/img/sad-jellyfish.png'}
               alt='sad-jellyfish'
               className='w-8 hover:animate-pulse opacity-20 hover:opacity-100 !transition-all duration-300'
            />
         </button>
         <div className='flex flex-col gap-4 justify-center items-center w-full h-full '>
            {live ? (
               <img
                  alt=''
                  src={live.snippet.thumbnails.maxres.url}
                  className='hidden'
                  onLoad={() =>
                     setTimeout(() => {
                        setIsShowImage(true);
                     }, 500)
                  }
               />
            ) : upcoming ? (
               <img
                  alt=''
                  src={upcoming.snippet.thumbnails.maxres.url}
                  className='hidden'
                  onLoad={() =>
                     setTimeout(() => {
                        setIsShowImage(true);
                     }, 500)
                  }
               />
            ) : lastUpload ? (
               <img
                  alt=''
                  src={lastUpload.snippet.thumbnails.maxres.url}
                  className='hidden'
                  onLoad={() =>
                     setTimeout(() => {
                        setIsShowImage(true);
                     }, 500)
                  }
               />
            ) : (
               <img
                  alt=''
                  src={'/img/sad-jellyfish.png'}
                  className='hidden'
                  onLoad={() =>
                     setTimeout(() => {
                        setIsShowImage(true);
                     }, 500)
                  }
               />
            )}
            {isFetching || sadjellyfish || !isShowImage ? (
               <SadJellyfish />
            ) : (
               <motion.div
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  className='flex flex-col gap-4 items-center'
               >
                  {live ? (
                     <LiveComponent data={live} targetTime={targetTime} />
                  ) : upcoming ? (
                     <UpcomingComponent
                        data={upcoming}
                        targetTime={targetTime}
                     />
                  ) : lastUpload ? (
                     <LastUploadComponent
                        data={lastUpload}
                        targetTime={targetTime}
                     />
                  ) : (
                     <NotFoundComponent />
                  )}
               </motion.div>
            )}
         </div>
         <Footer />
      </div>
   );
}
