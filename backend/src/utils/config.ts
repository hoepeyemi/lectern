import { Chain, createPublicClient, createWalletClient, http, WalletClient } from 'viem'
import { privateKeyToAccount, Address, Account } from 'viem/accounts'
import dotenv from 'dotenv'

dotenv.config()

// Polkadot Hub Testnet configuration
const polkadotHubTestnet: Chain = {
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
}

interface NetworkConfig {
    rpcProviderUrl: string
    blockExplorer: string
    chain: Chain
    nativeTokenAddress: Address
}

// Network configuration (Polkadot Hub Testnet)
const networkConfig: NetworkConfig = {
    rpcProviderUrl: 'https://services.polkadothub-rpc.com/testnet',
    blockExplorer: 'https://blockscout-testnet.polkadot.io/',
    chain: polkadotHubTestnet,
    nativeTokenAddress: '0x0000000000000000000000000000000000000000' as Address, // Native PAS token
}

// Use RPC_PROVIDER_URL only if it points to Polkadot Hub; otherwise use default Polkadot Hub RPC
function getRpcUrl(): string {
    const env = process.env.RPC_PROVIDER_URL?.trim()
    if (!env) return networkConfig.rpcProviderUrl
    if (env.toLowerCase().includes('polkadot') || env.includes('polkadot.io') || env.includes('polkadothub')) return env
    return networkConfig.rpcProviderUrl
}

// Helper functions
const validateEnvironmentVars = () => {
    if (!process.env.WALLET_PRIVATE_KEY) {
        throw new Error('WALLET_PRIVATE_KEY is required in .env file')
    }
}

// Initialize configuration
validateEnvironmentVars()

export const networkInfo = {
    ...networkConfig,
    rpcProviderUrl: getRpcUrl(),
}

export const account: Account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}` as Address)

const baseConfig = {
    chain: networkInfo.chain,
    transport: http(networkInfo.rpcProviderUrl, {
        timeout: 60000, // 60 seconds timeout
        retryCount: 3,
        retryDelay: 1000,
    }),
} as const

export const publicClient = createPublicClient(baseConfig)
export const walletClient = createWalletClient({
    ...baseConfig,
    account,
}) as WalletClient

// Export constants
export const NATIVE_TOKEN_ADDRESS = networkInfo.nativeTokenAddress
export const BLOCK_EXPLORER_URL = networkInfo.blockExplorer
