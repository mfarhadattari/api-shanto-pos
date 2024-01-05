import { z } from 'zod';

export const phoneNumberValidationSchema = z
  .string({ invalid_type_error: 'Phone number must be string' })
  .refine(
    (value: string) => {
      const regex = /(^(\+88)?(01){1}[3456789]{1}(\d){8})$/;
      return regex.test(value);
    },
    {
      message: 'Your phone number is invalid, provide like +8801*******9',
    },
  );

export const addressValidationSchema = z.object({
  location: z.string({
    invalid_type_error: 'Location must be a string',
    required_error: 'Location must be provided',
  }),
  townOrVillage: z.string({
    invalid_type_error: 'Town or village must be a string',
    required_error: 'Town or village must be provided',
  }),
  city: z.string({
    invalid_type_error: 'City must be a string',
    required_error: 'City must be provided',
  }),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name must be provided',
    }),
    avatar: z
      .string({
        required_error: 'Avatar URL must be provided',
      })
      .url('Avatar must be a url'),
    email: z
      .string({
        required_error: 'Email must be provided',
      })
      .email('Your email is invalid'),
    phone: phoneNumberValidationSchema,
    nid: z.string({
      invalid_type_error: 'NID number must be a string',
      required_error: 'NID number must be provided',
    }),
    address: addressValidationSchema,
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    avatar: z
      .string({
        required_error: 'Avatar URL must be provided',
      })
      .url('Avatar must be a url')
      .optional(),
    email: z
      .string({
        required_error: 'Email must be provided',
      })
      .email('Your email is invalid')
      .optional(),
    phone: phoneNumberValidationSchema.optional(),
    address: addressValidationSchema,
  }),
});
