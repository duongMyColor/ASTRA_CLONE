import { List, Datagrid, TextField, FunctionField } from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { StatusChipField } from '@repo/ui/src/components/CustomField/StatusChipField';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { BoxSortField } from '../../components/BoxSortField';

const ForcedUpdateManagementList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="強制アップデート管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="managementName" label="管理タイトル" />
        <TextField source="id" label="強制アップデート ID" />

        <BoxSortField source="appMasterId" label="アプリケーションID">
          <FunctionField
            label="アプリケーションID"
            render={({
              aplicationMaster,
            }: {
              aplicationMaster: AplicationMasterResponseIF;
            }) => {
              return `${aplicationMaster.id} : ${aplicationMaster.appName}`;
            }}
          />
        </BoxSortField>

        <BoxSortField source="operateSystem" label="OS">
          <FunctionField
            label="OS"
            render={({ operateSystem }: { operateSystem: string }) => {
              return operateSystem === '0' ? 'iOS' : 'Android';
            }}
          />
        </BoxSortField>
        <TextField source="version" label="バージョン" />

        <StatusChipField source="status" label="ステータス"></StatusChipField>
        <BoxSortField source="publishedDate" label="公開開始日">
          <FunctionField
            label="公開開始日"
            render={({ publishedDate }: { publishedDate: string }) => {
              return formatDateAcstar(publishedDate);
            }}
          />
        </BoxSortField>
        <BoxSortField source="createdAt" label="登録日">
          <FunctionField
            label="登録日"
            render={({ createdAt }: { createdAt: string }) => {
              return formatDateAcstar(createdAt);
            }}
          />
        </BoxSortField>
      </Datagrid>
    </List>
  );
};

export default ForcedUpdateManagementList;
