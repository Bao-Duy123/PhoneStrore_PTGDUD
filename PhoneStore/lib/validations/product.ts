import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự')
    .max(200, 'Tên sản phẩm không được quá 200 ký tự'),
  price: z
    .number()
    .min(1000, 'Giá phải lớn hơn 1,000đ')
    .max(1000000000, 'Giá không được quá 1 tỷ đồng'),
  oldPrice: z
    .number()
    .optional()
    .refine((val) => !val || val > 0, 'Giá cũ phải lớn hơn 0'),
  brand: z.enum(['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google'], {
    errorMap: () => ({ message: 'Vui lòng chọn thương hiệu hợp lệ' }),
  }),
  image: z
    .string()
    .url('URL hình ảnh không hợp lệ')
    .or(z.literal('')),
  stock: z
    .number()
    .int('Số lượng phải là số nguyên')
    .min(0, 'Số lượng không được âm'),
  specs: z.object({
    screen: z.string().min(1, 'Thông tin màn hình là bắt buộc'),
    cpu: z.string().min(1, 'Thông tin CPU là bắt buộc'),
    ram: z.string().min(1, 'Thông tin RAM là bắt buộc'),
    rom: z.string().min(1, 'Thông tin bộ nhớ là bắt buộc'),
    battery: z.string().min(1, 'Thông tin pin là bắt buộc'),
  }),
  highlights: z.array(z.string()).optional(),
});

export const productSearchSchema = z.object({
  search: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductSearchData = z.infer<typeof productSearchSchema>;
