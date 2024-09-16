import { ReactComponent } from '@repo/types/general';
import { Actions, Permission, RoleCheckingProps } from '@repo/types/roles';
import { createElement, FunctionComponent } from 'react';

const ADMIN: Permission[] = [
  { actions: '*', resource: 'users' },
  { actions: '*', resource: 'products' },
  { actions: '*', resource: 'product_charts' },
  {
    actions: '*',
    resource: 'animal_classifications',
  },
  { actions: '*', resource: 'animals' },
  { actions: '*', resource: 'memos' },
  { actions: '*', resource: 'realtime_chart' },
  { actions: '*', resource: 'img_rec_selections' },
];

const GENERAL: Permission[] = [
  { actions: [], resource: 'users' },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'products',
  },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'product_charts',
  },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'animal_classifications',
  },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'animals',
  },
  { actions: ['list', 'create', 'edit', 'delete', 'show'], resource: 'memos' },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'realtime_chart',
  },
  {
    actions: ['list', 'create', 'edit', 'delete', 'show'],
    resource: 'img_rec_selections',
  },
];

const READ_ONLY: Permission[] = [
  { actions: [], resource: 'users' },
  {
    actions: ['show', 'list'],
    resource: 'products',
  },
  {
    actions: ['show', 'list'],
    resource: 'product_charts',
  },
  {
    actions: ['show', 'list'],
    resource: 'animal_classifications',
  },
  {
    actions: ['show', 'list'],
    resource: 'animals',
  },
  { actions: ['show', 'list'], resource: 'memos' },
  { actions: ['show', 'list'], resource: 'realtime_chart' },
  { actions: ['show', 'list'], resource: 'img_rec_selections' },
];

const ROLES_MAP: {
  [key: string]: Permission[];
} = {
  ADMIN,
  GENERAL,
  READ_ONLY,
};

/**
 *
 * @param role role to check
 * @returns actions of pemission
 */
const generateRole = (role: string) => {
  return ROLES_MAP[role];
};

/**
 *
 * @param role role to check
 * @param actions actions of pemission to check
 * @returns boolean role is valid or not
 */
const validRole = (role: string, actions: Actions): boolean => {
  return actions === '*' || actions.includes(role);
};

/**
 *
 * @param actions actions of pemission to check
 * @param action action of screen to check
 * @param component component to render
 * @param props props to pass to component
 * @returns
 */
const checkRole = ({
  actions,
  action,
  component,
  props,
}: RoleCheckingProps): ReactComponent => {
  if (!component) return undefined;

  const resComponent = props
    ? createElement(component as FunctionComponent, props)
    : component;

  const isRender = validRole(action, actions);

  return isRender ? resComponent : undefined;
};

export { generateRole, checkRole, validRole };
