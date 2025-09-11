const nextConfig = {
  reactStrictMode: true,
  env: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL, // ✅ Add this line
  },
};

export default nextConfig;
