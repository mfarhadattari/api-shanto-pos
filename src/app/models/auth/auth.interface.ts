export interface IAuth {
  username: string;
  password: string;
  role: 'ADMIN' | 'SUPPER_ADMIN';
  needPasswordChange: boolean;
  passwordChangedAt: Date;
  isBlocked: boolean;
}
