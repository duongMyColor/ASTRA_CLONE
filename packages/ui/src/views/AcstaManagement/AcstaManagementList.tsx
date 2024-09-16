import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
  useRecordContext,
  useRefresh,
  useNotify,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { StatusChipField } from '@repo/ui/src/components/CustomField/StatusChipField';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { CustomButtonByRole } from '../../components/CustomButtonByRole';
import { BoxSortField } from '../../components/BoxSortField';
import { Chip } from '@mui/material';
import { chipStyles } from '@repo/consts/general';

const AcstaManagementList = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const record = useRecordContext();
  const refresh = useRefresh();
  const notify = useNotify();

  console.log({ record });
  const onSuccess = () => {
    refresh();
    notify('削除しました', {
      type: 'success',
    });
  };
  return (
    <List
      title="アクスタ管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="managementName" label="管理名" />
        <TextField source="acstaName" label="アクスタ名" />
        <TextField source="id" label="アクスタID" />
        <BoxSortField source="scanColors" label="色範囲指定">
          <FunctionField
            label="公開開始日"
            render={({ scanColors }: { scanColors: string }) => {
              if (scanColors)
                return <Chip label="設定済み" sx={chipStyles.configured} />;
              return <Chip label="設定なし" sx={chipStyles.notConfigured} />;
            }}
          />
        </BoxSortField>

        <StatusChipField source="status" label="ステータス"></StatusChipField>
        <BoxSortField source="dateStart" label="公開開始日">
          <FunctionField
            label="公開開始日"
            render={({ dateStart }: { dateStart: string }) => {
              return formatDateAcstar(dateStart);
            }}
          />
        </BoxSortField>
        <BoxSortField source="dateEnd" label="公開終了日">
          <FunctionField
            label="公開終了日"
            render={({ dateEnd }: { dateEnd: string }) => {
              return formatDateAcstar(dateEnd);
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
        {validRole('delete', actions) && (
          <FunctionField
            label="削除"
            sortable={true}
            render={() => {
              return (
                <CustomButtonByRole
                  source="role"
                  label="削除"
                  condition="status"
                >
                  <DeleteWithConfirmButton
                    redirect="list"
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

export default AcstaManagementList;
