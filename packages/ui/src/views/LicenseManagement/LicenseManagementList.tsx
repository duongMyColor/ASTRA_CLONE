import { List, Datagrid, TextField, FunctionField } from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { BoxSortField } from '../../components/BoxSortField';

const LicenseManagementList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="ライセンス管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="id" label="ライセンスID" />
        <TextField source="memo" label="メモ" />
        <TextField source="version" label="バージョン" />
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

export default LicenseManagementList;
