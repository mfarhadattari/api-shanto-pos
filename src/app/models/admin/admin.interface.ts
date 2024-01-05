export interface IAddress {
  location: string;
  townOrVillage: string;
  city: string;
}

export interface IAdmin {
  username: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  nid: string;
  address: IAddress;
  isBlocked: boolean;
}
