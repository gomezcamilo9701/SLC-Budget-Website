const CONSTANTS = {
  BASE_URL: 'http://localhost:8090',
  USER_REGISTER: '/user/signup',
  USER_LOGIN: '/login',
  PROFILE_PICTURE: '/media',
  USER_EDIT: '/user/update',
  USER_INFO: '/user/email',
  ADD_CONTACT: '/user/add-contact',
  GET_CONTACTS: '/user/contacts',
  VALIDATE_TOKEN: '/auth/validateToken?token=',
  CREATE_EVENT: '/event/create',
  UPDATE_EVENT: '/event/update',
  GET_EVENT_BY_ID: '/event',
  GET_EVENTS_BY_OWNER: '/user/events',
  GET_EVENT_BY_USER_ID: '/event-contacts/by-contact',
  CREATE_INVITATION: '/invitation/create',
  GET_INVITATIONS_BY_EVENT: '/invitation/by-event',
  GET_INVITATIONS_BY_USER: '/invitation/user',
  UPDATE_INVITATION: '/invitation/update',
  GET_EVENT_CONTACTS_BY_EVENT: '/event-contacts/by-event'
};
//http://ec2-54-221-52-14.compute-1.amazonaws.com
export default CONSTANTS;