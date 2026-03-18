# Lectern – IP Management Platform

Decentralized intellectual property management on **Polkadot Hub Testnet**: register IP assets (ERC-6551), mint licenses, collect royalties, monitor infringements (Yakoa), and resolve disputes—all from one dashboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Polkadot Hub](https://img.shields.io/badge/Polkadot_Hub-000000?style=flat&logo=ethereum&logoColor=white)](https://polkadot.io/)

---

## Table of Contents

- [Vision & Commitment](#vision--commitment)
  - [Schedule](#schedule)
- [Project Structure](#project-structure)
- [Implementation Summary](#implementation-summary)
- [Network & Contracts](#network--contracts)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
- [Documentation](#documentation)
- [License](#license)

---

## Vision & Commitment

**Vision**  
To democratize intellectual property management by creating a decentralized, transparent, and automated platform that empowers creators to protect, monetize, and manage their IP assets with unprecedented efficiency.

**Mission**  
Lectern revolutionizes IP management by combining blockchain technology with AI-powered infringement detection, creating a comprehensive ecosystem where creators can register, license, monetize, and protect their intellectual property with built-in enforcement mechanisms.

**Commitment**  
We are committed to building in the open, putting creators first, and delivering a public-good infrastructure for IP on Polkadot Hub: transparent on-chain provenance, fair royalty flows, and enforceable rights without gatekeepers. We ship iteratively, document clearly, and welcome contributions that align with this mission.

### Schedule

| Phase | Scope | Status |
|-------|--------|--------|
| **Phase 1 – Foundation** | Smart contracts (ModredIP, ERC-6551), frontend, backend, IPFS, Yakoa infringement, arbitration | ✅ Done |
| **Phase 2 – Launch & hardening** | Testnet launch, documentation, deployment automation, first users | ✅ Done |
| **Phase 3 – Advanced** | License templates, royalty preview, infringement dashboard | ✅ Done |
| **Phase 4 – Mobile & API** | Mobile app, public API for third-party integrations | 🚧 In progress |
| **Phase 5+** | Marketplace, analytics, multi-chain, enterprise | Planned |

We are committed to completing Phase 4 (mobile, API), then advancing toward Phase 5+. For full roadmap and team, see [PROJECT_DETAILS.md](PROJECT_DETAILS.md).

---

## Project Structure

```
lectern/
├── app/                    # React frontend (Vite + Thirdweb)
│   ├── public/             # Static assets (e.g. lectern.png)
│   ├── src/
│   │   ├── deployed_addresses.json   # Contract addresses (from ignition)
│   │   └── ...
│   └── README.md           # App-specific docs
├── backend/                # Node + Express API (Polkadot Hub, Yakoa, IPFS)
│   ├── src/
│   │   ├── index.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   └── ...
│   └── README.md           # Backend API & env docs
├── contracts/              # Solidity
├── ignition/               # Hardhat Ignition deployment
│   ├── modules/
│   └── deployments/chain-420420417/
│       └── deployed_addresses.json   # Canonical contract addresses
├── hardhat.config.ts       # Hardhat + Polkadot Hub Testnet
├── DEPLOYMENT_GUIDE.md     # Contract deploy & verify
├── PROJECT_DETAILS.md      # Vision, team, roadmap
└── README.md               # This file
```

---

## Implementation Summary

| Layer | Stack |
|-------|--------|
| **Network** | Polkadot Hub Testnet (Chain ID 420420417). RPC: `https://services.polkadothub-rpc.com/testnet`. Explorer: Blockscout. |
| **Frontend** | React 18, Vite, TypeScript. Thirdweb for wallet connect; Viem for on-chain reads/writes (IP assets, licenses, pay revenue, claim royalties). Logo/favicon: `app/public/lectern.png`. |
| **Backend** | Node.js, Express, Viem. Registers IP on-chain (ModredIP), mints licenses, Pinata for IPFS, Yakoa for infringement (when receipt confirmed). Priority fee + 5‑min receipt timeout. |
| **Contracts** | ModredIP (ERC-721 + ERC-6551), ERC6551Registry, ERC6551Account. Deployed via Hardhat Ignition. |
| **IP registration** | App uploads NFT metadata to IPFS and sends `tokenUri` to backend; contract stores it so `tokenURI(tokenId)` works for Blockscout. |
| **Branding** | "Lectern" everywhere. API accepts `lecternContractAddress` (legacy `modredIpContractAddress` supported). |

---

## Network & Contracts

- **Network:** Polkadot Hub Testnet  
- **Chain ID:** 420420417  
- **RPC:** https://services.polkadothub-rpc.com/testnet  
- **Explorer:** https://blockscout-testnet.polkadot.io/  
- **Native token:** PAS  

### Deployed contracts (Polkadot Hub Testnet)

| Contract key | Role | Address |
|--------------|------|---------|
| **ModredIPModule#ModredIP** | Main contract (ERC-721, IP registration, licenses, royalties, disputes) | `0x5829940874605d61496CE818914B972c507E55c7` |
| **ModredIPModule#ERC6551Registry** | ERC-6551 registry (token-bound accounts) | `0xC9Dcb6910D59417B7227562eFB0776c7C3c0c280` |
| **ModredIPModule#ERC6551Account** | ERC-6551 account implementation | `0xec79fC54BCb5D41Db79552c1c463FFC33479Be03` |

Addresses are in `app/src/deployed_addresses.json` (synced from `ignition/deployments/chain-420420417/deployed_addresses.json` on `yarn install` in `app/`). To redeploy, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Yarn** (or npm)
- **Wallet** with Polkadot Hub Testnet (PAS) for gas
- **Thirdweb** Client ID (for app)
- **Pinata** JWT (for IPFS uploads)
- **Yakoa** API key (optional; for infringement)

### Quick Start

**1. Clone and install**

```bash
git clone https://github.com/your-org/lectern.git
cd lectern
yarn install
```

**2. Frontend (app)**

```bash
cd app
yarn install
```

Create `app/.env`:

```env
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

Start the dev server:

```bash
yarn dev
```

App runs at **http://localhost:5173** (or the port Vite prints).

**3. Backend**

```bash
cd backend
yarn install
```

Create `backend/.env` (see [Environment Variables](#environment-variables)):

```env
WALLET_PRIVATE_KEY=your_private_key
PINATA_JWT=your_pinata_jwt
```

Start the API:

```bash
yarn start
```

Backend runs at **http://localhost:5000**.

**4. Connect app to backend**

Set the backend URL in the app (e.g. in `app/src/App.tsx` or via env). Connect your wallet to **Polkadot Hub Testnet** (Chain ID **420420417**) and use the dashboard.

### Environment Variables

| Location | Purpose |
|----------|---------|
| **app/** | `VITE_THIRDWEB_CLIENT_ID` – Thirdweb client ID. See [app/README.md](app/README.md). |
| **backend/** | Required: `WALLET_PRIVATE_KEY`, `PINATA_JWT`. Optional: `YAKOA_*`. See [backend/README.md](backend/README.md). |
| **Root** | `DEPLOYER_PRIVATE_KEY` for contract deploy. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md). |

### Scripts

| Where | Command | Description |
|-------|---------|-------------|
| **Root** | `yarn install` | Install root deps (e.g. Hardhat). |
| **Root** | `npx hardhat ignition deploy ignition/modules/ModredIP.ts --network polkadotHubTestnet` | Deploy contracts. |
| **app/** | `yarn dev` | Start Vite dev server. |
| **app/** | `yarn build` | Production build; copies `deployed_addresses.json` from ignition if present. |
| **backend/** | `yarn start` | Run API. |

---

## Documentation

- **[app/README.md](app/README.md)** – Frontend features, usage, contract addresses.
- **[backend/README.md](backend/README.md)** – API endpoints, env vars, network config.
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** – Deploy and verify contracts on Polkadot Hub Testnet.
- **[PROJECT_DETAILS.md](PROJECT_DETAILS.md)** – Vision, team, roadmap, and project description.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

**Built with ❤️ by the Lectern Team**
