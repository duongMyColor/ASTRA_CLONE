import {
  List,
  Datagrid,
  TextField,
  EditButton,
  FunctionField,
  TopToolbar,
  CreateButton,
} from 'react-admin';
import { BaseComponentProps } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { ListToolBar } from '@repo/ui/src/components/ListToolBar';
import { formatDateAcstar } from '@repo/utils/dateFormat';
import { BoxSortField } from '../../components/BoxSortField';
import { Box, Button } from '@mui/material';
import { ProductFilterForm } from './CustomFilter';
import EditButtonAppMaster from '../../components/EditButtonAppMaster';

const ListActions = ({
  isShowCreate,
  isShowFilter = false,
}: {
  isShowCreate: boolean;
  isShowFilter?: boolean;
}) => {
  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'end',
      }}
    >
      {/* <ProductFilterForm /> */}
      <TopToolbar>
        {isShowCreate && (
          <>
            <CreateButton label="新規登録" />
          </>
        )}
      </TopToolbar>
    </Box>
  );
};

const MasterList = ({ actions, resource }: BaseComponentProps) => {
  return (
    <List
      title="アプリケーションマスタ　一覧"
      actions={
        <ListActions
          isShowFilter={true}
          isShowCreate={validRole('create', actions)}
        />
      }
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="no" label="No" />
        <TextField source="appName" label="アプリケーション名" />
        <TextField source="id" label="アプリケーションID" />
        <TextField source="packageName" label="バンドルID/パッケージ名" />
        <BoxSortField source="createdAt" label="登録日">
          <FunctionField
            label="登録日"
            render={({ createdAt }: { createdAt: string }) => {
              return formatDateAcstar(createdAt);
            }}
          />
        </BoxSortField>

        {validRole('edit', actions) && <EditButtonAppMaster label="編集" />}
      </Datagrid>
    </List>
  );
};

export default MasterList;
