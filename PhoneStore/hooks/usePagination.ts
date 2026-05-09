'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface UsePaginationOptions {
  defaultPage?: number;
  defaultLimit?: number;
  totalItems: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  offset: number;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function usePagination({
  defaultPage = 1,
  defaultLimit = 12,
  totalItems,
}: UsePaginationOptions): UsePaginationReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : defaultPage;
  }, [searchParams, defaultPage]);

  const pageSize = useMemo(() => {
    const limit = searchParams.get('limit');
    return limit ? parseInt(limit, 10) : defaultLimit;
  }, [searchParams, defaultLimit]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);

  const offset = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const setPageSize = useCallback(
    (size: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('limit', size.toString());
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    currentPage,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    offset,
    canGoNext,
    canGoPrev,
  };
}
