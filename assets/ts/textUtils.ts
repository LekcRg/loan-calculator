export const numbersOnly = (value?: string | number): string => {
  if (value === undefined) {
    return String(value);
  }

  return String(value).replace(/[^0-9.,]/g, '');
};

export const splitThousands = (num: number | string): string => {
  if (isNaN(Number(num))) {
    return String(num);
  }

  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const roundNumber = (number: number | string) => {
  number = Number(number);
  if (isNaN(number)) {
    return number;
  }

  return Math.round(number * 100) / 100;
};

export const roundAndSplitThousands = (num: number | string) => {
  if (isNaN(Number(num))) {
    return num;
  }

  const splitted = splitThousands(roundNumber(num)).split('.');

  if (!splitted[1]) {
    splitted[1] = '00';
  } else {
    splitted[1] = splitted[1]?.length === 1 ? `${splitted[1]}0` : splitted[1];
  }

  return splitted.join('.');
};

export const inputFloat = (
  value: string | number,
  max: number,
  decimal: number = 2): string => {
  let result = numbersOnly(value);

  if (Number(result) >= max) {
    result = String(max);
  }

  const resultLen = result.length;
  const dotIndex = result.indexOf('.');

  if (dotIndex >= 0 && dotIndex + 1 < resultLen) {
    const lastSymbol = result[resultLen - 1];

    if (lastSymbol === '.' || lastSymbol === ',') {
      result = result.slice(0, resultLen - 1);
    }
  }

  if (dotIndex >= 0) {
    const resultArr = result.split('.');

    result = `${resultArr[0]}.${resultArr[1].slice(0, decimal)}`;
  }

  return splitThousands(result);
};
