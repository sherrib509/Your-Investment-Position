/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: false, // Disable to prevent double effect calls
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
      stream: false,
    };
    config.externals.push("pino-pretty", "encoding");
    
    // Add polyfills for browser
    if (!isServer) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        })
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser"),
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;

