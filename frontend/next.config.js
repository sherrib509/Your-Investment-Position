/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
      stream: false,
    };
    config.externals.push("pino-pretty", "encoding");
    
    // Exclude FHE SDK from server-side bundle
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@zama-fhe/relayer-sdk");
    }
    
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

