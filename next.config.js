/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["api.hubeei.skillzserver.com", "otherdomain.com"],
  },
};

module.exports = nextConfig;
