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
- Comprehensive testing setup with Vitest and React Testing Library

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
│   ├── src/
│   │   ├── core/          # Core application setup
│   │   │   ├── middleware/  # Custom Redux middleware
│   │   │   └── store/      # Redux store configuration
│   │   ├── features/      # Feature-based modules
│   │   │   └── auth/      # Authentication feature
│   │   │       ├── components/  # Presentational components
│   │   │       ├── containers/  # Container components
│   │   │       └── store/       # Feature-specific state
│   │   └── shared/       # Shared resources
│   │       ├── components/  # Reusable components
│   │       │   ├── atoms/    # Basic components
│   │       │   ├── molecules/ # Combinations of atoms
│   │       │   └── organisms/ # Complex components
│   │       ├── hooks/      # Custom React hooks
│   │       └── utils/      # Utility functions
│   ├── public/            # Static files
│   └── env/              # Environment configurations
├── Server/               # Node.js backend application
│   ├── src/             # Source files
│   ├── docs/            # API documentation
│   └── config/          # Server configurations
└── docs/                # Project documentation
```

## Architecture

The project follows a modern, scalable architecture with several key design patterns and principles:

### Client Architecture

#### Feature-Based Structure
- Organized around business domains rather than technical concerns
- Each feature is self-contained with its own components, logic, and state
- Promotes code cohesion and reduces coupling

#### Component Architecture
Follows Atomic Design principles:
- **Atoms**: Basic building blocks (buttons, inputs, etc.)
- **Molecules**: Simple combinations of atoms
- **Organisms**: Complex UI components
- **Templates**: Page layouts
- **Pages**: Specific instances of templates

#### State Management
- Redux Toolkit for global state management
- Feature-based state organization
- Custom middleware for logging and error handling
- Selectors for efficient state access

#### Design Patterns
1. **Container/Presentational Pattern**
   - Containers handle logic and state
   - Presentational components focus on UI
   - Clear separation of concerns

2. **Observer Pattern**
   - Implemented through Redux for state management
   - Reactive updates to state changes

3. **Factory Pattern**
   - Used in async action creators
   - Standardized object creation

4. **Strategy Pattern**
   - Applied in component variants
   - Configurable behaviors

#### Custom Hooks
- Reusable logic extraction
- Standardized state management
- Browser API abstractions

### Server Architecture
[Previous server architecture documentation remains unchanged]

## Development

### Client Development

#### State Management
```typescript
// Example of a Redux slice
import { createSlice } from '@reduxjs/toolkit';

export const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    // Your reducers
  },
});
```

#### Component Development
```typescript
// Atomic component example
import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  // Props definition
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  // Props destructuring
}) => {
  // Component implementation
};
```

#### Container Pattern
```typescript
// Container component example
import { useDispatch, useSelector } from 'react-redux';

export const FeatureContainer: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectFeatureData);
  
  // Business logic implementation
};
```

### Custom Hooks
```typescript
// Custom hook example
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Hook implementation
}
```

[Rest of the documentation remains unchanged]

## Versioning

- v0.10.0
  - Enhanced architecture and design patterns
    - Implemented feature-based architecture with Atomic Design
    - Improved state management with Redux Toolkit
    - Added custom middleware and hooks
    - Updated project documentation
    - Reorganized project structure for better scalability

- v0.9.0
  - Testing and Security Enhancements
    - Implemented comprehensive testing setup with Vitest and React Testing Library
    - Added component and unit testing capabilities
    - Implemented rate limiting and security headers
    - Added CORS protection and parameter pollution prevention
    - Added request validation with Zod
    - Enhanced error handling system
    - Added test coverage reporting

- v0.8.0
  - Documentation and Security Update
    - Unified project documentation
    - Enhanced security measures
    - Added detailed security documentation
    - Added contributing guidelines
    - Improved API documentation

- v0.7.0
  - UI and Blockchain Integration
    - Migrated from NextUI to HeroUI
    - Improved blockchain table reading
    - Enhanced WAX integration features
    - Updated to Wharfkit with transaction support

- v0.6.0
  - Feature Enhancements
    - Added Redux for state management
    - Implemented multi-language support (i18next)
    - Enhanced API endpoints
    - Improved error handling

- v0.5.0
  - Wallet Integration
    - Added Multi-Account support
    - Added Wombat WAX Wallet support
    - Enhanced wallet connection handling
    - Improved session management

- v0.4.0
  - Core Updates
    - Updated to Wharf session management
    - Enhanced blockchain integration
    - Improved transaction handling
    - Added basic security measures

- v0.3.0
  - Initial Features
    - Basic WAX blockchain integration
    - Multiple wallet support
    - Basic server functionality
    - Initial UI components

- v0.2.0
  - Project Setup
    - Initial project structure
    - Basic client/server architecture
    - NextUI integration
    - Basic documentation

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

