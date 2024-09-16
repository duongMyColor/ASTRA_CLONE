import {
  TextInput,
  ShowBase,
  Show,
  Title,
  useShowContext,
  useRecordContext,
} from 'react-admin';
import { countryList, MAP_ROLE, userRoles } from '@repo/consts/user';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { disabledInputBackgroundStyle, boxStyles } from '@repo/styles';
import FormatInputDateShow from '../../components/FormatInputDateShow';
import { TextField } from '@mui/material';
import { OptionRole } from '@repo/types/user';

const InputCustom = () => {
  const record = useRecordContext();

  console.log({ record });
  return (
    <TextField
      id="filled-basic"
      label="権限"
      variant="filled"
      value={MAP_ROLE[record?.role as keyof OptionRole]}
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

const UserShow = ({ actions, resource }: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const record = useRecordContext();

  console.log({ record });
  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="管理ユーザー管理　参照" />
          <CustomForm
            pathTo={resourcePath}
            showDeleteButton={validRole('delete', actions)}
            deleteButtonLabel="アカウント削除"
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="username"
              label="CMS-ID  "
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />

            <InputCustom />
            <TextInput
              source="email"
              label="メールアドレス  "
              fullWidth
              disabled
              sx={disabledInputBackgroundStyle}
            />
            <FormatInputDateShow label="最終ログイン" source="lastLogin" />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default UserShow;
