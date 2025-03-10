# WAX Server

A scalable and maintainable server implementation for interacting with the WAX blockchain, built with Clean Architecture principles.

![version](https://img.shields.io/badge/version-0.10.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- Clean Architecture implementation
- Type-safe WAX blockchain interaction
- In-memory caching system
- Comprehensive error handling
- Structured logging
- Security-first approach

## Prerequisites

- Node.js >= 14
- TypeScript >= 4.5
- WAX Blockchain account and keys

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
RPC=https://wax.greymass.com
CHAIN_ID=1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4
ACCOUNT=your.wax.account
WAXKEY=your_private_key
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
```

## Usage

```bash
# Development
npm run dev

# Production
npm run start

# Run tests
npm test
```

## API Endpoints

### Get Blockchain Info
```http
GET /api/getinfo
```

### Get User Tokens
```http
GET /api/getusertokens/:user
```

### Get Table Rows
```http
GET /api/get_table_rows/:code/:scope/:table
```

## Architecture

The project follows Clean Architecture principles with four main layers:

- Domain Layer: Core business logic
- Application Layer: Use cases
- Infrastructure Layer: External implementations
- Presentation Layer: API endpoints

For detailed architecture information, see [ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Testing

The project includes:
- Unit tests
- Integration tests
- API endpoint tests

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 