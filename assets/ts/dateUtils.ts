type ParsedDate = {
  year: number;
  month: number;
  day: number;
};

// dateStr = 'YYYY-MM-DD'

export const isCorrectParsedDate = (parsedDate: ParsedDate): boolean => {
  if (!parsedDate) return false;

  const { year, month, day } = parsedDate;

  const isCorrectYear = !isNaN(year) && String(year)?.length === 4;
  const isCorrectMonth = !isNaN(month) && month > 0 && month <= 12;
  const isCorrectDay = !isNaN(day) && month > 0 && month <= 31;

  return !isCorrectYear || !isCorrectMonth || !isCorrectDay;
};

export const parseStringDate = (dateStr: string): ParsedDate | null => {
  const dateArr = dateStr.split('-');

  if (dateArr?.length !== 3) return null;

  const parsedDate = {
    year: Number(dateArr[0]),
    month: Number(dateArr[1]) - 1,
    day: Number(dateArr[2]),
  };

  if (isCorrectParsedDate(parsedDate)) {
    return null;
  }

  return parsedDate;
};

export const stringToDate = (dateStr: string): Date | null => {
  if (typeof dateStr !== 'string') {
    console.log('stringToDate: date is not String');
    return null;
  }
  const parsedDate = parseStringDate(dateStr);

  if (!parsedDate) {
    console.log('stringToDate: date is not correct');
    return null;
  }

  const UTCDate = dateUTC(parsedDate.year, parsedDate.month, parsedDate.day);

  return UTCDate;
};

export const dateToString = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const dateUTC = (
  year: number,
  monthIndex: number,
  date: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0,
): Date => {
  return new Date(
    Date.UTC(year, monthIndex, date, hours, minutes, seconds, ms),
  );
};

export const dateNowUTC = (): Date => {
  const date = new Date();
  return dateUTC(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getPrettyDate = (date: Date): string => {
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const prettyDay = day > 9 ? day : `0${day}`;
  const prettyMonth = month > 9 ? month : `0${month}`;
  const prettyDate = `${prettyDay}.${prettyMonth}.${year}`;

  return prettyDate;
};
