'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis');
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const pageSizeOptions = [12, 24, 48, 96];

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      {/* Page Size Selector */}
      {onPageSizeChange && pageSize && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Hiển thị</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span> / trang</span>
          {totalItems !== undefined && (
            <span className="text-gray-500">(Tổng: {totalItems} sản phẩm)</span>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-10 h-10 p-0 hidden sm:flex"
          title="Trang đầu"
        >
          <ChevronsLeft className="w-5 h-5" />
        </Button>

        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 p-0"
          title="Trang trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-10 h-10 p-0"
            >
              {page}
            </Button>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 p-0"
          title="Trang sau"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 p-0 hidden sm:flex"
          title="Trang cuối"
        >
          <ChevronsRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Page Info */}
      <div className="text-sm text-gray-500 hidden sm:block">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  );
}
