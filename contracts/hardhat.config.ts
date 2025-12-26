import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

// Load from environment or use defaults
const PRIVATE_KEY = process.env.PRIVATE_KEY || "ee0c0fc3076cd3f503ee18e968d4977732bad7ee6a41842f9b9b9c148d9152ae";
const SEPOLIA_RPC = process.env.SEPOLIA_RPC || "https://eth-sepolia.g.alchemy.com/v2/xoOHEanw4MsRHCY9GF1Zc";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "N3ZQXT5EPMUZIDEF15MW3B2CJVF2KCZN6F";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
    },
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./src",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;

