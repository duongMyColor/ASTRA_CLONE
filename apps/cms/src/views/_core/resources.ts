import {
  SportsKabaddiOutlined,
  Apps,
  Group,
  TaskOutlined,
  DescriptionOutlined,
  Boy,
} from '@mui/icons-material/';

import type { ResourceIF } from '@repo/types/general';
import {
  UserList,
  UserEdit,
  UserCreate,
  UserShow,
} from '@repo/ui/src/views/Users';

import {
  ApplicationMasterList,
  ApplicationMasterEdit,
  ApplicationMasterCreate,
  ApplicationMasterShow,
} from '@repo/ui/src/views/ApplicationMasters';
import {
  AcstaManagementShowList,
  AcstaManagementCreate,
  AcstaManagementEdit,
  AcstaManagementShow,
} from '@repo/ui/src/views/AcstaManagement';

import {
  PerformanceTypeMasterList,
  PerformanceTypeMasterCreate,
  PerformanceTypeMasterEdit,
  PerformanceTypeMasterShow,
} from '@repo/ui/src/views/PerformanceTypeMaster';

import {
  PerformanceManagementList,
  PerformanceManagementCreate,
  PerformanceManagementEdit,
  PerformanceManagementShow,
} from '@repo/ui/src/views/PerformanceManagement';

import {
  TermsOfUseManagementList,
  TermsOfUseManagementCreate,
  TermsOfUseManagementShow,
} from '@repo/ui/src/views/TermsOfUseManagement';
import {
  LicenseManagementList,
  LicenseManagementCreate,
  LicenseManagementShow,
} from '@repo/ui/src/views/LicenseManagement';
import {
  ForcedUpdateManagementList,
  ForcedUpdateManagementCreate,
  ForcedUpdateManagementShow,
} from '@repo/ui/src/views/ForcedUpdateManagement';

const Resources: ResourceIF[] = [
  {
    list: UserList,
    edit: UserEdit,
    create: UserCreate,
    show: UserShow,
    icon: Group,
    resource: 'users',
    label: '管理ユーザー管理 ',
  },
  {
    list: ApplicationMasterList,
    edit: ApplicationMasterEdit,
    create: ApplicationMasterCreate,
    show: ApplicationMasterShow,
    resource: 'application-masters',
    label: 'アプリケーションマスタ',
    icon: Apps,
  },
  {
    list: AcstaManagementShowList,
    edit: AcstaManagementEdit,
    create: AcstaManagementCreate,
    show: AcstaManagementShow,
    resource: 'acstas',
    label: 'アクスタ管理',
    icon: Boy,
  },
  {
    list: PerformanceTypeMasterList,
    edit: PerformanceTypeMasterEdit,
    create: PerformanceTypeMasterCreate,
    show: PerformanceTypeMasterShow,
    resource: 'performance-type-masters',
    label: '演出種別マスタ',
  },
  {
    list: PerformanceManagementList,
    edit: PerformanceManagementEdit,
    create: PerformanceManagementCreate,
    show: PerformanceManagementShow,
    resource: 'performances',
    label: '演出管理',
    icon: SportsKabaddiOutlined,
  },
  {
    list: TermsOfUseManagementList,
    create: TermsOfUseManagementCreate,
    show: TermsOfUseManagementShow,
    resource: 'term-of-uses',
    label: '利用規約管理',
    icon: TaskOutlined,
  },
  {
    list: LicenseManagementList,
    create: LicenseManagementCreate,
    show: LicenseManagementShow,
    resource: 'licenses',
    label: 'ライセンス管理',
    icon: DescriptionOutlined,
  },
  {
    list: ForcedUpdateManagementList,
    create: ForcedUpdateManagementCreate,
    show: ForcedUpdateManagementShow,
    resource: 'forced-update-managements',
    label: '強制アップデート管理',
    // icon: DescriptionOutlined,
  },
];

export default Resources;
