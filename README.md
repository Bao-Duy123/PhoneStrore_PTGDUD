# PhoneStrore_PTGDUD

======================================================
PHONESTORE - HỆ THỐNG E-COMMERCE BÁN LẺ ĐIỆN THOẠI DI ĐỘNG
======================================================

1. GIỚI THIỆU CHUNG (INTRODUCTION)
PhoneStore là một ứng dụng thương mại điện tử (E-commerce) hoàn chỉnh chuyên biệt cho lĩnh vực bán lẻ điện thoại di động tại Việt Nam. Dự án được phát triển nhằm giải quyết bài toán tối ưu hóa trải nghiệm mua sắm trực tuyến của người dùng (từ việc tìm kiếm, lọc sản phẩm thông minh đến quy trình thanh toán nhanh chóng) đồng thời cung cấp một hệ thống quản trị (Admin Dashboard) mạnh mẽ giúp doanh nghiệp dễ dàng kiểm soát kho hàng, đơn hàng và tệp khách hàng.

Dự án được tổ chức mã nguồn theo mô hình chuẩn hóa, phân tách rõ ràng giữa các tầng Giao diện (UI Elements), Quản lý trạng thái (State Management) và Xử lý nghiệp vụ (Services Layer), sẵn sàng tích hợp với hệ thống Backend thực tế.

------------------------------------------------------

2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)
Hệ thống được xây dựng trên nền tảng công nghệ hiện đại, tối ưu tốc độ phản hồi và kiểm soát chặt chẽ kiểu dữ liệu:

- Core Framework: React (Phiên bản 18.x) - Thư viện xây dựng giao diện người dùng dựa trên Component.
- Build Tool: Vite (Phiên bản mới nhất) - Công cụ đóng gói (Bundler) thế hệ mới, tối ưu hóa tốc độ Hot Reload.
- Language: TypeScript (Phiên bản 5.x) - Kiểm soát kiểu dữ liệu tĩnh (Static Typing), hạn chế tối đa lỗi Runtime.
- State Management: Redux Toolkit (Phiên bản mới nhất) - Quản lý trạng thái toàn cục (Global State) tập trung cho Giỏ hàng, Auth.
- Form Handling: React Hook Form (Phiên bản mới nhất) - Xử lý dữ liệu biểu mẫu hiệu năng cao, giảm thiểu số lần re-render.
- Validation: Zod (Phiên bản mới nhất) - Định nghĩa Schema và kiểm tra tính hợp lệ dữ liệu phía Client.
- Styling: Tailwind CSS (Phiên bản 3.x) - Framework tiện ích CSS giúp tùy biến giao diện nhanh và hỗ trợ Responsive.


------------------------------------------------------

3. TÍNH NĂNG CỐT LÕI (CORE FEATURES)

Phân hệ Khách hàng (User Module):
- Hệ thống xác thực (Auth): Đăng nhập, đăng ký tài khoản thành viên có kèm cơ chế mã hóa phiên và ràng buộc dữ liệu phía Client qua Zod Schema.
- Tìm kiếm và Bộ lọc nâng cao (Search and Filter): Tìm kiếm thời gian thực (Debounce input) theo từ khóa, lọc động theo thương hiệu (Apple, Samsung, Xiaomi...) và khoảng giá, kết hợp phân trang (Pagination) mượt mà.
- Giỏ hàng tương tác (Shopping Cart): Sử dụng giao diện ngăn kéo trượt từ cạnh phải, cho phép người dùng thêm, bớt, cập nhật số lượng sản phẩm tức thì và tự động lưu trạng thái vào LocalStorage.
- Quy trình thanh toán (Checkout Process): Biểu mẫu tối ưu hóa các bước nhập thông tin nhận hàng, tính toán tổng tiền, áp dụng phí vận chuyển và khởi tạo đơn hàng.

Phân hệ Quản trị viên (Admin Module):
- Dashboard Thống kê: Trực quan hóa các chỉ số kinh doanh quan trọng như Tổng doanh thu, Tổng số đơn hàng thành công, và biểu đồ tăng trưởng số lượng khách hàng mới.
- Quản lý Sản phẩm (CRUD): Toàn quyền Xem danh sách, Thêm mới sản phẩm (kèm cấu hình thông số kỹ thuật chi tiết), Chỉnh sửa thông tin hình ảnh/giá bán và Xóa sản phẩm khỏi danh mục.
- Quản lý Đơn hàng (CRUD): Theo dõi danh sách đơn hàng toàn hệ thống, xem chi tiết hóa đơn và cập nhật trạng thái đơn hàng (Chờ xử lý -> Đang giao -> Đã giao -> Đã hủy).
- Quản lý Người dùng (CRUD): Tra cứu thông tin người dùng, khóa/mở khóa tài khoản thành viên và giám sát quyền truy cập hệ thống.

------------------------------------------------------

4. HƯỚNG DẪN CÀI ĐẶT MÔI TRƯỜNG LOCAL (LOCAL SETUP)


Các bước triển khai dòng lệnh:

Bước 1: Sao chép mã nguồn từ kho lưu trữ về máy
git clone https://github.com/Bao-Duy123/PhoneStrore_PTGDUD
cd PhoneStore

Bước 2: Cài đặt các gói thư viện phụ thuộc
npm install



Bước 3: Khởi chạy dự án trên môi trường local
npm run dev

Sau khi chạy lệnh thành công, ứng dụng sẽ khởi chạy tại địa chỉ mặc định: http://localhost:5173

--------------------------------------------------------------------

5. DANH SÁCH MÃ LỆNH SCRIPTS (PACKAGE.JSON)
Trong quá trình phát triển dự án, bạn có thể sử dụng các câu lệnh tích hợp sẵn trong tệp package.json dưới đây:

- npm run dev: Khởi chạy máy chủ phát triển cục bộ (Vite Dev Server) có hỗ trợ Hot Module Replacement (HMR).
- npm run build: Kiểm tra lỗi logic TypeScript và biên dịch, nén mã nguồn tối ưu thành các tệp tĩnh nằm trong thư mục /dist để sẵn sàng deploy lên production.
- npm run preview: Chạy thử giao diện từ thư mục /dist đã build ngay tại môi trường cục bộ để kiểm tra hiệu năng thực tế.


--------------------------------------------------------------------

6. THÔNG TIN DEMO VÀ THỬ NGHIỆM



Tài khoản kiểm thử (Demo Accounts):
Hệ thống đã phân quyền truy cập nghiêm ngặt dựa trên vai trò tài khoản. Để thuận tiện cho việc đánh giá và chấm điểm, bạn có thể sử dụng hai tài khoản có sẵn dưới đây:

1. Tài khoản phân quyền Quản trị (Admin Account)
- Số điện thoại/Email: 0909123456
- Mật khẩu: admin123
- Phạm vi truy cập: Có toàn quyền truy cập vào phân hệ Admin tại đường dẫn /admin, xem biểu đồ Dashboard, thao tác CRUD Sản phẩm, Đơn hàng và Người dùng.

2. Tài khoản phân quyền Khách hàng (User Account)
- Số điện thoại/Email: 0909123457
- Mật khẩu: password123
- Phạm vi truy cập: Trải nghiệm đầy đủ luồng mua sắm của khách hàng, thêm sản phẩm vào giỏ, tiến hành đặt hàng tại trang /checkout và theo dõi trạng thái đơn đặt hàng cá nhân.

