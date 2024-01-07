export interface IAddress {
  location: string;
  townOrVillage: string;
  city: string;
}

export type TRole = 'ADMIN' | 'SUPER_ADMIN';

export interface IAdmin {
  username: string;
  role: TRole;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  nid: string;
  address: IAddress;
  isBlocked: boolean;
}
export interface IUpdateAdmin {
  avatar: string;
  email: string;
  phone: string;
  address: IAddress;
}
