export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export enum ModelName {
  TICKET = 'TICKET',
  COMPANY = 'COMPANY',
  CUSTOMER = 'CUSTOMER',
  PROJECT = 'PROJECT',
  USER = 'USER',
}

export enum CollectionName {
  TICKET = 'tickets',
  COMPANY = 'companies',
  CUSTOMER = 'customers',
  PROJECT = 'projects',
  USER = 'users',
}
