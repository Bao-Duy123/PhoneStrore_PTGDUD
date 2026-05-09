'use client';

import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  threshold?: number;
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading = false,
  threshold = 100,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node || !hasMore || isLoading) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            onLoadMore();
          }
        },
        { rootMargin: `${threshold}px` }
      );

      observerRef.current.observe(node);
    },
    [hasMore, isLoading, onLoadMore, threshold]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { loadMoreRef };
}
