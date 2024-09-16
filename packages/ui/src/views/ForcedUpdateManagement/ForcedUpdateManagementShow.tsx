import { TextInput, ShowBase, Title } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { boxStyles, disabledInputBackgroundStyle } from '@repo/styles';
import FormatInputDateShow from '@repo/ui/src/components/FormatInputDateShow';
import { StatusTextField } from '../../components/CustomField/StatusTextField';

const ForcedUpdateManagementShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="強制アップデート管理　参照" />
          <CustomForm pathTo={resourcePath} showCancelButton={true}>
            <TextInput
              source="id"
              label="強制アップデート ID"
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <TextInput
              source="appMasterIdAndName"
              label="アプリケーションID"
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <TextInput
              source="textOperate"
              label="OS"
              disabled
              fullWidth
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
              source="managementName"
              label="管理タイトル"
              disabled
              fullWidth
              sx={disabledInputBackgroundStyle}
            />

            <StatusTextField source="status"></StatusTextField>
            <FormatInputDateShow label="公開開始日" source="publishedDate" />
            <FormatInputDateShow label="登録日時" source="createdAt" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default ForcedUpdateManagementShow;
