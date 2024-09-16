import {
  TextInput,
  Create,
  SelectInput,
  FileInput,
  FileField,
  useDataProvider,
  useCreate,
  useNotify,
} from 'react-admin';

import { TextField } from '@mui/material';
import { validateCreation } from './formValidator';
import CryptoJS from 'crypto-js';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps, RAFile, RecordValue } from '@repo/types/general';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PerformanceTypeMasterResponseIF } from '@repo/types/performanceTypeMaster';
import { AcstaResponseIF } from '@repo/types/acsta';
import { convertToFormData } from '@repo/utils/formData';
import { uploadMuiltpart } from '@repo/utils/multipartUpload';
import { CREATED_SUCCESS } from '@repo/consts/general';

interface typeFormSelected {
  id: string;
  name: string;
}

const PerformanceManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const [create] = useCreate();
  const dataProvider = useDataProvider();
  const [idPerformance, setIdPerformance] = useState<string>('');
  const [acstaId, setAcstaId] = useState<Array<typeFormSelected>>([]);
  const [performanceTypeMasterId, setPerformanceTypeMasterId] = useState<
    Array<typeFormSelected>
  >([]);
  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };

  const handleSave = async (values: RecordValue) => {
    const encryptKey = CryptoJS.lib.WordArray.random(16).toString();

    const { assetBundleIOS, assetBundleAndroid, ...rest } = values;
    const assetBundleIOSFile = extractFile(assetBundleIOS);
    const assetBundleAndroidFile = extractFile(assetBundleAndroid);

    const keyIOS = await uploadMuiltpart(assetBundleIOSFile);
    console.log('encryptedIOS', keyIOS);
    const keyAndroid = await uploadMuiltpart(assetBundleAndroidFile);

    const req = {
      ...rest,
      encryptKey,
      assetBundleIOS: keyIOS,
      assetBundleAndroid: keyAndroid,
    };
    console.log({ req });

    try {
      const formData = convertToFormData(req);
      await dataProvider.create(resource, {
        data: formData,
      });

      await notify(CREATED_SUCCESS, {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 作成に失敗しました:' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const setIdPerformanceFunc = async () => {
      const response = await dataProvider.getIdLastestRecord(resource);
      const nextId = response.data.idLastest ? response.data.idLastest : 1;
      setIdPerformance(`${nextId}`);
    };

    const setIdAcstaFunc = async () => {
      const resAcstaId = await dataProvider.getAll('acstas');
      setAcstaId(
        resAcstaId.map(({ id, acstaName }: AcstaResponseIF) => {
          return { id, name: `${id} :${acstaName}` };
        })
      );
    };

    const setPerformanceTypeMasterIdFunc = async () => {
      const resPerformanceTypeMasterId = await dataProvider.getAll(
        'performance-type-masters'
      );

      setPerformanceTypeMasterId(
        resPerformanceTypeMasterId.map(
          ({ id, typeName }: PerformanceTypeMasterResponseIF) => {
            return { id, name: `${id} :${typeName}` };
          }
        )
      );
    };

    await Promise.all([
      setIdPerformanceFunc(),
      setIdAcstaFunc(),
      setPerformanceTypeMasterIdFunc(),
    ]);
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);

  return (
    <Create title="演出管理　新規作成">
      <CustomForm
        pathTo={resourcePath}
        validate={validateCreation}
        showSaveButton={true}
        showCancelButton={true}
        handleSave={handleSave}
      >
        {/* <TextInput source="id" label="演出ID" isRequired fullWidth /> */}

        <TextField
          id="filled-basic"
          label="演出ID"
          variant="filled"
          value={idPerformance}
          disabled
        />

        <TextInput
          source="name"
          label="演出名"
          fullWidth
          isRequired
          sx={{ marginTop: '30px' }}
        />
        <SelectInput
          source="performanceTypeMasterId"
          choices={performanceTypeMasterId}
          fullWidth
          isRequired
          label="演出種別ID"
        />

        <FileInput
          source="assetBundleIOS"
          label="アセットバンドルデータ (iOS)*"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetBundleAndroid"
          label="アセットバンドルデータ (Android)*"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>
        <SelectInput
          source="acstaId"
          choices={acstaId}
          fullWidth
          isRequired
          label="アクスタ ID"
        />
      </CustomForm>
    </Create>
  );
};

export default PerformanceManagementCreate;
