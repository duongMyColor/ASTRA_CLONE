'use client';

import { Admin, Resource } from 'react-admin';

import dataProvider from '../providers/dataProviders/dataProvider';
import authProvider from '../providers/authProvider';
import { Actions, Permission } from '@repo/types/roles';
import React from 'react';
import { checkRole } from '@repo/ui/src/views/_core/permissions';
import { i18nProvider } from '@/providers/i18nProvider';
import Login from '@repo/ui/src/views/Login/Login'

// Define resources
import Resources from './_core/resources';
import { ResourceIF } from '@repo/types/general';

const AdminApp = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      requireAuth
    >
      {(permission: Permission) => {
        return Resources.map((resource: ResourceIF) => {
          const actions: Actions = permission[resource.resource] as Actions;

          if (!actions) {
            throw new Error(
              `Resource configuration not found for ${resource.resource}`
            );
          }

          const { list, edit, create, show, icon, defaultProp } = resource;

          const props = defaultProp
            ? {}
            : {
                resource: resource.resource,
                dataProvider,
                actions,
                authProvider,
              };
          return (
            <Resource
              key={resource.resource}
              name={resource.resource}
              list={checkRole({
                actions,
                action: 'list',
                component: list,
                props,
              })}
              show={checkRole({
                actions,
                action: 'show',
                component: show,
                props,
              })}
              edit={checkRole({
                actions,
                action: 'edit',
                component: edit,
                props,
              })}
              create={checkRole({
                actions,
                action: 'create',
                component: create,
                props,
              })}
              icon={icon}
              options={{ label: resource.label }}
            />
          );
        });
      }}
    </Admin>
  );
};

export default AdminApp;
