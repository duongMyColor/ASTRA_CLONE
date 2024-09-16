import { userRoles } from '@repo/consts/user';
import {
  TextInput,
  Create,
  FileInput,
  FileField,
  useDataProvider,
  useCreate,
  useNotify,
  DateTimeInput,
} from 'react-admin';
import { TextField, Box } from '@mui/material';

import { validateCreation } from './formValidator';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS, REDIRECT_ROUTE } from '@repo/consts/general';
import { useEffect, useState } from 'react';
import { convertToFormData } from '@repo/utils/formData';
import { useNavigate } from 'react-router-dom';

const LicenseManagementCreate = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const [create] = useCreate();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const [idLicense, setIdLicense] = useState<string>('');
  const [oldDate, setOldDate] = useState<Date>();
  const [fileContent, setFileContent] = useState('');

  const handleSave = async (values: RecordValue) => {
    try {
      const formData = convertToFormData(values, ['content']);

      await dataProvider.create('licenses', {
        data: formData,
      });

      navigate(resourcePath);
      notify(CREATED_SUCCESS, {
        type: 'success',
      });
    } catch (error) {
      notify('エラー: ライセンスの作成に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const response = await dataProvider.getIdLastestRecord(resource);
    const responseIdLastest = await dataProvider.getIdLastest(resource);
    const nextId = response.data.idLastest ? response.data.idLastest : 1;
    setIdLicense(`${nextId}`);

    if (responseIdLastest.data[0]) {
      const formatDate = new Date(responseIdLastest.data[0]?.publishedDate);
      setOldDate(formatDate);
    }
  };

  const handleChangeFile = (event: any) => {
    const file = event;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const BlankFile = (event: any) => {
    event.preventDefault();
    const newTab = window.open('', '_blank') as Window;
    newTab.document.write(fileContent);
    newTab.document.close();
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);

  return (
    <Create redirect={REDIRECT_ROUTE.list} title="ライセンス管理　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        <TextField
          id="filled-basic"
          label="ライセンスID"
          variant="filled"
          value={idLicense}
          disabled
        />
        <TextInput source="version" label="バージョン" isRequired fullWidth />
        <TextInput source="memo" label="メモ" fullWidth />
        <DateTimeInput
          source="publishedDate"
          fullWidth
          label="公開開始日"
          defaultValue={oldDate}
          isRequired
        />

        <FileInput
          source="content"
          label="規約本文"
          placeholder="アップロード"
          isRequired
          accept=".html, .htm, text/html"
          onChange={handleChangeFile}
        >
          <Box
            onClick={BlankFile}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <FileField source="src" title="title" />
          </Box>
        </FileInput>
      </CustomForm>
    </Create>
  );
};

export default LicenseManagementCreate;
