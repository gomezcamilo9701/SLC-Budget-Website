//Type for Login form
export type LoginUser = {
  email: string;
  password: string;
}

//USER
export type User = {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
  //phone_number: string;
  //photo: string;
}

export type ProfileForEdit = {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
