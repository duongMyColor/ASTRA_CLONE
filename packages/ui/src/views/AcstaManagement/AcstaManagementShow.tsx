import {
  TextInput,
  ShowBase,
  Title,
  SimpleShowLayout,
  ImageField,
  useGetRecordId,
  useRecordContext,
} from 'react-admin';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { StatusTextField } from '@repo/ui/src/components/CustomField/StatusTextField';
import { ScanDataField } from '@repo/ui/src/components/CustomField/ScanDataField';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import RectEditorArea from './RectEditorArea';

import { validRole } from '../_core/permissions';
import {
  disabledInputBackgroundStyle,
  boxStyles,
  imageFieldStyles,
} from '@repo/styles';

import { BaseComponentProps } from '@repo/types/general';
import { ThumbnailDataField } from '../../components/CustomField/ThumbnailDataField';

const InputCustom = () => {
  const record = useRecordContext();

  return (
    <TextField
      id="filled-basic"
      label="アプリケーションID"
      variant="filled"
      value={`${record?.application?.id ?? ''} : ${record?.application?.appName ?? ''}`}
      disabled
      sx={{
        width: '100%',
        backgroundColor: '#f4f4f5c4 !important',
        marginBottom: '25px',
        '& .MuiFilledInput-input': {
          backgroundColor: '#f4f4f5c4 !important',
        },
        '& .Mui-disabled': {
          WebkitTextFillColor: '#4d4d4d !important',
        },
      }}
    />
  );
};

const AcstaManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  const [isScanRange, setIsScanRange] = useState<boolean>(false);

  const moveScanRange = () => {
    setIsScanRange(!isScanRange);
  };

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title
            title={
              isScanRange
                ? 'アクスタ管理　色識別範囲指定'
                : 'アクスタ管理　参照'
            }
          />

          {isScanRange ? (
            <RectEditorArea
              moveScanRange={moveScanRange}
              resource={resource}
              actions={actions}
            />
          ) : (
            <CustomForm
              pathTo={resourcePath}
              showEditButton={validRole('edit', actions)}
              showCancelButton={true}
            >
              <TextInput
                source="id"
                label="アクスタ ID"
                disabled
                sx={disabledInputBackgroundStyle}
              />
              <TextInput
                source="managementName"
                label="管理名"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />
              <TextInput
                source="acstaName"
                label="アクスタ名"
                disabled
                fullWidth
                sx={disabledInputBackgroundStyle}
              />
              <InputCustom />

              <ThumbnailDataField source="thumbnailUrl.src" />
              <ScanDataField
                source="scanImageUrl.src"
                moveScanRange={moveScanRange}
              ></ScanDataField>
              <StatusTextField source="status"></StatusTextField>
              <FormatInputDateShow label="公開開始日" source="dateStart" />
              <FormatInputDateShow label="公開終了日" source="dateEnd" />
              <FormatInputDateShow label="登録日時" source="createdAt" />
            </CustomForm>
          )}
        </>
      </ShowBase>
    </Box>
  );
};

export default AcstaManagementShow;
