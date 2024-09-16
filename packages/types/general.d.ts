import { Permission, RolesIF } from '@repo/types/roles';
import { AuthProvider, DataProvider } from 'react-admin';

export type ReactComponent = ComponentType<any> | ReactElement | undefined;

export type ModelDeligate =
  | UserDeligate
  | MemoDeligate
  | ProductDeligate
  | PerformanceDeligate;

export interface ResourceIF {
  list?: ReactComponent;
  show?: ReactComponent;
  edit?: ReactComponent;
  create?: ReactComponent;
  icon?: ReactComponent;
  resource: string;
  defaultProp?: boolean;
  name?: string;
  label?: string;
}

export interface ResourceMapIF {
  [key: string]: ResourceIF;
}

type RecordValue = Record<string, any>;

export interface BaseComponentProps extends RolesIF {
  dataProvider: DataProvider;
  authProvider: AuthProvider;
}

export interface RAFile {
  rawFile: File;
  src: string;
  title: string;
}
