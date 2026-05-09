import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .trim(),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  avatar: z.string().url('URL avatar không hợp lệ').optional().or(z.literal('')),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Mật khẩu hiện tại là bắt buộc'),
  newPassword: z
    .string()
    .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được quá 50 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: 'Vai trò không hợp lệ' }),
  }),
});

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateUserRoleData = z.infer<typeof updateUserRoleSchema>;
