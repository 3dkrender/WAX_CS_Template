# WAX Server Architecture

## Overview

The server architecture follows Clean Architecture principles and is designed to be scalable, maintainable, and testable. The structure is organized into clearly defined layers that follow the dependency rule, with dependencies pointing inward.

## Layer Structure

```
src/
├── domain/           # Business rules and entities
├── application/      # Use cases
├── infrastructure/   # Technical implementations
└── presentation/     # API and controllers
```

### 1. Domain Layer (`domain/`)

Contains core business rules and main entities.

#### Entities
- `BlockchainInfo`: WAX blockchain information
- `Token`: Token structure and user balances
- `TableData`: Table query definitions

#### Repositories (Interfaces)
- `IWAXRepository`: Defines the contract for blockchain interaction

### 2. Application Layer (`application/`)

Implements application use cases.

#### Use Cases
- `GetBlockchainInfoUseCase`: Retrieves blockchain information
- `GetUserTokensUseCase`: Fetches user tokens
- `GetTableRowsUseCase`: Queries blockchain table data

### 3. Infrastructure Layer (`infrastructure/`)

Provides concrete implementations of interfaces defined in the domain.

#### Repositories
- `WAXRepository`: Concrete implementation for WAX blockchain interaction

#### Services
- `CacheService`: Performance optimization caching system
  - Implements Singleton pattern
  - TTL management by data type
  - Automatic transaction invalidation

### 4. Presentation Layer (`presentation/`)

Handles API exposure and client interaction.

#### Controllers
- `WAXController`: Manages WAX-related HTTP requests

#### Routes
- `wax.routes.ts`: Defines API endpoints

## Scalability Features

### Caching System
- In-memory caching with `node-cache`
- TTL configured by operation type:
  - Blockchain info: 5 seconds
  - User tokens: 30 seconds
  - Table data: 15 seconds
- Automatic transaction invalidation

### Error Handling
- Centralized error handling system
- Consistent HTTP responses
- Structured logging

### Security
- Configurable security middleware
- Restrictive CORS configuration
- Input validation in use cases

## API Endpoints

### Blockchain Info
```http
GET /api/getinfo
```

### User Tokens
```http
GET /api/getusertokens/:user
```

### Table Data
```http
GET /api/get_table_rows/:code/:scope/:table
```

## Configuration

The server can be configured using environment variables:
- `PORT`: Server port (default: 3000)
- `RPC`: WAX RPC endpoint URL
- `CHAIN_ID`: WAX chain ID
- `ACCOUNT`: WAX account for transactions
- `WAXKEY`: Private key for transactions
- `ALLOWED_ORIGINS`: CORS allowed origins 