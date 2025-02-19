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
import { preloadImages } from '@/utils/utils';

export default function MissYouLunaPage() {
   const [targetTime, setTargetTime] = useState<string>();
   const [sadjellyfish, setSadjellyfish] = useState(false);

   const { data: resource, isFetching } = useQuery({
      queryFn: async () => {
         const response = await getVideos();
         const data: VideoResourceDto[] = response.data.items;
         const live = data?.find(
            (stream) => stream.snippet.liveBroadcastContent === 'live',
         );
         const upcoming = data
            ?.filter(
               (stream) => stream.snippet.liveBroadcastContent === 'upcoming',
            )
            .sort((a, b) =>
               dayjs(a?.liveStreamingDetails?.scheduledStartTime).diff(
                  dayjs(b?.liveStreamingDetails?.scheduledStartTime),
               ),
            )[0];

         const lastUpload = data
            ?.filter(
               (stream) =>
                  dayjs(stream.snippet.publishedAt) < dayjs() &&
                  stream.snippet.liveBroadcastContent === 'none',
            )
            .sort((a, b) =>
               dayjs(b.snippet.publishedAt).diff(dayjs(a.snippet.publishedAt)),
            )[0];
         if (live) preloadImages([live.snippet.thumbnails.maxres.url]);
         if (upcoming) preloadImages([upcoming.snippet.thumbnails.maxres.url]);
         if (lastUpload) preloadImages([lastUpload.snippet.thumbnails.maxres.url]);
         return { live, upcoming, lastUpload };
      },
      queryKey: ['video'],
      refetchOnWindowFocus: false,
   });

   useEffect(() => {
      if (resource?.live)
         setTargetTime(
            resource?.live.liveStreamingDetails?.actualStartTime ??
               dayjs().toISOString(),
         );
      else if (resource?.upcoming)
         setTargetTime(
            resource?.upcoming.liveStreamingDetails?.scheduledStartTime ??
               dayjs().toISOString(),
         );
      else if (resource?.lastUpload) {
         const time = resource?.lastUpload.liveStreamingDetails
            ? resource?.lastUpload.liveStreamingDetails.actualStartTime
            : resource?.lastUpload.snippet.publishedAt;
         setTargetTime(time ?? dayjs().toISOString());
      }
   }, [resource]);

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
            {isFetching || sadjellyfish ? (
               <SadJellyfish />
            ) : (
               <motion.div
                  variants={mainContainerVariants}
                  initial='hidden'
                  animate='show'
                  className='flex flex-col gap-4 items-center'
               >
                  {resource?.live ? (
                     <LiveComponent
                        data={resource?.live}
                        targetTime={targetTime}
                     />
                  ) : resource?.upcoming ? (
                     <UpcomingComponent
                        data={resource?.upcoming}
                        targetTime={targetTime}
                     />
                  ) : resource?.lastUpload ? (
                     <LastUploadComponent
                        data={resource?.lastUpload}
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
