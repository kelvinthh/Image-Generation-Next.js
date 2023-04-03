/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "imggentoronto20236753cc.blob.core.windows.net",
    ],
  },
};

module.exports = nextConfig;
