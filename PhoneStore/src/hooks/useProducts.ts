import { useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setFilters,
  clearFilters,
  setPage,
  setSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from '@/store/slices/productsSlice';
import { ProductFilters, Product, ProductFormData } from '@/types';
import { productsApi } from '@/services/api';

export function useProducts() {
  const dispatch = useAppDispatch();
  const { items, filteredItems, selectedProduct, filters, pagination, isLoading } = useAppSelector(
    (state) => state.products
  );

  const handleSetFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const handleSetSelectedProduct = useCallback(
    (product: Product | null) => {
      dispatch(setSelectedProduct(product));
    },
    [dispatch]
  );

  const handleAddProduct = useCallback(
    async (data: ProductFormData) => {
      const product = await productsApi.createProduct(data);
      dispatch(addProduct(product));
      return product;
    },
    [dispatch]
  );

  const handleUpdateProduct = useCallback(
    async (id: number, data: Partial<ProductFormData>) => {
      const product = await productsApi.updateProduct(id, data);
      dispatch(updateProduct(product));
      return product;
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      await productsApi.deleteProduct(id);
      dispatch(deleteProduct(id));
    },
    [dispatch]
  );

  const featuredProducts = useMemo(() => items.filter(p => p.featured), [items]);

  return {
    items,
    filteredItems,
    selectedProduct,
    filters,
    pagination,
    isLoading,
    featuredProducts,
    setFilters: handleSetFilters,
    clearFilters: handleClearFilters,
    setPage: handleSetPage,
    setSelectedProduct: handleSetSelectedProduct,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}
