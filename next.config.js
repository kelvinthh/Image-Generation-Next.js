/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
    domains: ["imggentoronto20236753cc.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
