const { withSentryConfig } = require('@sentry/nextjs');
const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(
  nextTranslate(nextConfig),
  sentryWebpackPluginOptions
);
