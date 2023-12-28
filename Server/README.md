![3DK Logo](https://3dkrender.com/wp-content/uploads/2021/05/3DK_LOGO_400x120.png)

# Server Template (for WAX blockchain dApps)

## Description

Create a backend server for a WAX blockchain dApp using Node, Express, and MongoDB.

Created by 3DK Render

## Installation (Server)

Clone the repo and install dependencies

```bash
git clone https://github.com/3dkrender/WAX_CS_Template.git
cd WAX_CS_Template/Server
npm install
```

This template works together with the [WAX-ReactClientTemplate](https://github.com/3dkrender/WAX_CS_Template/tree/main/Client). You must clone both repos and install dependencies in each one.

- Client and server must be running at the same time.
- Client and server must be running on different ports.
- Client and server can be running on different machines (recomedend for production)

## Environment Variables

Create a `.env-cmdrc.json` file in the root directory and add this json object with your own values:

_Note: WAXKEY is only required if you are using the WAX blockchain to put transactions on the blockchain. If you are only using the server to read blokchain and/or store data in a database, you can leave it out._

_Note: This template is valid for both the WAX mainnet and testnet. You can add more environments if you want to use other Antelope chains._

```json
{
  "TEST": {
    "CHAIN": "testnet",
    "CHAIN_ID": "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
    "RPC": "http://tapiwax.3dkrender.com",
    "WAXKEY": "PVT_K1_PKAAAAAAAAAAAAAAAAAAAAAA",
    "ACCOUNT": "accountname",
    "PORT": 3000,
    "MONGO_DBNAME": "dbname",
    "MONGO_URI": "mongodb://localhost:9857/"
  },
  "MAIN": {
    "CHAIN": "mainnet",
    "CHAIN_ID": "106a8d3c7c2b8ce8a8b4217d6e2df6e7888ec5f6d9b6c4d3a1a3f2b5bea6c2aa",
    "RPC": "https://apiwax.3dkrender.com",
    "WAXKEY": "PVT_K1_PKAAAAAAAAAAAAAAAAAAAAAA",
    "ACCOUNT": "accountname",
    "PORT": 3005,
    "MONGO_DBNAME": "dbname",
    "MONGO_URI": "mongodb://localhost:9857/"
  }
}
```

_The WAXKEY in the example is a fake key. You must use your own key._

# IMPORTANT

The project includes environment configuration files for educational purposes. Make sure that these files are not shared in your Github repository, especially if you publish your project in a public repository.

## Usage

Read the docs for some information: [Documentation](./docs/README.md)

## How to start the server

### Development

```bash
npm run dev
```

### Production

```bash
npm run start
```

## Versioning

### v0.2.0

- Updated to Wharfkit for session management and authentication (https://wharfkit.com/). Enfjs is now deprecated.
- Added sample function to push transactions to the blockchain