type Role = 'ADMIN' | 'GENERAL' | 'READ_ONLY';

export interface UserIF {
  id?: number;
  username: string;
  role: Role;
  enabled: boolean;
  email: string;
  password: string;
  newPassword?: string;
  isDeleted?: boolean;
  lastLogin?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Country {
  name: string;
  code: string;
}

export interface RoleSelectInput {
  id: string | number;
  name: string;
}
export interface OptionRole {
  ADMIN: string;
  GENERAL: string;
  READ_ONLY: string;
}

export type Role = 'ADMIN' | 'GENERAL' | 'READ_ONLY';
