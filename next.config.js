/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["openweathermap.org", "assets.coingecko.com"],
    },
    env: {
      NEXT_PUBLIC_OPENWEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      NEXT_PUBLIC_NEWSDATA_API_KEY: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY,
    },
  }
  
  module.exports = nextConfig
  
  