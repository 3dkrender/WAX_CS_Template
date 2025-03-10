![3DK Logo](https://3dkrender.com/wp-content/uploads/2021/05/3DK_LOGO_400x120.png)

# WAX Blockchain Client/Server Template

A comprehensive template for building decentralized applications (dApps) on the WAX blockchain, featuring a modern React client and a robust Node.js server.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WAX](https://img.shields.io/badge/blockchain-WAX-blue)](https://wax.io/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18-green)](https://nodejs.org/)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Configuration](#configuration)
- [Development](#development)
- [Architecture](#architecture)
- [Security](#security)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Introduction

One of the key challenges in blockchain adoption is user-friendliness. This template aims to simplify the development of WAX blockchain applications by providing a robust foundation with modern tools and best practices.

As WAX guilds, we are committed to facilitating adoption, and at 3DK Render, we contribute by providing this client/server framework that serves as a template for building robust applications on WAX Blockchain.

## Features

### Client Features
- Built with Vite, React 18, and HeroUI
- WAX Blockchain integration via WharfKit
- Multi-wallet support (Anchor, CloudWallet, Wombat)
- Multi-account support
- Redux for state management
- Internationalization support (i18next)
- Modern UI with TailwindCSS
- TypeScript support

### Server Features
- Node.js with Express
- MongoDB integration
- TypeScript support
- Comprehensive security measures
- WAX blockchain integration
- Structured error handling
- Request validation with Zod
- Detailed logging system

## Project Structure
```
WAX_CS_Template/
├── Client/                 # React frontend application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── env/              # Environment configurations
├── Server/                # Node.js backend application
│   ├── src/              # Source files
│   ├── docs/             # API documentation
│   └── config/           # Server configurations
└── docs/                 # Project documentation
```

## Prerequisites
- Node.js 18 or higher
- MongoDB
- Git
- Basic knowledge of TypeScript
- Understanding of:
  - React
  - Express
  - MongoDB
  - WAX Blockchain concepts

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/3dkrender/WAX_CS_Template.git
cd WAX_CS_Template
```

2. Install dependencies:
```bash
# Install client dependencies
cd Client && npm install

# Install server dependencies
cd ../Server && npm install
```

3. Set up environment variables:
```bash
# Client environment setup
cp Client/env/.env.example Client/env/.env

# Server environment setup
cp Server/.env-cmdrc.example.json Server/.env-cmdrc.json
```

4. Start development servers:
```bash
# Start client (in Client directory)
npm run dev:tlocal

# Start server (in Server directory)
npm run dev
```

## Detailed Setup

### Client Setup

The client is a React application that connects to the WAX blockchain and communicates with the backend server.

#### Environment Variables (Client)
Create `env/.env` file with:
```env
VITE_CHAIN=         # WAX chain name (mainnet/testnet)
VITE_UALRPC=       # WAX chain RPC endpoint
VITE_CHAINID=      # WAX chain ID
VITE_SERVER=       # Your server URL
VITE_EXPLORER=     # WAX explorer URL
```

#### Available Scripts (Client)
```bash
npm run dev:tlocal      # Run testnet in local mode
npm run dev:testnet     # Run testnet in production mode
npm run start:mlocal    # Run mainnet in local mode
npm run start:main      # Run mainnet in production mode
npm run build:mainnet   # Build for mainnet
npm run build:testnet   # Build for testnet
```

### Server Setup

The server provides API endpoints for the client and handles blockchain interactions and database operations.

#### Environment Configuration (Server)
Create `.env-cmdrc.json` with:
```json
{
  "TEST": {
    "CHAIN": "testnet",
    "CHAIN_ID": "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    "RPC": "http://tapiwax.3dkrender.com",
    "WAXKEY": "YOUR_PRIVATE_KEY",
    "ACCOUNT": "your.account",
    "PORT": 3000,
    "MONGO_DBNAME": "your_db",
    "MONGO_URI": "mongodb://localhost:27017/"
  },
  "MAIN": {
    "CHAIN": "mainnet",
    "CHAIN_ID": "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    "RPC": "https://apiwax.3dkrender.com",
    "WAXKEY": "YOUR_PRIVATE_KEY",
    "ACCOUNT": "your.account",
    "PORT": 3005,
    "MONGO_DBNAME": "your_db",
    "MONGO_URI": "mongodb://localhost:27017/"
  }
}
```

#### Available Scripts (Server)
```bash
npm run dev    # Run in development mode
npm run start  # Run in production mode
```

## Security

The template includes several security measures:

- Rate limiting
- CORS protection
- XSS prevention
- Request validation
- Parameter pollution prevention
- Security headers
- Body size limits

For detailed security documentation, see [Security Guide](./docs/security.md).

## Versioning

### Client Versions
- v0.8.0: Enhanced security measures and unified documentation
  - Implemented comprehensive security features
  - Added detailed security documentation
  - Unified and improved project documentation
  - Added contributing guidelines
- v0.7.0: Migration from NextUI to HeroUI
- v0.6.0: Added redux and multi-language support
- v0.5.0: Added Multi-Account support
- v0.4.0: Added Wombat WAX Wallet support
- v0.3.0: Updated to Wharf session management
- v0.2.0: NextUI v2.0.0 update

### Server Versions
- v0.4.0: Security enhancements and documentation improvements
  - Added rate limiting
  - Implemented Helmet security headers
  - Added CORS protection
  - Added parameter pollution prevention
  - Added request validation with Zod
  - Improved error handling
  - Enhanced documentation
- v0.3.0: Improved blockchain table reading
- v0.2.0: Updated to Wharfkit, added transaction support

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Github](https://www.github.com/3dkrender)
- [Discord](https://discord.gg/3dkrender)
- [Documentation](./docs)

---

Created with ❤️ by [3DK Render](https://3dkrender.com)

