import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MainPage } from '../Pages/Landing/main';

// Mock de import.meta.env
vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_APP_NAME: 'Test App'
    }
  }
});

describe('MainPage Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<MainPage />);
    expect(container).toBeTruthy();
  });

  it('has the correct structure', () => {
    const { container } = render(<MainPage />);
    const mainDiv = container.querySelector('div[class*="mt-[50px]"]');
    const titleP = container.querySelector('p[class*="text-3xl"]');
    
    expect(mainDiv).toBeInTheDocument();
    expect(titleP).toBeInTheDocument();
    expect(mainDiv?.className).toContain('justify-content-center');
    expect(titleP?.className).toContain('font-black');
    expect(titleP?.className).toContain('text-center');
  });
}); 