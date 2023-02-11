import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const PRIVATE_KEY_OWNER: string = process.env.PRIVATE_KEY_OWNER? process.env.PRIVATE_KEY_OWNER : "";
const PRIVATE_KEY_MINTER: string = process.env.PRIVATE_KEY_MINTER? process.env.PRIVATE_KEY_MINTER : "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon.llamarpc.com",
      }
    }, 
    polygon: {
      url: process.env.RPC_URL_POLYGON,
      accounts: [PRIVATE_KEY_OWNER, PRIVATE_KEY_MINTER]
    },
    bsc : {
      url: process.env.RPC_URL_BSC,
      accounts: [PRIVATE_KEY_OWNER, PRIVATE_KEY_MINTER]
    },
    optimism : {
      url: process.env.RPC_URL_OPTIMISM,
      accounts: [PRIVATE_KEY_OWNER, PRIVATE_KEY_MINTER]
    }
  }
};

export default config;
