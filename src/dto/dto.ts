export type VideoResourceDto = {
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

export type RarityResourceDto = {
   id: number
   code: string
   title: string
   Card: { id: number; runningNumber: number; imgSrc: string }[]
}
