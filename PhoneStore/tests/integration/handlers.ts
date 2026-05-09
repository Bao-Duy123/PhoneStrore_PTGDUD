import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { phone: string; password: string };

    if (body.phone === '0909123456' && body.password === 'admin123') {
      return HttpResponse.json({
        success: true,
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@phonestore.vn',
          phone: '0909123456',
          role: 'admin',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        token: 'admin-mock-jwt-token',
      });
    }

    if (body.phone === 'nguyenvana@email.com' && body.password === 'password123') {
      return HttpResponse.json({
        success: true,
        user: {
          id: 2,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@email.com',
          phone: '0909123457',
          role: 'user',
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        },
        token: 'user-mock-jwt-token',
      });
    }

    return HttpResponse.json(
      { success: false, message: 'Số điện thoại hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as { email: string; phone: string; name: string; password: string };

    if (body.email && body.phone && body.name && body.password) {
      return HttpResponse.json({
        success: true,
        user: {
          id: 3,
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'new-user-mock-jwt-token',
      });
    }

    return HttpResponse.json(
      { success: false, message: 'Thông tin không hợp lệ' },
      { status: 400 }
    );
  }),

  // Products endpoint
  http.get('/api/products', () => {
    return HttpResponse.json({
      items: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max',
          price: 29990000,
          brand: 'Apple',
          image: '/iphone15.jpg',
          stock: 10,
          rating: 4.8,
        },
      ],
      total: 1,
      page: 1,
      limit: 12,
      totalPages: 1,
    });
  }),
];
