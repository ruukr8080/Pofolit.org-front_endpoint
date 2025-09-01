import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // @RequestMapping("api/**")
        destination: `${process.env.REST_API_URL}/:path*`, // pofolit_be proxy
      },
    ];
  },
  // allowedDevOrigins: ["https://accounts.google.com", "https://kauth.kakao.com"],
};

export default nextConfig;
