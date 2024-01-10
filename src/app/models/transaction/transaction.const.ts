import { TPaymentMethod } from './transaction.interface';

export const PAYMENT_METHOD: TPaymentMethod[] = [
  'bank',
  'card',
  'cash',
  'mobile-banking',
] as const;
