import type { NextConfig } from "next";

const nextConfig: NextConfig = {


  async redirects() {
    return [
      // {
      //   source: '/login',
      //   destination: '/sign-in',
      //   permanent: true,
      // },
      // {
      //   source: '/signup',
      //   destination: '/sign-up',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
