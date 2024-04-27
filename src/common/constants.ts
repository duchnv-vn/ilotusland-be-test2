export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export enum ModelName {
  TICKET = 'TICKET',
  COMPANY = 'COMPANY',
  CUSTOMER = 'CUSTOMER',
  PROJECT = 'PROJECT',
  USER = 'USER',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
}

export enum CollectionName {
  TICKET = 'tickets',
  COMPANY = 'companies',
  CUSTOMER = 'customers',
  PROJECT = 'projects',
  USER = 'users',
  PROJECT_MEMBER = 'projectMembers',
}

export const IS_PUBLIC_KEY = 'isPublic';
