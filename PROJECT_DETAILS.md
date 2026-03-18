# Lectern – Project Details (Vision, Team, Roadmap)

This document contains the full project description, vision, business model, team, roadmap, and related details. For getting started and development, see the main [README.md](README.md).

---

## Project Description

Lectern is a decentralized intellectual property (IP) management platform built on Polkadot Hub Testnet. Creators can register IP assets as token-bound accounts (ERC-6551), mint licenses with programmable terms and royalties, receive and distribute revenue on-chain, and resolve disputes through an arbitration system. The platform uses IPFS for storage, integrates AI-powered infringement detection (Yakoa), and offers transfer and gifting of IP assets with full on-chain provenance.

**Tech stack:** React 18, TypeScript, Vite, Thirdweb SDK (wallet) + Viem (on-chain reads/writes for Polkadot Hub); Node.js, Express, Viem (backend); Solidity, Hardhat, Hardhat Ignition (contracts); Polkadot Hub Testnet; IPFS/Pinata; Yakoa. NFT metadata is stored on-chain via `tokenURI` (IPFS URL) for Blockscout display.

---

## Vision & Mission

**Vision:** To democratize intellectual property management by creating a decentralized, transparent, and automated platform that empowers creators to protect, monetize, and manage their IP assets with unprecedented efficiency.

**Mission:** Lectern revolutionizes IP management by combining blockchain technology with AI-powered infringement detection, creating a comprehensive ecosystem where creators can register, license, monetize, and protect their intellectual property with built-in enforcement mechanisms.

---

## Key Features

- **IP Asset Registration** – NFT minting, IPFS metadata, encryption support
- **License Management** – Programmable terms, one license per IP, 8 predefined templates
- **Revenue & Royalties** – Direct payments, automated royalty distribution, claim flow
- **Infringement Detection** – Yakoa integration, severity analysis, auto-monitoring
- **Dispute Resolution** – On-chain disputes, arbitrator network, auto-resolution

---

## Team

- **Michael Afolabi** – CEO & Co-Founder  
- **Casweeny Ojukwu** – CTO & Technical Lead  
- **Pappu Kumar** – Head of Product  
- **Ayanfe Olajide** – Advisory Board Lead (IP law, blockchain, AI/ML)

---

## Roadmap

- **Phase 1 (Foundation)** – ✅ Smart contracts, frontend, backend, IPFS, Yakoa, arbitration
- **Phase 2 (Launch & hardening)** – ✅ Testnet launch, documentation, deployment automation, first users
- **Phase 3 (Advanced)** – ✅ License templates, royalty preview, infringement dashboard
- **Phase 4 (Mobile & API)** – 🚧 Mobile app, public API for third-party integrations
- **Phase 5+** – Marketplace, analytics, multi-chain, enterprise

---

## License

MIT. See [LICENSE](LICENSE) for details.

**Built with ❤️ by the Lectern Team**
