import { TextInput, ShowBase, Title, useShowContext } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { useState } from 'react';
import {
  boxStyles,
  disabledInputBackgroundStyle,
  textareaStyles,
} from '@repo/styles';
import ButtonPreviewFile from '@repo/ui/src/components/ButtonPreviewFile';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';

const LicenseManagementShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const { record } = useShowContext();
  const [fileContent, setFileContent] = useState('');

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="ライセンス管理　参照" />
          <CustomForm pathTo={resourcePath} showCancelButton={true}>
            <TextInput
              source="id"
              label="ライセンスID"
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="version"
              label="バージョン"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="memo"
              label="メモ"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />
            <ButtonPreviewFile label="ライセンス本文" />
            <FormatInputDateShow label="公開開始日" source="publishedDate" />
            <FormatInputDateShow label="登録日時" source="createdAt" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default LicenseManagementShow;
