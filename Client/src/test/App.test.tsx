import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// Mock de los módulos necesarios
vi.mock('../router/routes', () => ({
  DinamicRoutes: []
}));

vi.mock('@wharfkit/session', () => ({
  SessionKit: vi.fn().mockImplementation(() => ({
    restore: vi.fn().mockResolvedValue(null)
  }))
}));

vi.mock('@wharfkit/wallet-plugin-anchor', () => ({
  WalletPluginAnchor: vi.fn()
}));

vi.mock('@wharfkit/web-renderer', () => {
  const WebRenderer = vi.fn();
  return {
    __esModule: true,
    default: WebRenderer,
    WebRenderer
  };
});

// Mock de import.meta.env
vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_CHAINID: 'test-chain-id',
      VITE_RPC: 'test-endpoint',
      VITE_CHAIN: 'testnet',
      VITE_SITE_TITLE: 'Test App'
    }
  }
});

describe('App Component', () => {
  it('renders without crashing', async () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });
}); 