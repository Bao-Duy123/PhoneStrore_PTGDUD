import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getAllProducts } from '@/lib/data/products';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

export async function GET(request: NextRequest) {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}
