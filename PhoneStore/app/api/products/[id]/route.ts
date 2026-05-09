import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/data/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = getProductById(parseInt(id));

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Sản phẩm không tìm thấy' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
