import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Order } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

// In-memory orders store (shared with main route)
let orders: Order[] = [
  {
    id: 1,
    orderId: 'DH001',
    userId: 1,
    customer: 'Nguyễn Văn A',
    phone: '0909123457',
    email: 'nguyenvana@email.com',
    items: [
      {
        productId: 1,
        productName: 'iPhone 15 Pro Max 256GB',
        productImage: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:200:200/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max.png',
        price: 29990000,
        quantity: 1,
      },
    ],
    totalAmount: 29990000,
    status: 'pending',
    shippingAddress: '123 Nguyễn Trãi, Phường 1, Quận 1, TP HCM',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 2,
    orderId: 'DH002',
    userId: 2,
    customer: 'Trần Thị B',
    phone: '0909123458',
    email: 'tranthib@email.com',
    items: [
      {
        productId: 2,
        productName: 'Samsung Galaxy S24 Ultra',
        productImage: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:200:200/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222_3_1_1.png',
        price: 26590000,
        quantity: 1,
      },
    ],
    totalAmount: 26590000,
    status: 'confirmed',
    shippingAddress: '456 Lê Lợi, Phường 2, Quận 1, TP HCM',
    createdAt: '2024-03-14T14:20:00Z',
    updatedAt: '2024-03-14T16:00:00Z',
  },
  {
    id: 3,
    orderId: 'DH003',
    userId: 1,
    customer: 'Nguyễn Văn A',
    phone: '0909123457',
    email: 'nguyenvana@email.com',
    items: [
      {
        productId: 3,
        productName: 'Xiaomi 14 Ultra',
        productImage: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:200:200/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png',
        price: 24990000,
        quantity: 1,
      },
    ],
    totalAmount: 24990000,
    status: 'shipping',
    shippingAddress: '789 Đồng Khởi, Phường 3, Quận 1, TP HCM',
    createdAt: '2024-03-13T09:00:00Z',
    updatedAt: '2024-03-14T08:00:00Z',
  },
  {
    id: 4,
    orderId: 'DH004',
    userId: 3,
    customer: 'Lê Văn C',
    phone: '0909123459',
    email: 'levanc@email.com',
    items: [
      {
        productId: 5,
        productName: 'iPhone 13 128GB',
        productImage: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:200:200/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png',
        price: 13490000,
        quantity: 1,
      },
    ],
    totalAmount: 13490000,
    status: 'delivered',
    shippingAddress: '321 Trần Hưng Đạo, Phường 4, Quận 5, TP HCM',
    createdAt: '2024-03-10T11:30:00Z',
    updatedAt: '2024-03-12T15:00:00Z',
  },
];

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

// GET /api/orders/[id] - Get single order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const decoded = verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const { id } = await params;
  const orderId = parseInt(id);
  const order = orders.find((o) => o.id === orderId);
  
  if (!order) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy đơn hàng' },
      { status: 404 }
    );
  }
  
  // Regular users can only see their own orders
  if (decoded.role !== 'admin' && order.userId !== decoded.userId) {
    return NextResponse.json(
      { success: false, message: 'Không có quyền truy cập' },
      { status: 403 }
    );
  }
  
  return NextResponse.json({ success: true, order });
}

// PUT /api/orders/[id] - Update order
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const decoded = verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Only admins can update orders
  if (decoded.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Không có quyền thực hiện' },
      { status: 403 }
    );
  }
  
  const { id } = await params;
  const orderId = parseInt(id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  
  if (orderIndex === -1) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy đơn hàng' },
      { status: 404 }
    );
  }
  
  try {
    const body = await request.json();
    const { status } = body;
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Trạng thái không hợp lệ' },
        { status: 400 }
      );
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...(status && { status }),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id] - Delete order (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const decoded = verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Only admins can delete orders
  if (decoded.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Không có quyền thực hiện' },
      { status: 403 }
    );
  }
  
  const { id } = await params;
  const orderId = parseInt(id);
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  
  if (orderIndex === -1) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy đơn hàng' },
      { status: 404 }
    );
  }
  
  orders.splice(orderIndex, 1);
  
  return NextResponse.json({ success: true });
}
