"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox-viem");
require("@nomicfoundation/hardhat-verify");
const config_1 = require("hardhat/config");
if (!config_1.vars.has("DEPLOYER_PRIVATE_KEY")) {
    console.error("Missing env var DEPLOYER_PRIVATE_KEY");
}
const deployerPrivateKey = config_1.vars.get("DEPLOYER_PRIVATE_KEY");
const config = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1, // Minimize deployment bytecode size (fits EIP-170 24KB limit)
            },
        },
    },
    networks: {
        polkadotHubTestnet: {
            url: "https://services.polkadothub-rpc.com/testnet",
            accounts: [deployerPrivateKey],
            timeout: 120000, // 120 seconds
            gas: 30000000,
        },
    },
    etherscan: {
        apiKey: {
            polkadotHubTestnet: "YOU_CAN_COPY_ME",
        },
        customChains: [
            {
                network: "polkadotHubTestnet",
                chainId: 420420417,
                urls: {
                    apiURL: "https://blockscout-testnet.polkadot.io/api",
                    browserURL: "https://blockscout-testnet.polkadot.io/",
                },
            },
        ],
    },
    sourcify: {
        // Disabled by default
        // Doesn't need an API key
        enabled: false,
    },
};
exports.default = config;
