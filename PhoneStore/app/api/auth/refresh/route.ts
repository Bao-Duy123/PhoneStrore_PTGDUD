import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'phonestore-refresh-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    // Lấy refresh token từ cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token không tồn tại' },
        { status: 401 }
      );
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
        userId: number;
        role: string;
      };
    } catch {
      return NextResponse.json(
        { success: false, message: 'Refresh token không hợp lệ hoặc đã hết hạn' },
        { status: 401 }
      );
    }

    // Tạo access token mới với thời hạn ngắn hơn
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      JWT_SECRET,
      { expiresIn: '15m' } // Access token sống trong 15 phút
    );

    // Tạo refresh token mới
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      token: newAccessToken,
    });

    // Set cookies mới
    response.cookies.set('token', newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 phút
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi server' },
      { status: 500 }
    );
  }
}
