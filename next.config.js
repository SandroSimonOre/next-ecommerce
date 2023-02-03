/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig

module.exports = {
  images: {
    domains: ['dummyjson.com', 'm.media-amazon.com'],
  },
}
/*
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        //pathname: '/account123/**',
      },
    ],
  },
}
*/