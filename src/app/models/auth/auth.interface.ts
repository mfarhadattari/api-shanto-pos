import { TRole } from '../admin/admin.interface';

export interface IAuth {
  username: string;
  password: string;
  role: TRole;
  needPasswordChange: boolean;
  passwordChangedAt: Date;
  isBlocked: boolean;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
