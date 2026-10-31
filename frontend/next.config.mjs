/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
    serverActions: false,
  },
  async headers() {
    return [{ source: "/(.*)", headers: [{ key: "Cache-Control", value: "no-store" }] }];
  },
};

export default nextConfig;
