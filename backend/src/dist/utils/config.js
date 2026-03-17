"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCK_EXPLORER_URL = exports.NATIVE_TOKEN_ADDRESS = exports.walletClient = exports.publicClient = exports.account = exports.networkInfo = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Polkadot Hub Testnet configuration (Chain ID: 420420417)
const polkadotHubTestnet = {
    id: 420420417,
    name: 'Polkadot Hub Testnet',
    nativeCurrency: {
        name: 'PAS',
        symbol: 'PAS',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://services.polkadothub-rpc.com/testnet'],
        },
        public: {
            http: ['https://services.polkadothub-rpc.com/testnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout-testnet.polkadot.io/',
        },
    },
};
// Network configuration
const networkConfig = {
    rpcProviderUrl: 'https://services.polkadothub-rpc.com/testnet',
    blockExplorer: 'https://blockscout-testnet.polkadot.io/',
    chain: polkadotHubTestnet,
    nativeTokenAddress: '0x0000000000000000000000000000000000000000', // Native PAS token
};
// Helper functions
const validateEnvironmentVars = () => {
    if (!process.env.WALLET_PRIVATE_KEY) {
        throw new Error('WALLET_PRIVATE_KEY is required in .env file');
    }
};
// Initialize configuration
validateEnvironmentVars();
exports.networkInfo = {
    ...networkConfig,
    rpcProviderUrl: process.env.RPC_PROVIDER_URL || networkConfig.rpcProviderUrl,
};
exports.account = (0, accounts_1.privateKeyToAccount)(`0x${process.env.WALLET_PRIVATE_KEY}`);
const baseConfig = {
    chain: exports.networkInfo.chain,
    transport: (0, viem_1.http)(exports.networkInfo.rpcProviderUrl, {
        timeout: 60000, // 60 seconds timeout
        retryCount: 3,
        retryDelay: 1000,
    }),
};
exports.publicClient = (0, viem_1.createPublicClient)(baseConfig);
exports.walletClient = (0, viem_1.createWalletClient)({
    ...baseConfig,
    account: exports.account,
});
// Export constants
exports.NATIVE_TOKEN_ADDRESS = exports.networkInfo.nativeTokenAddress;
exports.BLOCK_EXPLORER_URL = exports.networkInfo.blockExplorer;
