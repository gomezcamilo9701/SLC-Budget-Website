//Type for Login form
export type TLoginUser = {
  email: string;
  password: string;
};

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
};

export type TEditUser = {
  editForm: TProfileForEdit;
  id: string;
  profileImage: File | null;
};

//Componente Contacts
export type TContactState = {
  loading: boolean;
  email: string;
  contactInfo: IUserWithId | null;
  modalOpen: boolean;
};

// Event
enum ETypeEvent {
  VIAJE,
  HOGAR,
  PAREJA,
  COMIDA,
  OTRO,
}

export type TEvent = {
  event_id: string;
  name: string;
  description: string;
  type: ETypeEvent | null;
  owner_id: string;
  imageUrl: string;
};

export type TEventForEdit = {
  name: string;
  description: string;
  type: ETypeEvent | null;
};

export type TEventDataEdit = {
  editForm: TEventForEdit;
  eventId: string;
  picture: File | null;
};

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
