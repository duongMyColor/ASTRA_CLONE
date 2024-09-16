import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
  useRecordContext,
  useNotify,
  useRefresh,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { BoxSortField } from '../../components/BoxSortField';

const CustomDeleteButton = ({ label }: { label: string }) => {
  const record = useRecordContext();
  const refresh = useRefresh();
  const notify = useNotify();

  const onSuccess = () => {
    refresh();
    notify('削除しました', {
      type: 'success',
    });
  };
  return (
    <>
      {!record.isExist ? (
        <DeleteWithConfirmButton
          confirmContent="よろしいですか?"
          confirmTitle="削除"
          label={label}
          confirmColor="warning"
          mutationOptions={{ onSuccess }}
        ></DeleteWithConfirmButton>
      ) : (
        <></>
      )}
    </>
  );
};

const PerformanceTypeMasterList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出種別マスタ　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="typeName" label="演出種別名" />
        <TextField source="id" label="演出種別ID" />
        <BoxSortField source="createdAt" label="登録日">
          <FunctionField
            label="登録日"
            render={({ createdAt }: { createdAt: string }) => {
              return formatDateAcstar(createdAt);
            }}
          />
        </BoxSortField>

        {validRole('delete', actions) && <CustomDeleteButton label="削除" />}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceTypeMasterList;
