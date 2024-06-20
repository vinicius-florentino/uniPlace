import dayjs from 'dayjs';

export default function formatDateTime(date) {
    if (!date) return null;

    const formattedDate = dayjs(date);
    return formattedDate.format('DD/MM/YYYY HH:mm');
}
