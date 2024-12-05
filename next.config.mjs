/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // reactCompiler: true, // Remove until react 19 is compatible with Framer Motion and other libaries - 2 weeks after 18 release at least
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  // Enable static export
  // output: 'export',
};

export default nextConfig;
