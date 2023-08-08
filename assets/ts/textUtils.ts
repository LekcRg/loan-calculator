// export const numbersOnly = (value?: string | number) => {
//   // only number + splitThousands
//   if (value === undefined) {
//     return String(value);
//   }
// }

export const roundNumber = (number: number) => {
  if (isNaN(number)) {
    return number;
  }

  return Math.floor(number * 100) / 100;
};

export const prettyNumber = (value?: string | number) => {
  // only number + splitThousands
  if (value === undefined) {
    return String(value);
  }

  value = String(value).replace(/[^0-9.,]/g, '');
  const valueLen = value.length;
  const dotIndex = value.indexOf('.');


  if (dotIndex >= 0 && dotIndex + 1 < valueLen) {
    const lastSymbol = value[valueLen - 1];

    if (lastSymbol === '.' || lastSymbol === ',') {
      value = value.slice(0, valueLen - 1);
    }
  }

  if (dotIndex >= 0) {
    const valueArr = value.split('.');

    value = `${valueArr[0]}.${valueArr[1].slice(0, 2)}`;
  }

  return value
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace(',', '.');
};