export const CLIENTS = {
  USERS: 'USERS_CLIENT',
  CONDOMINIUMS: 'CONDOMINIUMS_CLIENT',
};

export const EVENTS = {
  //User events
  USER_CREATED_CLERK: 'webhooks.clerk.users.created',
  USER_INVITE_CLERK: 'clerk.users.invite.create',
  USER_CREATE_BULK: 'users.create.bulk',

  USER_ASSIGN_CONDOMINIUM: 'users.assign.condominium',
  USER_REMOVE_CONDOMINIUM: 'users.remove.condominium',
  USER_UPDATE_CONDOMINIUM_RELATION: 'users.update.condominium.relation',

  //Condominium events
  CONDOMINIUM_CREATE: 'condominiums.create',
  CONDOMINIUM_GET_ALL: 'condominiums.get.all',
};
