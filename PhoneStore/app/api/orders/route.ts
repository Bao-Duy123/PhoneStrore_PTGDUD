import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Order, OrderItem } from '@/types';
import { products } from '@/lib/data/products';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

// In-memory orders store
let orders: Order[] = [];
let nextOrderId = 1;

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
  } catch {
    return null;
  }
}

// GET /api/orders - List orders
export async function GET(request: NextRequest) {
  const decoded = verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Regular users can only see their own orders, admins can see all
  const filteredOrders = decoded.role === 'admin' 
    ? orders 
    : orders.filter(o => o.userId === decoded.userId);
  
  return NextResponse.json(filteredOrders);
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  const decoded = verifyToken(request);
  
  try {
    const body = await request.json();
    const { items, totalAmount, shippingAddress, customerName, customerPhone, customerEmail, notes } = body;
    
    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Giỏ hàng trống' },
        { status: 400 }
      );
    }
    
    if (!shippingAddress || !customerName || !customerPhone) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập đầy đủ thông tin' },
        { status: 400 }
      );
    }
    
    const newOrder: Order = {
      id: nextOrderId++,
      userId: decoded?.userId || 0,
      items,
      totalAmount,
      status: 'pending',
      shippingAddress,
      customerName,
      customerPhone,
      customerEmail,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    
    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
