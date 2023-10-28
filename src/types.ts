//Type for Login form
export type LoginUser = {
  email: string;
  password: string;
}

//USER
export interface User {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
  //phone_number: string;
}

export interface UserToRegister {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
}

export interface UserWithId extends User {
  id: string;
  profileImage: string;
}

export type ProfileForEdit = {
  name: string;
  lastName: string;
  username: string;
  password: string;
}
