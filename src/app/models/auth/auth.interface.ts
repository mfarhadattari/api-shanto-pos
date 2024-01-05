export interface IAuth {
  username: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt: Date;
  isBlocked: boolean;
}
