import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  //API 요청을 백엔드로 프록시 하는 설정.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // "api/**" 요청은 전부 백엔드서버로.
      },
    ];
  },
  // allowedDevOrigins: ["https://accounts.google.com"]
};

export default nextConfig;

