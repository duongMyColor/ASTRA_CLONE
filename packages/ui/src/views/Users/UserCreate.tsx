import { userRoles } from '@repo/consts/user';
import { useNotify, DataProvider, Title } from 'react-admin';
import { Box, Stack, Button, IconButton, InputAdornment } from '@mui/material';

import { validateUserCreation } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS } from '@repo/consts/general';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { boxStyles } from '@repo/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validRole } from '../_core/permissions';
import SaveIcon from '@mui/icons-material/Save';

const UserCreate = ({
  actions,
  resource,
  dataProvider,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    handleSubmit,
    watch,
  } = useForm<any>({
    mode: 'onTouched',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
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

  const handleSave = async (values: RecordValue) => {
    setIsLoading(true);
    try {
      const emailExists = await checkUserEmailExists(
        dataProvider,
        resource,
        values.email
      );

      if (emailExists) {
        setIsLoading(false);
        return notify('エラー: メールアドレスはすでに存在します', {
          type: 'warning',
        });
      }

      await dataProvider.create(resource, {
        data: values,
      });

      notify(CREATED_SUCCESS, { type: 'success' });
      navigate(resourcePath);
    } catch (error) {
      notify('エラー: 利用規約の作成に失敗しました:' + error, {
        type: 'warning',
      });
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    navigate(resourcePath);
  };

  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  return (
    <Box sx={boxStyles}>
      <Title title={`管理ユーザー管理　新規作成`} />
      <form onSubmit={handleSubmit(handleSave)}>
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            id="filled-basic"
            label="CMS-ID*"
            variant="filled"
            fullWidth
            {...register('username', {
              validate: (value) => validateUserCreation(value, 'username'),
            })}
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />

          <FormControl
            variant="filled"
            sx={{ m: 1, maxWidth: 150, margin: '0 !important' }}
          >
            <InputLabel id="demo-simple-select-filled-label">権限*</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              {...register('role', { required: '必須' })}
              error={!!errors.role}
              defaultValue="GENERAL"
            >
              {userRoles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="filled-basic"
            label="メールアドレス*"
            variant="filled"
            fullWidth
            {...register('email', {
              validate: (value) => validateUserCreation(value, 'email'),
            })}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />

          <TextField
            fullWidth
            id="filled-basic"
            label="パスワード*"
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              validate: (value) => validateUserCreation(value, 'password'),
            })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
            label="パスワード確認*"
            variant="filled"
            type={showComfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              validate: (value) =>
                validateUserCreation(value, 'confirmPassword', {
                  password: getValues('password'),
                }),
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
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
                  (watch('password') ||
                    watch('confirmPassword') ||
                    watch('email') ||
                    watch('username') ||
                    (watch('role') && getValues('role') != 'GENERAL'))
                    ? false
                    : true
                }
              >
                保存
              </Button>
            )}
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default UserCreate;
