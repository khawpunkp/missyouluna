import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const buddhistDayjs = dayjs;
export default buddhistDayjs;
