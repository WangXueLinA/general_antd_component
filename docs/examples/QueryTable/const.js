import dayjs from 'dayjs';

export const dateToStr = (list, format = 'YYYY-MM-DD') => {
  if (!list) return [];
  if (!Array.isArray(list)) {
    list = [list];
  }
  return list.filter(Boolean).map(item => dayjs(item).format(format));
};