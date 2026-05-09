import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
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
    .min(1, 'Số điện thoại là bắt buộc')
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được quá 50 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
