import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByPhone, findUserByEmail } from '@/lib/data/users';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập đầy đủ thông tin' },
        { status: 400 }
      );
    }

    if (findUserByPhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Số điện thoại đã được sử dụng' },
        { status: 400 }
      );
    }

    if (findUserByEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'user',
    });

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}
