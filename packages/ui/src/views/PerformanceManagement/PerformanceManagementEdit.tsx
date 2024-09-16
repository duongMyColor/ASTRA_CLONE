import {
  TextInput,
  SelectInput,
  EditBase,
  Title,
  FileInput,
  FileField,
  useDataProvider,
  useRecordContext,
  useNotify,
} from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { useNavigate } from 'react-router-dom';
import { validateUserEdition } from './formValidator';
import { BaseComponentProps, RAFile, RecordValue } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles } from '@repo/styles';
import { useEffect, useState } from 'react';
import { AcstaResponseIF } from '@repo/types/acsta';
import { PerformanceTypeMasterResponseIF } from '@repo/types/performanceTypeMaster';
import { convertToFormData } from '@repo/utils/formData';
import { uploadMuiltpart } from '@repo/utils/multipartUpload';
import { UPDATED_SUCCESS } from '@repo/consts/general';

interface typeFormSelected {
  id: string;
  name: string;
}

const PerformanceEditForm = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const dataProvider = useDataProvider();
  const [acstaId, setAcstaId] = useState<Array<typeFormSelected>>([]);
  const [performanceTypeMasterId, setPerformanceTypeMasterId] = useState<
    Array<typeFormSelected>
  >([]);
  const notify = useNotify();
  const navigate = useNavigate();
  const record = useRecordContext();

  const extractFile = (value: RAFile): File => {
    return value.rawFile;
  };
  const handleUpdate = async (values: RecordValue) => {
    console.log('handle values;', values);
    const { assetDataAndroid, assetDataIOS, ...rest } = values;

    if (assetDataAndroid?.rawFile) {
      const assetBundleAndroidFile = extractFile(assetDataAndroid);
      const keyAndroid = await uploadMuiltpart(assetBundleAndroidFile);
      rest.assetBundleAndroid = keyAndroid;
    }

    if (assetDataIOS?.rawFile) {
      const assetBundleIOSFile = extractFile(assetDataIOS);

      const keyIOS = await uploadMuiltpart(assetBundleIOSFile);
      rest.assetBundleIOS = keyIOS;
    }

    try {
      const formData = convertToFormData(rest);

      await dataProvider.update(resource, {
        id: record.id,
        data: formData,
        previousData: record,
      });

      await notify(UPDATED_SUCCESS, {
        type: 'success',
      });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 更新に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const setIdAcstaFunc = async () => {
      const resAcstaId = await dataProvider.getAll('acstas');
      setAcstaId(
        resAcstaId.map(({ id, acstaName }: AcstaResponseIF) => {
          return { id, name: `${id} : ${acstaName}` };
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
            return { id, name: `${id} : ${typeName}` };
          }
        )
      );
    };

    await Promise.all([setIdAcstaFunc(), setPerformanceTypeMasterIdFunc()]);
  };
  useEffect(() => {
    fetchIdLastest();
  }, []);
  return (
    <>
      <Title title="演出管理　編集" />
      <CustomForm
        pathTo={resourcePath}
        validate={validateUserEdition}
        showSaveButton={true}
        showReferenceButton={true}
        showCancelButton={true}
        handleSave={handleUpdate}
      >
        <TextInput source="id" label="演出ID" isRequired fullWidth disabled />
        <TextInput source="name" label="演出名" fullWidth isRequired />

        <SelectInput
          source="performanceTypeMasterId"
          choices={performanceTypeMasterId}
          fullWidth
          isRequired
          label="演出種別ID"
        />

        <FileInput
          source="assetDataIOS"
          label="アセットバンドルデータ (iOS)*"
          placeholder="アップロード"
        >
          <FileField source="src" title="title" />
        </FileInput>

        <FileInput
          source="assetDataAndroid"
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
    </>
  );
};

const PerformanceManagementEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <PerformanceEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default PerformanceManagementEdit;
