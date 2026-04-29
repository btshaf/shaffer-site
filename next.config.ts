import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TO_EMAIL: process.env.TO_EMAIL,
  },
  serverExternalPackages: ['resend'],
};

export default nextConfig;
