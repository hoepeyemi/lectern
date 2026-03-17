# Lectern – IP Management Platform

Decentralized intellectual property management on **Polkadot Hub Testnet**: register IP assets (ERC-6551), mint licenses, collect royalties, monitor infringements (Yakoa), and resolve disputes—all from one dashboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Polkadot Hub](https://img.shields.io/badge/Polkadot_Hub-000000?style=flat&logo=ethereum&logoColor=white)](https://polkadot.io/)

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Documentation](#documentation)
- [License](#license)

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
├── contracts/              # Solidity (if present)
├── ignition/              # Hardhat Ignition deployment
│   ├── modules/
│   └── deployments/chain-420420417/
│       └── deployed_addresses.json   # Canonical contract addresses
├── hardhat.config.ts       # Hardhat + Polkadot Hub Testnet
├── DEPLOYMENT_GUIDE.md     # Contract deploy & verify
├── PROJECT_DETAILS.md      # Vision, team, roadmap
└── README.md               # This file
```

---

## Prerequisites

- **Node.js** 18+
- **Yarn** (or npm)
- **Wallet** with Polkadot Hub Testnet (PAS) for gas
- **Thirdweb** Client ID (for app)
- **Pinata** JWT (for IPFS uploads)
- **Yakoa** API key (for infringement; optional for basic use)

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/your-org/lectern.git
cd lectern
yarn install
```

### 2. Frontend (app)

```bash
cd app
yarn install
```

Create `app/.env` (or set in `src/main.tsx`):

```env
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

Start the dev server:

```bash
yarn dev
```

App runs at **http://localhost:5173** (or the port Vite prints).

### 3. Backend

```bash
cd backend
yarn install
```

Create `backend/.env` (see [Environment Variables](#environment-variables)):

```env
WALLET_PRIVATE_KEY=your_private_key
PINATA_JWT=your_pinata_jwt
# Optional: RPC_PROVIDER_URL, YAKOA_* for infringement
```

Start the API:

```bash
yarn start
```

Backend runs at **http://localhost:5000**.

### 4. Connect the app to the backend

Set the backend URL in the app (e.g. in `app/src/App.tsx` or via env). Default is often `http://localhost:5000`. Connect your wallet to **Polkadot Hub Testnet** (Chain ID **420420417**) and use the dashboard.

---

## Environment Variables

| Location   | Purpose |
|-----------|---------|
| **app/**  | `VITE_THIRDWEB_CLIENT_ID` – Thirdweb client ID for wallet connect. See [app/README.md](app/README.md). |
| **backend/** | See [backend/README.md](backend/README.md). Required: `WALLET_PRIVATE_KEY`, `PINATA_JWT`. Optional: `RPC_PROVIDER_URL`, `YAKOA_API_KEY`, `YAKOA_SUBDOMAIN`, `YAKOA_NETWORK`. |
| **Root**  | For contract deploy: `DEPLOYER_PRIVATE_KEY` (or in Hardhat config). See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md). |

---

## Scripts

| Where    | Command | Description |
|----------|---------|-------------|
| **Root** | `yarn install` | Install root deps (e.g. Hardhat). |
| **Root** | `npx hardhat ignition deploy ignition/modules/ModredIP.ts --network polkadotHubTestnet` | Deploy contracts (see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)). |
| **app/** | `yarn dev` | Start Vite dev server. |
| **app/** | `yarn build` | Production build; postinstall copies `deployed_addresses.json` from `ignition/deployments/chain-420420417/` if present. |
| **backend/** | `yarn start` | Run API with ts-node. |

---

## Documentation

- **[app/README.md](app/README.md)** – Frontend features, usage, contract addresses.
- **[backend/README.md](backend/README.md)** – API endpoints, env vars, network config.
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** – Deploy and verify contracts on Polkadot Hub Testnet.
- **[PROJECT_DETAILS.md](PROJECT_DETAILS.md)** – Vision, team, roadmap, and project description.

---

## Network & Contracts

- **Network:** Polkadot Hub Testnet  
- **Chain ID:** 420420417  
- **RPC:** https://services.polkadothub-rpc.com/testnet  
- **Explorer:** https://blockscout-testnet.polkadot.io/  
- **Native token:** PAS  

Contract addresses are in `app/src/deployed_addresses.json` (copied from `ignition/deployments/chain-420420417/deployed_addresses.json` on `yarn install` in `app/`).

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Lectern Team**
