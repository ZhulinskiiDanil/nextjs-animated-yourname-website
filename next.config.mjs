/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gen.jut.su',
        pathname: '/*/**',
        port: '',
      }
    ]
  }
};

export default nextConfig;
