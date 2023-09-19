import localFont from 'next/font/local';

const fonts = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export default fonts;
