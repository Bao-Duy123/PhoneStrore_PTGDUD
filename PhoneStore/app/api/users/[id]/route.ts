import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserById, updateUser, deleteUser } from '@/lib/data/users';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

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

// GET /api/users/[id] - Get single user
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
  const userId = parseInt(id);
  
  // Users can only see their own profile, admins can see anyone
  if (decoded.role !== 'admin' && decoded.userId !== userId) {
    return NextResponse.json(
      { success: false, message: 'Không có quyền truy cập' },
      { status: 403 }
    );
  }
  
  const user = findUserById(userId);
  
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy người dùng' },
      { status: 404 }
    );
  }
  
  const { password, ...userWithoutPassword } = user;
  return NextResponse.json({ success: true, user: userWithoutPassword });
}

// PUT /api/users/[id] - Update user
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
  
  const { id } = await params;
  const userId = parseInt(id);
  
  // Users can only update their own profile, admins can update anyone
  if (decoded.role !== 'admin' && decoded.userId !== userId) {
    return NextResponse.json(
      { success: false, message: 'Không có quyền thực hiện' },
      { status: 403 }
    );
  }
  
  try {
    const body = await request.json();
    const { role, ...updateData } = body;
    
    // Only admins can change roles
    if (role && decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Không có quyền thay đổi vai trò' },
        { status: 403 }
      );
    }
    
    const updated = updateUser(userId, { ...updateData, ...(role && { role }) });
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy người dùng' },
        { status: 404 }
      );
    }
    
    const { password, ...userWithoutPassword } = updated;
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const decoded = verifyToken(request);
  
  if (!decoded || decoded.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const { id } = await params;
  const userId = parseInt(id);
  
  // Cannot delete self
  if (userId === decoded.userId) {
    return NextResponse.json(
      { success: false, message: 'Không thể tự xóa tài khoản của mình' },
      { status: 400 }
    );
  }
  
  const deleted = deleteUser(userId);
  
  if (!deleted) {
    return NextResponse.json(
      { success: false, message: 'Không tìm thấy người dùng' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true });
}
