/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
