import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByPhone, findUserByEmail } from '@/lib/data/users';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

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

    // Check if phone already exists
    if (findUserByPhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Số điện thoại đã được sử dụng' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
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
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    });

    // Set cookie TRƯỚC khi return
    response.cookies.set('token', token, {
      httpOnly: false, // Cho phép JavaScript đọc để debug, production nên true
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}
