/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  flags: {
    DEV_SSR: false,
  }
}

module.exports = nextConfig
