import { userRoles } from '@repo/consts/user';
import { TextInput, EditBase, Title, usePermissions, useNotify, useRecordContext } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateUserCreation } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';
import { useNavigate } from 'react-router-dom';
import { UPDATED_SUCCESS } from '@repo/consts/general';

const PerformanceTypeMasterEditForm = ({
  actions,
  resource,
  dataProvider
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const notify = useNotify();
  const navigate = useNavigate();
  const record = useRecordContext();

    const handleUpdate = async (values: RecordValue) => {
    try{
 
      await dataProvider.update(resource, {
        id: record.id,
        data: values,
        previousData: record,
      });

      notify(UPDATED_SUCCESS, {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 更新に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  return (
    <Box sx={boxStyles}>
      <EditBase>
        <Title title="演出種別マスタ　編集" />
        <CustomForm
          pathTo={resourcePath}
          validate={validateUserCreation}
          showSaveButton={true}
          showReferenceButton={true}
          showCancelButton={true}
          handleSave={handleUpdate}
        >
          <TextInput
            source="id"
            label="演出種別ID"
            isRequired
            fullWidth
            disabled
          />
          <TextInput
            source="typeName"
            label="演出種別名"
            isRequired
            fullWidth
          />
        </CustomForm>
      </EditBase>
    </Box>
  );
};

const PerformanceTypeMasterEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <PerformanceTypeMasterEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default PerformanceTypeMasterEdit;
