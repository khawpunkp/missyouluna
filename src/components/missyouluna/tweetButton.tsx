import { XLogo } from '@phosphor-icons/react';

export default function TweetButton() {
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
   );
}
