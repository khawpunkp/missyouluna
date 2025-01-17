import axios, { AxiosResponse } from 'axios'

const apiPath = 'https://ltx022-service.onrender.com/api/v1'

export const getVideos = async (): Promise<AxiosResponse> => {
   try {
      const response = await axios.get(apiPath + '/last-vdo')
      return response
   } catch (error: any) {
      throw error
   }
}

export const getCardList = async (): Promise<AxiosResponse> => {
   try {
      const response = await axios.get(apiPath + '/card-list')
      return response
   } catch (error: any) {
      throw error
   }
}
