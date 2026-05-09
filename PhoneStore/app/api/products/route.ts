import { NextRequest, NextResponse } from 'next/server';
import { products, filterProducts } from '@/lib/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get('search') || undefined;
  const brand = searchParams.get('brand') || undefined;
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
  const sortBy = searchParams.get('sortBy') || undefined;
  const sortOrder = searchParams.get('sortOrder') || undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12;

  const result = filterProducts({
    search,
    brand,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page,
    limit,
  });

  return NextResponse.json(result);
}
