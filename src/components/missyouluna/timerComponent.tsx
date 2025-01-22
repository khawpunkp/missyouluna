import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');
import duration, { Duration } from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function TimerComponent({
   targetTime,
   isCountdown,
   isLiveTimer,
}: {
   targetTime: string | undefined;
   isCountdown?: boolean;
   isLiveTimer?: boolean;
}) {
   const [timeLeft, setTimeLeft] = useState<Duration>(dayjs.duration(0));

   useEffect(() => {
      if (!targetTime) return;
      const interval = setInterval(() => {
         const now = dayjs();
         const target = dayjs(targetTime);
         const diff = isCountdown ? target.diff(now) : now.diff(target);
         const newDuration = dayjs.duration(diff);

         if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft(dayjs.duration(0));
         } else {
            setTimeLeft(newDuration);
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [targetTime]);

   if (isLiveTimer) return <span>{timeLeft.format('HH:mm:ss')}</span>;
   return <span>{timeLeft.format('D วัน HH ชั่วโมง mm นาที ss วินาที')}</span>;
}
