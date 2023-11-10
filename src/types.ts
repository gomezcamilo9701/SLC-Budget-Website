//Type for Login form
export type TLoginUser = {
  email: string;
  password: string;
};

//USER

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  lastName: string;
  username: string;
  profileImage: string;
}
export interface IUser {
  email: string;
  name: string;
  lastName: string;
  username: string;
  password: string;
  roles: string[];
}

export interface IUserWithId extends IUser {
  id: number;
  profileImage: string;
}

export type TProfileForEdit = {
  name: string;
  lastName: string;
  username: string;
  password: string;
};

export type TEditUser = {
  editForm: TProfileForEdit;
  id: string;
  profileImage: File | null;
};

//Componente Contacts
export type TContactState = {
  email: string;
  contactInfo: IUserWithId | null;
  modalOpen: boolean;
};

// Event
export enum ETypeEvent {
  VIAJE,
  HOGAR,
  PAREJA,
  COMIDA,
  OTRO,
}

export interface IEvent {
  name: string;
  description: string;
  type: string;
  owner_id: string;
};

export interface IEventWithId extends IEvent {
  event_id: string;
  picture: string;
}

export type TEventForEdit = {
  name: string;
  description: string;
  type: string;
};

export type TEventDataEdit = {
  editForm: TEventForEdit;
  eventId: string;
  picture: File | null;
};

// Invitation

export type TInvitationCreate = {
  eventId: string,
  contactId: string,
}

export type TInvitationResponse = {
  contactName:         string;
  contactLastName:     string;
  contactUsername:     string;
  contactId:           number;
  contactEmail:        string;
  contactProfileImage: string | null;
  invitation_id:       number;
  invitation_state:    string;
}

// Pagination
export type EventPaginationResponse = {
  content: {
    event_id: number;
    name: string;
    description: string;
    type: string;
    picture: string;
    owner: IUserWithId;
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
export interface PaginationResponse<T> {
  content: T[] | null;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type ContactPaginationResponse = PaginationResponse<IUserWithId>;

export type EventsPaginationResponse = PaginationResponse<IEventWithId>;
export type InvitationsPaginationResponse = PaginationResponse<TInvitationResponse>;



// //Edit Event
// export type TEventForEdit = {
//   name: string;
//   description: string;
//   type: string;
//   owner_id: number;
//   imagen_url: File | null;
// }