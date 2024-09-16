import {
  TextInput,
  Create,
  SelectInput,
  FileField,
  useNotify,
  ImageInput,
  ImageField,
  DateTimeInput,
  FileInput,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TextField, Box, Tooltip } from '@mui/material';

import { validateAcstaCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS, REDIRECT_ROUTE } from '@repo/consts/general';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { convertToFormData } from '@repo/utils/formData';
import TooltipCustom from '../../components/TooltipCustom';

const AcstaManagementCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const navigate = useNavigate();
  const notify = useNotify();

  const [idAcsta, setIdAcsta] = useState<string>('');
  const [appIdIDs, setAppIdIDs] = useState([]);

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, [
        'thumbnailUrl',
        'scanImageUrl',
      ]);

      await dataProvider.create(resource, {
        data: formData,
      });

      notify(CREATED_SUCCESS, {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: アクスタ管理の作成に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    const fetchIdLastest = async () => {
      const response = await dataProvider.getIdLastestRecord(resource);

      console.log({ response });
      const nextId = response.data?.idLastest ? response.data.idLastest : 1;
      setIdAcsta(`${nextId}`);
    };

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

    Promise.allSettled([fetchIdLastest(), fetchApplicationMaster()]);
  }, []);

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="アクスタ管理　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateAcstaCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextField
          id="filled-basic"
          label="アクスタID"
          variant="filled"
          value={idAcsta}
          disabled
          sx={{
            marginBottom: '20px',
          }}
        />
        <TooltipCustom>
          <TextInput
            source="managementName"
            label="管理名"
            fullWidth
            isRequired
          />
        </TooltipCustom>
        <TooltipCustom>
          <TextInput
            source="acstaName"
            label="アクスタ名"
            fullWidth
            isRequired
          />
        </TooltipCustom>
        <TooltipCustom>
          <SelectInput
            source="applicationId"
            choices={appIdIDs}
            fullWidth
            isRequired
            label="アプリケーション ID"
          />
        </TooltipCustom>
        <TooltipCustom>
          <FileInput
            source="thumbnailUrl"
            label="アクスタサムネイル*"
            placeholder="アップロード"
            accept="image/png, image/jpeg, image/jpg"
          >
            <FileField source="src" title="title" />
          </FileInput>
        </TooltipCustom>

        <TooltipCustom>
          <FileInput
            source="scanImageUrl"
            label="スキャン用データ*"
            placeholder="アップロード"
            accept="image/png, image/jpeg, image/jpg"
          >
            <FileField source="src" title="title" />
          </FileInput>
        </TooltipCustom>

        <TooltipCustom width="fix-content">
          <DateTimeInput source="dateStart" label="公開開始日*" />
        </TooltipCustom>
        <DateTimeInput source="dateEnd" label="公開終了日" />
        {/* <TextInput
          source="acstaBasicInfoId"
          label="力士基本情報ID"
          fullWidth
          disabled
        /> */}
      </CustomForm>
    </Create>
  );
};

export default AcstaManagementCreate;
