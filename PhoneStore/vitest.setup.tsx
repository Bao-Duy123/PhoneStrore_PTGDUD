import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import authReducer from '@/lib/store/slices/authSlice';
import cartReducer from '@/lib/store/slices/cartSlice';
import uiReducer from '@/lib/store/slices/uiSlice';

// --- Redux store factory ---
export function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

// --- Test wrapper with all required providers ---
function AllProviders({ children }: { children: ReactNode }) {
  const store = createTestStore();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}

// --- Custom render that wraps in providers ---
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// --- localStorage mock ---
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// --- Next.js router mock ---
const { useRouter, usePathname, useSearchParams, useParams } = await vi.hoisted(() => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

vi.mock('next/navigation', () => ({
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  redirect: vi.fn(),
}));

// --- window.matchMedia mock ---
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// --- ResizeObserver mock ---
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;

// --- Silence console.error in tests ---
const originalError = console.error;
const originalWarn = console.warn;
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning:') || args[0].includes('ReactDOM.render'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
    return;
  }
  originalWarn.call(console, ...args);
};
