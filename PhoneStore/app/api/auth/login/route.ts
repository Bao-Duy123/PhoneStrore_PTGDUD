import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, createUser, findUserByPhone } from '@/lib/data/users';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập đầy đủ thông tin' },
        { status: 400 }
      );
    }

    const user = findUserByPhone(phone);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Số điện thoại hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Số điện thoại hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...userWithoutPassword } = user;

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
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}
