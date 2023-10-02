import { roundAndSplitThousands } from '@/assets/ts/textUtils';
import { useState, useEffect } from 'react';

type Props = {
  num: number;
  time?: number;
  className?: string;
};

export const RNumber = (props: Props) => {
  const { num, time = 300, className } = props;
  const [lazyNum, setLazyNum] = useState<number>(num);
  const [animatedNum, setAnimatedNum] = useState<number | null>(null);

  useEffect(() => {
    if (num === lazyNum) {
      return;
    }

    const counts = time / 30;
    const range = lazyNum - num;
    const add = range / counts;

    let newValue = lazyNum + add;

    const interval = setInterval(() => {
      setAnimatedNum(newValue);
      newValue -= add;

      if (
        (newValue >= Math.floor(num) && add < 0) ||
        (newValue <= Math.floor(num) && add > 0)
      ) {
        setLazyNum(num);
        setAnimatedNum(null);
        clearInterval(interval);
      }
    }, Math.round(time / counts));
  }, [lazyNum, num, setLazyNum, time, setAnimatedNum]);

  return (
    <span className={className}>
      {roundAndSplitThousands(animatedNum || lazyNum)}
    </span>
  );
};
