//Type for Login form
export type TLoginUser = {
  email: string;
  password: string;
}

//USER
export interface IUser {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
}

export interface IUserWithId extends IUser {
  id: string;
  profileImage: string;
}

export type TProfileForEdit = {
  name: string;
  lastName: string;
  username: string;
  password: string;
}

//Componente Contacts
export type TContactState = {
  loading: boolean;
  email: string;
  contactInfo: IUserWithId | null;
  modalOpen: boolean;
}