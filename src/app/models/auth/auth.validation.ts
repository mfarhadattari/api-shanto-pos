import { z } from 'zod';

export const loginAdminValidationSchema = z.object({
  body: z.object({
    username: z.string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username must be provided',
    }),
    password: z.string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password must be provided',
    }),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      invalid_type_error: 'Old password must be a string',
      required_error: 'Old password must be provided',
    }),
    newPassword: z.string({
      invalid_type_error: 'New password must be a string',
      required_error: 'New password must be provided',
    }),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string({
      invalid_type_error: 'New password must be a string',
      required_error: 'New password must be provided',
    }),
  }),
});
