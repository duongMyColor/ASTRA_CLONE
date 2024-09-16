import { hashPassword } from '../utils/password';
import { Country, OptionRole, RoleSelectInput, UserIF } from '@repo/types/user';
import countries from '@repo/assets/json/countries.json';

const defaultUsers: UserIF[] = [
  {
    username: 'SuperAdmin',
    email: 'superadmin@mycolor.com',
    role: 'ADMIN',
    password: hashPassword('Superadmin@12345'),
    enabled: true,
  },
];

const defaultRoles = [
  {
    id: 'ADMIN',
  },
  {
    id: 'GENERAL',
  },
  {
    id: 'READ_ONLY',
  },
];

const countryList: Country[] = countries;

const userRoles: RoleSelectInput[] = [
  { id: 'ADMIN', name: '管理者' },
  { id: 'GENERAL', name: '一般' },
  { id: 'READ_ONLY', name: '参照のみ' },
];

const MAP_ROLE: OptionRole = {
  ADMIN: '管理者',
  GENERAL: '一般',
  READ_ONLY: '参照のみ',
};

const userContentLength = {
  username: {
    min: 3,
    max: 16,
  },
  name: {
    min: 2,
    max: 50,
  },
  email: {
    min: 10,
    max: 40,
  },
  password: {
    min: 8,
    max: 128,
  },
  newPassword: {
    min: 0,
    max: 0,
  },
};

export {
  defaultUsers,
  countryList,
  userRoles,
  userContentLength,
  defaultRoles,
  MAP_ROLE,
};
