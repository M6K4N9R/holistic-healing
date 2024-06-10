/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // // We disable image optimisation during static export builds
    // unoptimized: ENABLE_STATIC_EXPORT,
    // // We allow SVGs to be used as images
    // dangerouslyAllowSVG: true,
    // // We add it to the remote pattern for the static images we use from GitHub
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
