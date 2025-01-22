import axios, { AxiosResponse } from 'axios';

const apiPath = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getVideos = async (): Promise<AxiosResponse> => {
   try {
      const response = await axios.get(apiPath + '/last-vdo');
      return response;
   } catch (error: any) {
      throw error;
   }
};

export const getCardList = async (): Promise<AxiosResponse> => {
   try {
      const response = await axios.get(apiPath + '/card-list');
      return response;
   } catch (error: any) {
      throw error;
   }
};
