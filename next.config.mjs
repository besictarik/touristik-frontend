/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.tst-touristik.de",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
