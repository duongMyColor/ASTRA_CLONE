// note: the if statement is present because you
//       only need to use the function during development
if (process.env.NODE_ENV === 'development') {
  const { setupDevPlatform } = require('@cloudflare/next-on-pages/next-dev');
  setupDevPlatform();
}

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' });
    return config;
  },
};
