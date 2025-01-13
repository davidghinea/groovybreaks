/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.scdn.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "**.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
// Allow images from these 2 cdns, I couldn't find more than these 2.

export default nextConfig;
