import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'PhoneStore - Cửa hàng điện thoại uy tín',
    template: '%s | PhoneStore',
  },
  description: 'Chuyên cung cấp các sản phẩm điện thoại smartphone chính hãng với giá tốt nhất. iPhone, Samsung, Xiaomi chính hãng.',
  keywords: ['điện thoại', 'smartphone', 'iPhone', 'Samsung', 'Xiaomi', 'mua điện thoại'],
  authors: [{ name: 'PhoneStore' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'PhoneStore',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-[#f3f4f6] flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
