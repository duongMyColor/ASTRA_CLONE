import dayjs from 'dayjs';

export const formatDate = (date: string, format: string): string => {
  const formattedDate = dayjs(date).format(format);
  return formattedDate;
};

export const formatDateAcstar = (date: string): string => {
  if (!date) {
    return '';
  }

  return dayjs(date).format('YYYY.MM.DD HH:mm');
};
