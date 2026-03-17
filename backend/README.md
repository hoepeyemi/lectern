# Polkadot Hub IP Management Backend

This backend service provides IP (Intellectual Property) management functionality on the Polkadot Hub Testnet using the Lectern (ModredIP) smart contract.

## Features

- **IP Registration**: Register IP assets on Polkadot Hub Testnet using the Lectern contract
- **License Minting**: Mint licenses for IP assets with customizable terms
- **License Validation**: Enforces one license per IP asset (prevents duplicate licenses)
- **IPFS Integration**: Upload metadata to IPFS for decentralized storage
- **Yakoa Integration**: Submit registered IPs to Yakoa for monitoring
- **Nonce Management**: Automatic retry logic with exponential backoff for transaction reliability
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Environment Variables

Create a `.env` file in the backend directory:

```env
WALLET_PRIVATE_KEY=your_private_key_here
PINATA_JWT=your_pinata_jwt
# Optional: Yakoa (infringement)
YAKOA_API_KEY=your_yakoa_api_key
YAKOA_SUBDOMAIN=your_subdomain
YAKOA_NETWORK=your_network
# Optional: frontend / CORS
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

RPC for Polkadot Hub Testnet is configured in code (`https://services.polkadothub-rpc.com/testnet`). No need to set `RPC_PROVIDER_URL` unless you override it.

## API Endpoints

### IP Registration
- **POST** `/api/register`
- **Body**:
  ```json
  {
    "ipHash": "ipfs://Qm...",
    "tokenUri": "ipfs://QmMetadataCid...",
    "metadata": "{\"name\":\"IP Asset Name\",\"description\":\"...\",...}",
    "isEncrypted": false,
    "lecternContractAddress": "0x5829940874605d61496CE818914B972c507E55c7",
    "skipContractCall": false
  }
  ```
- **tokenUri** (optional): IPFS URL of the NFT metadata JSON. When provided, this is stored on-chain so `tokenURI(tokenId)` returns a URL and Blockscout can show the image. If omitted, `metadata` is sent to the contract (backward compatible).
- **metadata**: Full JSON string used for Yakoa and internal use; can be the same as the JSON at `tokenUri` or a richer payload.
- **Response**: Returns transaction hash, IP asset ID, block number, explorer URL. On receipt timeout (5 min), returns success with tx hash and explorer URL; Yakoa registration is skipped when block number is unavailable.
- **Note**: Supports legacy `modredIpContractAddress` parameter for backward compatibility.

### License Minting
- **POST** `/api/license/mint`
- **Body**:
  ```json
  {
    "tokenId": 1,
    "royaltyPercentage": 10,
    "duration": 86400,
    "commercialUse": true,
    "terms": "{\"transferable\":true,\"commercialAttribution\":true,...}",
    "lecternContractAddress": "0x5829940874605d61496CE818914B972c507E55c7"
  }
  ```
- **Validation**: Automatically checks if a license already exists for the IP asset
- **Error**: Returns error if attempting to mint a second license for the same IP
- **Response**: Returns transaction hash, block number, and explorer URL

## Network Configuration

- **Network**: Polkadot Hub Testnet
- **Chain ID**: 420420417
- **RPC URL**: https://services.polkadothub-rpc.com/testnet
- **Explorer**: https://blockscout-testnet.polkadot.io/
- **Native Token**: PAS

## Smart Contracts

- **ModredIP (Lectern)**: Main contract for IP registration and license management
- **ERC6551Registry**: Token-bound account registry
- **ERC6551Account**: Token-bound account implementation

## Installation

```bash
cd backend
yarn install
```

## Running the Server

```bash
yarn start
```

The server will start on port 5000 by default.

**Note**: The server uses `ts-node` to run TypeScript directly, so changes to source files are picked up automatically on restart.

## Transaction Reliability

The backend includes automatic retry logic for blockchain transactions:
- **Nonce Management**: Fetches current nonce (including pending transactions) before each transaction
- **Retry Logic**: Automatically retries up to 3 times on nonce conflicts with exponential backoff
- **Error Handling**: Provides clear error messages for transaction failures
- **Race Condition Protection**: Handles concurrent transaction requests gracefully

## Key Features

1. **Network**: Polkadot Hub Testnet (Chain ID: 420420417)
2. **Token**: Using native PAS token for transactions
3. **Contracts**: Lectern (ModredIP) contract for IP management
4. **License Validation**: Enforces one license per IP asset
5. **Transaction Reliability**: Automatic retry with nonce management
6. **Error Handling**: Comprehensive error messages and recovery

## Implementation Notes

- **Polkadot Hub**: All chain calls use Polkadot Hub Testnet (Chain ID 420420417). Priority fee (e.g. 2 gwei) is set on write transactions to satisfy the network.
- **Receipt timeout**: Wait for transaction receipt uses a 5-minute timeout. If the RPC does not return a receipt in time, the API still returns success with the transaction hash and explorer URL so the user can confirm on Blockscout; `ipAssetId`/`blockNumber` may be null in that case.
- **Yakoa**: Registration to Yakoa runs only when the on-chain registration succeeded and we have `blockNumber` and `txHash` (skipped when receipt timed out or contract call was skipped).
- **Token URI**: When the client sends `tokenUri` (IPFS metadata URL), it is passed to the contract so Blockscout can display the NFT image.

## Recent Updates

- ✅ Lectern branding; API uses `lecternContractAddress` (legacy `modredIpContractAddress` supported)
- ✅ License validation (one license per IP)
- ✅ Nonce handling with retry logic; priority fee for Polkadot Hub
- ✅ Receipt timeout (5 min) with success response when tx submitted; Yakoa skipped when block number unavailable
- ✅ `tokenUri` support for Blockscout NFT image display
- ✅ Contract address (ModredIP): `0x5829940874605d61496CE818914B972c507E55c7` 