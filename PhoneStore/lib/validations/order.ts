import { z } from 'zod';

export const shippingAddressSchema = z.object({
  street: z
    .string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(200, 'Địa chỉ không được quá 200 ký tự'),
  ward: z
    .string()
    .min(1, 'Phường/Xã là bắt buộc'),
  district: z
    .string()
    .min(1, 'Quận/Huyện là bắt buộc'),
  city: z
    .string()
    .min(1, 'Tỉnh/Thành phố là bắt buộc'),
});

export const orderItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  productImage: z.string(),
  price: z.number().min(0),
  quantity: z.number().int().min(1, 'Số lượng phải lớn hơn 0'),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Đơn hàng phải có ít nhất 1 sản phẩm'),
  totalAmount: z.number().min(0),
  customerName: z
    .string()
    .min(2, 'Tên người nhận phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được quá 100 ký tự'),
  customerPhone: z
    .string()
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),
  shippingAddress: shippingAddressSchema,
  notes: z.string().max(500, 'Ghi chú không được quá 500 ký tự').optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'], {
    errorMap: () => ({ message: 'Trạng thái không hợp lệ' }),
  }),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusData = z.infer<typeof updateOrderStatusSchema>;
export type ShippingAddressData = z.infer<typeof shippingAddressSchema>;
