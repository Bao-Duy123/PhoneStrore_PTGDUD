import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getAllUsers, findUserById, updateUser } from '@/lib/data/users';

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

// GET /api/users - List all users (admin only)
export async function GET(request: NextRequest) {
  const decoded = verifyToken(request);
  
  if (!decoded || decoded.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const users = getAllUsers();
  return NextResponse.json(users);
}

// PUT /api/users - Update user
export async function PUT(request: NextRequest) {
  const decoded = verifyToken(request);
  
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    // Users can only update their own profile, admins can update anyone
    if (decoded.role !== 'admin' && decoded.userId !== id) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }
    
    const updated = updateUser(id, data);
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    const { password, ...userWithoutPassword } = updated;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
