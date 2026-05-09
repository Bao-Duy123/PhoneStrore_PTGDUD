import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'phonestore-secret-key-2024';

// Routes cần đăng nhập
const PROTECTED_ROUTES = ['/checkout', '/profile'];

// Routes chỉ dành cho admin
const ADMIN_ROUTES = ['/admin'];

// Routes không cho phép khi đã đăng nhập (redirect về home)
const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lấy token từ cookie
  const token = request.cookies.get('token')?.value;
  let userRole: string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      userRole = decoded.role;
      isAuthenticated = true;
    } catch {
      // Token không hợp lệ hoặc hết hạn
      isAuthenticated = false;
    }
  }

  // Kiểm tra routes yêu cầu đăng nhập
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Kiểm tra routes chỉ dành cho admin
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  if (isAdminRoute && userRole !== 'admin') {
    // Redirect về home nếu không phải admin
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Redirect nếu đã đăng nhập mà vào login/register
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute && isAuthenticated) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Chỉ chạy middleware cho các paths cần thiết
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - .*\\..* (files with extensions)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)',
  ],
};
