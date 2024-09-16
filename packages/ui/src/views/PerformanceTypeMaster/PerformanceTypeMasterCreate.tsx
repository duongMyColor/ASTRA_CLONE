import { userRoles } from '@repo/consts/user';
import { TextInput, Create, useNotify } from 'react-admin';

import { validateUserCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS, REDIRECT_ROUTE } from '@repo/consts/general';
import { useNavigate } from 'react-router-dom';

const PerformanceTypeMasterCreate = ({
  actions,
  resource,
  dataProvider
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();

   const handleSave = async (values: RecordValue) => {
      try {
        await dataProvider.create(resource, {
          data: values,
        });

        notify(CREATED_SUCCESS, { type: 'success' });
        navigate(resourcePath);
      } catch (error) {
        notify('エラー: 利用規約の作成に失敗しました:' + error, {
          type: 'warning',
        });
      }
    };

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="演出種別マスタ　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextInput source="typeName" label="演出種別名" isRequired fullWidth />
      </CustomForm>
    </Create>
  );
};

export default PerformanceTypeMasterCreate;
