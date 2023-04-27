/**
 * @type {import('next').NextConfig}
 */
/* global module */

import withBundleAnalyzer from '@next/bundle-analyzer';
import withPwa from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['loremflickr.com', 'i.ibb.co'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: { dimensions: false },
        },
        'url-loader',
      ],
    });

    return config;
  },
};

export default withPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/',
  sw: '/service-worker.js',
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
})(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })(nextConfig),
);
