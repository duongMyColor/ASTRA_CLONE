import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  FileInput,
  FileField,
  useNotify,
  DateTimeInput,
  useEditContext,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { validateAcstaEdition } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { convertToFormData } from '@repo/utils/formData';
import { UPDATED_SUCCESS } from '@repo/consts/general';

const EditForm = ({ actions, resource, dataProvider }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const navigate = useNavigate();
  const notify = useNotify();
  const { record } = useEditContext();

  const handleSave = async (values: RecordValue) => {
    console.log('values', values);

    const { thumbnailUrl, scanImageUrl } = values;

    if (
      scanImageUrl?.rawFile &&
      record?.scanImageUrl?.title !== scanImageUrl?.title
    ) {
      values.scanColors = null;
    }

    if (!thumbnailUrl?.rawFile) {
      delete values.thumbnailUrl;
    }
    if (!scanImageUrl.rawFile) {
      delete values.scanImageUrl;
    }

    const formData = convertToFormData(values, [
      'thumbnailUrl',
      'scanImageUrl',
    ]);

    try {
      await dataProvider.update(resource, {
        id: record.id,
        data: formData,
        previousData: record,
      });

      navigate(resourcePath);
      notify(UPDATED_SUCCESS, {
        type: 'success',
      });
    } catch (error) {
      notify('エラー: アクスタ管理の更新中に問題が発生しました。', {
        type: 'error',
      });
    }
  };

  const [appIdIDs, setAppIdIDs] = useState([]);
  useEffect(() => {
    const fetchApplicationMaster = async () => {
      const appLicationMasters = await dataProvider.getAll(
        'application-masters'
      );
      setAppIdIDs(
        appLicationMasters.map(
          ({ id, appName }: AplicationMasterResponseIF) => {
            return { id, name: `${id} : ${appName}` };
          }
        )
      );
    };

    Promise.allSettled([fetchApplicationMaster()]);
  }, []);
  return (
    <>
      <Title title="アクスタ管理　編集" />
      <CustomForm
        pathTo={resourcePath}
        validate={validateAcstaEdition}
        showSaveButton={true}
        showReferenceButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextInput
          source="id"
          label="アクスタ ID"
          isRequired
          fullWidth
          disabled
        />
        <TextInput
          source="managementName"
          label="管理名"
          fullWidth
          isRequired
        />

        <TextInput source="acstaName" label="アクスタ名" fullWidth isRequired />
        <SelectInput
          source="applicationId"
          choices={appIdIDs}
          fullWidth
          isRequired
          label="アプリケーション ID"
        />

        <FileInput
          source="thumbnailUrl"
          label="アクスタサムネイル*"
          placeholder="アップロード"
          accept="image/png, image/jpeg, image/jpg"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="scanImageUrl"
          label="スキャン用データ*"
          placeholder="アップロード"
          accept="image/png, image/jpeg, image/jpg"
        >
          <FileField source="src" title="title" />
        </FileInput>
        <DateTimeInput
          source="dateStart"
          fullWidth
          label="公開開始日"
          required
        />
        <DateTimeInput source="dateEnd" fullWidth label="公開終了日" />

        {/* <TextInput
          source="acstaBasicInfoId"
          label="力士基本情報ID"
          fullWidth
          isRequired
          disabled
        /> */}
      </CustomForm>
    </>
  );
};

const AcstaManagementEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <EditForm {...props} />
      </EditBase>
    </Box>
  );
};
export default AcstaManagementEdit;
