'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useRefreshToken } from '@/hooks/useRefreshToken';

interface ProvidersProps {
  children: ReactNode;
}

// Wrapper component để gọi useRefreshToken bên trong Provider
function RefreshTokenWrapper({ children }: { children: ReactNode }) {
  useRefreshToken();
  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RefreshTokenWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </RefreshTokenWrapper>
      </QueryClientProvider>
    </Provider>
  );
}
