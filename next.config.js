/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['image.unsplash.com'],
    domains:['i.ytimg.com'],
  }
}

module.exports = nextConfig
