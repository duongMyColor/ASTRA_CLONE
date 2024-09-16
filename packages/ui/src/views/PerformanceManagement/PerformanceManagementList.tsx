import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  FunctionField,
  useNotify,
  useRefresh,
  useRecordContext,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { PerformanceTypeMasterResponseIF } from '@repo/types/performanceTypeMaster';
import { AcstaResponseIF } from '@repo/types/acsta';
import { BoxSortField } from '../../components/BoxSortField';
import { formatDateAcstar } from '@repo/utils/dateFormat';

const ButtonDeleteCustom = () => {
  const refresh = useRefresh();
  const notify = useNotify();
  const record = useRecordContext();

  const onSuccess = () => {
    refresh();
    notify('削除しました', {
      type: 'success',
    });
  };
  return (
    <>
      {record && record.acstaId === null && (
        <DeleteWithConfirmButton
          confirmContent="よろしいですか?"
          confirmTitle="削除"
          label="削除"
          confirmColor="warning"
          mutationOptions={{ onSuccess }}
        ></DeleteWithConfirmButton>
      )}
    </>
  );
};

const PerformanceManagementList = ({
  actions,
  resource,
}: BaseComponentProps) => {
  return (
    <List
      title="演出管理　一覧"
      actions={<ListToolBar isShowCreate={validRole('create', actions)} />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="name" label="演出名" />
        <TextField source="id" label="演出ID" />
        <BoxSortField source="acstaId" label="アクスタ ID">
          <FunctionField
            label="アクスタID"
            render={({ acsta }: { acsta: AcstaResponseIF }) => {
              return `${acsta.id} : ${acsta.acstaName}`;
            }}
          />
        </BoxSortField>

        <BoxSortField source="performanceTypeMasterId" label="演出種別ID">
          <FunctionField
            label="演出種別ID"
            render={({
              performanceTypeMaster,
            }: {
              performanceTypeMaster: PerformanceTypeMasterResponseIF;
            }) => {
              return `${performanceTypeMaster.id} : ${performanceTypeMaster.typeName}`;
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
        {validRole('delete', actions) && <ButtonDeleteCustom />}
        {validRole('edit', actions) && <EditButton label="編集"></EditButton>}
      </Datagrid>
    </List>
  );
};

export default PerformanceManagementList;
