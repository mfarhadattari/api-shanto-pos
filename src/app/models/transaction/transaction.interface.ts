export type TPaymentMethod = 'bank' | 'cash' | 'card' | 'mobile-banking';

export interface ITransaction {
  paymentBy: TPaymentMethod;
  paymentId: string;
  paymentAt: Date;
  amount: number;
  createdBy: string;
}
