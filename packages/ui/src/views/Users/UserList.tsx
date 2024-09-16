import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
  useNotify,
  useRefresh,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { CustomButtonByRole } from '@repo/ui/src/components/CustomButtonByRole';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { MAP_ROLE } from '@repo/consts/user';
import { Role } from '@repo/types/user';
import { BoxSortField } from '../../components/BoxSortField';

const UserList = ({ actions, resource }: BaseComponentProps) => {
  const refresh = useRefresh();
  const notify = useNotify();

  const onSuccess = () => {
    refresh();
    notify('削除しました', {
      type: 'success',
    });
  };
  return (
    <List
      title="管理ユーザー管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="username" label="CMS-ID" />
        <BoxSortField source="lastLogin" label="最終ログイン">
          <FunctionField
            label="最終ログイン"
            render={({ lastLogin }: { lastLogin: string }) => {
              return formatDateAcstar(lastLogin);
            }}
          />
        </BoxSortField>
        <BoxSortField source="role" label="権限">
          <FunctionField
            label="権限"
            sortable={true}
            render={({ role }: { role: Role }) => {
              return MAP_ROLE[role];
            }}
          />
        </BoxSortField>
        <TextField source="email" label="メールアドレス" />
        {validRole('delete', actions) && (
          <FunctionField
            label="削除"
            sortable={true}
            render={() => {
              return (
                <CustomButtonByRole source="role" label="削除">
                  <DeleteWithConfirmButton
                    confirmContent="よろしいですか?"
                    confirmTitle="削除"
                    label="削除"
                    confirmColor="warning"
                    mutationOptions={{ onSuccess }}
                  ></DeleteWithConfirmButton>
                </CustomButtonByRole>
              );
            }}
          />
        )}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default UserList;
