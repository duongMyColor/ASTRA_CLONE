import { TextInput, ShowBase, Title, useRecordContext } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles, disabledInputBackgroundStyle } from '@repo/styles';

import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import ButtonPreviewFile from '@repo/ui/src/components/ButtonPreviewFile';

const TermsOfUseManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const record = useRecordContext();
  console.log(':::record show', record);

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="利用規約管理　参照" />
          <CustomForm pathTo={resourcePath} showCancelButton={true}>
            <TextInput
              source="id"
              label="利用規約ID"
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
            <ButtonPreviewFile label="規約本文" />
            <FormatInputDateShow label="公開開始日" source="publishedDate" />
            <FormatInputDateShow label="登録日時" source="createdAt" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default TermsOfUseManagementShow;
