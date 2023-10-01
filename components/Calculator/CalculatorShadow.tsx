import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type Props = {
  element: {
    current: HTMLElement | null;
  };
};

const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: calc(100% - 110px);
  height: calc(100% - 110px);
  box-shadow: 0 0 150px 5px rgba(103, 173, 165, .66);
  transform: translate(0, 50px);
  z-index: -1;
  will-change: transform;
`;

export const CalculatorShadow = (props: Props) => {
  const { element } = props;
  const [ shadowPos, setShadowPos ] = useState<{x: number, y: number} | null>(null);

  const shadowStyles = {
    transform: shadowPos ? `translate(${shadowPos?.x || 0}px, ${shadowPos?.y || 0}px)` : '',
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.innerWidth <= 800) {
      return;
    }

    const mouseMove = (ev: MouseEvent) => {
      if (!element?.current) {
        return;
      }
      const wrapperSizes = element.current.getBoundingClientRect();
  
      const yOffset = ev.clientY - wrapperSizes.y;
      const xOffset = ev.clientX - wrapperSizes.x;
  
      let y = Math.round((yOffset / wrapperSizes.height - .5) * 10000) / 100;
      y = y > 50 ? 50 : y;
      y = y < -50 ? -50 : y;
      let x = Math.round((xOffset / wrapperSizes.width - .5) * 10000) / 100;
      x = x > 50 ? 50 : x;
      x = x < -50 ? -50 : x;
      setShadowPos({
        x: x,
        y: y,
      });
    };

    document.addEventListener('mousemove', mouseMove);

    return () => {
      document.removeEventListener('mousemove', mouseMove);
    };
  }, [ element ]);

  return (
    <Shadow
      style={shadowStyles}
    />
  );
};

export default CalculatorShadow;