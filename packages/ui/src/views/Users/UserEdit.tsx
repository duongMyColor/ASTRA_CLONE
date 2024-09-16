import { userRoles } from '@repo/consts/user';
import {
  EditBase,
  Title,
  useNotify,
  useRecordContext,
  DataProvider,
} from 'react-admin';
import { validateUserEdition } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { validRole } from '../_core/permissions';
import { boxStyles } from '@repo/styles';
import { useNavigate } from 'react-router-dom';
import { UPDATED_SUCCESS } from '@repo/consts/general';
import { Box, Stack, Button, IconButton, InputAdornment } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import ReferenceButtonFlexEnd from '../../components/ReferenceButtonFlexEnd';

const UserEditForm = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const record = useRecordContext();

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm<any>({
    mode: 'onTouched',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowComfirmPassword = () =>
    setShowComfirmPassword((prev) => !prev);

  const checkUserEmailExists = async (
    dataProvider: DataProvider,
    resource: string,
    email: string
  ) => {
    const findUser = await dataProvider.getOneByEmail(resource, email);
    return findUser.data.email ? true : false;
  };
  const handleCancel = () => {
    navigate(resourcePath);
  };
  const handleUpdate = async (values: RecordValue) => {
    setIsLoading(true);
    try {
      const emailExists = await checkUserEmailExists(
        dataProvider,
        resource,
        values.email
      );

      if (emailExists && record.email !== values.email) {
        setIsLoading(false);
        return notify('エラー: メールアドレスはすでに存在します', {
          type: 'warning',
        });
      }
      await dataProvider.update(resource, {
        id: record.id,
        data: values,
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
    setIsLoading(false);
  };
  useEffect(() => {
    if (confirmNewPassword) {
      trigger('confirmNewPassword');
    }
  }, [newPassword, trigger]);
  useEffect(() => {
    if (record) {
      reset({
        email: record.email || ' ',
        username: record.username || ' ',
        role: record.role || ' ',
      });
    }
  }, [record]);

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="100%"
          alignItems="center"
        >
          <ReferenceButtonFlexEnd label="参照" />
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            id="filled-basic"
            label="CMS-ID*"
            variant="filled"
            defaultValue={record ? record.username : ' '}
            fullWidth
            {...register('username', {
              validate: (value) => validateUserEdition(value, 'username'),
            })}
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />

          <FormControl
            variant="filled"
            sx={{ m: 1, maxWidth: 150, margin: '0 !important' }}
            error={!!errors.role}
          >
            <InputLabel id="demo-simple-select-filled-label">権限*</InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: '必須' }}
              render={({ field }) => (
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  {...field}
                  value={field.value || ''}
                >
                  {userRoles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <TextField
            id="filled-basic"
            label="メールアドレス*"
            variant="filled"
            defaultValue={record ? record.email : ' '}
            fullWidth
            {...register('email', {
              validate: (value) => validateUserEdition(value, 'email'),
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <TextField
            fullWidth
            id="filled-basic"
            label="パスワード"
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            {...register('newPassword', {
              validate: (value) => validateUserEdition(value, 'newPassword'),
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle newPassword visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            id="filled-basic"
            label="パスワード確認"
            variant="filled"
            type={showComfirmPassword ? 'text' : 'password'}
            {...register('confirmNewPassword', {
              validate: (value) =>
                validateUserEdition(value, 'confirmNewPassword', {
                  password: getValues('newPassword'),
                }),
            })}
            error={!!errors.confirmNewPassword}
            helperText={errors.confirmNewPassword?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowComfirmPassword}
                    edge="end"
                  >
                    {showComfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
            sx={{
              backgroundColor: '#f1f1f1',
              padding: '1rem',
              borderRadius: '4px',
              marginTop: '1rem',
            }}
          >
            <Button variant="contained" color="error" onClick={handleCancel}>
              戻る
            </Button>

            {validRole('edit', actions) && (
              <Button
                startIcon={<SaveIcon />}
                type="submit"
                variant="contained"
                disabled={
                  isLoading === false &&
                  (watch('newPassword') ||
                    watch('confirmNewPassword') ||
                    (watch('email') && getValues('email') !== record?.email) ||
                    (watch('username') &&
                      getValues('username') !== record?.username) ||
                    (watch('role') && getValues('role') !== record?.role))
                    ? false
                    : true
                }
              >
                保存
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </form>
  );
};

const UserEdit = (props: BaseComponentProps) => {
  return (
    <Box sx={boxStyles}>
      <EditBase>
        <Title title="管理ユーザー管理　編集" />

        <UserEditForm {...props} />
      </EditBase>
    </Box>
  );
};

export default UserEdit;
