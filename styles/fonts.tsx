'use client';

import localFont from 'next/font/local';

const fonts = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export default fonts;
