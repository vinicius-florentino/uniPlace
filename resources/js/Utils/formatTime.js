import dayjs from 'dayjs';

export default function formatTime(date) {
    if (!date) return null;

    const formattedDate = dayjs(date);
    return formattedDate.format('HH:mm');
}
