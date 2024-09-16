import { useDataProvider, useNotify, Title } from 'react-admin';
import { TextField } from '@mui/material';
import { Box, Stack, Button } from '@mui/material';

import { validateForceUpdateCreation } from './formValidator';
import { BaseComponentProps, RecordValue } from '@repo/types/general';
import { CREATED_SUCCESS, OPERATE_SYSTEM } from '@repo/consts/general';
import React, { useEffect, useState } from 'react';
import { convertToFormData } from '@repo/utils/formData';
import { useNavigate } from 'react-router-dom';
import { updateStatusAll } from '@repo/utils/updateStatus';
import { AplicationMasterResponseIF } from '@repo/types/applicationMaster';
import { useForm, Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { validRole } from '../_core/permissions';
import SaveIcon from '@mui/icons-material/Save';
import { boxStyles } from '@repo/styles';
import { FormHelperText } from '@mui/material';

interface idAppMasterType {
  id: number;
  name: string;
}

const ForcedUpdateManagementCreate = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;
  const notify = useNotify();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const [idLicense, setIdLicense] = useState<string>('');
  const [oldDate, setOldDate] = useState<Date>();
  const [idAppMaster, setIdAppMaster] = useState<idAppMasterType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    handleSubmit,
    watch,
    setValue,
    control,
  } = useForm<any>({
    mode: 'onTouched',
  });

  const appMasterId = watch('appMasterId');
  const operateSystem = watch('operateSystem');
  const version = watch('version');
  const publishedDate = watch('publishedDate');

  const handleSave = async (values: RecordValue) => {
    setIsLoading(true);
    try {
      const formData = convertToFormData(values);

      const data = await dataProvider.create(resource, {
        data: formData,
      });

      notify(CREATED_SUCCESS, {
        type: 'success',
      });
      setIsLoading(false);
      navigate(resourcePath);
    } catch (error) {
      setIsLoading(false);
      notify('エラー: ライセンスの作成に失敗しました: ' + error, {
        type: 'warning',
      });
    }
  };

  const fetchIdLastest = async () => {
    const listUpdateAllStorage = JSON.parse(
      localStorage.getItem('listUpdateAll') || 'null'
    );
    const response = await dataProvider.getIdLastestRecord(resource);
    let getAllAppMasterId = await dataProvider.getAll('application-masters');
    console.log({ getAllAppMasterId });
    setIdAppMaster(
      getAllAppMasterId.map(({ id, appName }: AplicationMasterResponseIF) => {
        return { id, name: `${id} : ${appName}` };
      })
    );

    const nextId = response.data.idLastest ? response.data.idLastest : 1;
    setIdLicense(`${nextId}`);

    if (response.data[0]) {
      const formatDate = new Date(response.data[0]?.publishedDate);
      setOldDate(formatDate);
    }

    if (!listUpdateAllStorage) {
      let getAllData = await dataProvider.getAll('forced-update-managements');

      getAllData = getAllData.map((value: RecordValue, idx: number) => {
        value['no'] = idx + 1;
        value['textOperate'] = value.operateSystem === '0' ? 'iOS' : 'Android';
        return value;
      });
      const newData = updateStatusAll(getAllData);

      localStorage.setItem('listUpdateAll', JSON.stringify(newData));
    }
  };

  const handleCancel = () => {
    navigate(resourcePath);
  };

  useEffect(() => {
    fetchIdLastest();
  }, []);

  useEffect(() => {
    if (version) {
      trigger('version');
    }
    if (publishedDate) {
      trigger('publishedDate');
    }
  }, [appMasterId, operateSystem, trigger]);

  return (
    <Box sx={boxStyles}>
      <Title title={`管理ユーザー管理　新規作成`} />
      <form onSubmit={handleSubmit(handleSave)}>
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            id="filled-basic"
            label="強制アップデート ID"
            variant="filled"
            value={idLicense}
            disabled
          />

          <FormControl
            variant="filled"
            sx={{ width: '100%' }}
            error={!!errors.appMasterId}
          >
            <InputLabel id="demo-simple-select-filled-label">
              アプリケーションID*
            </InputLabel>
            <Controller
              name="appMasterId"
              control={control}
              rules={{ required: '必須' }}
              render={({ field }) => (
                <>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    {...field}
                  >
                    {idAppMaster &&
                      idAppMaster.map((app, idx) => (
                        <MenuItem key={idx} value={app.id}>
                          {app.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errors.appMasterId && (
                    <FormHelperText>
                      {errors.appMasterId.message as string}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>

          <FormControl
            variant="filled"
            sx={{ width: '100%' }}
            error={!!errors.operateSystem}
          >
            <InputLabel id="demo-simple-select-filled-label">OS*</InputLabel>
            <Controller
              name="operateSystem"
              control={control}
              rules={{ required: '必須' }}
              render={({ field }) => (
                <>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    {...field}
                  >
                    {OPERATE_SYSTEM.map((app) => (
                      <MenuItem key={app.id} value={app.id}>
                        {app.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.operateSystem && (
                    <FormHelperText>
                      {errors.operateSystem.message as string}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>

          <TextField
            id="filled-basic"
            label="バージョン*"
            variant="filled"
            fullWidth
            {...register('version', {
              validate: (value) =>
                validateForceUpdateCreation(value, 'version', {
                  values: watch(),
                }),
            })}
            error={!!errors.version}
            helperText={errors.version?.message as string}
          />
          <TextField
            id="filled-basic"
            label="管理タイトル*"
            variant="filled"
            fullWidth
            {...register('managementName', {
              validate: (value) =>
                validateForceUpdateCreation(value, 'managementName'),
            })}
            error={!!errors.managementName}
            helperText={errors.managementName?.message as string}
          />

          <TextField
            id="filled-basic"
            label="公開開始日*"
            placeholder="ksjdkfjsd"
            variant="filled"
            value={getValues('publishedDate') || ' '}
            type="datetime-local"
            fullWidth
            {...register('publishedDate', {
              validate: (value) =>
                validateForceUpdateCreation(value, 'publishedDate', {
                  values: watch(),
                }),
            })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue('publishedDate', e.target.value);
              trigger('publishedDate');
            }}
            error={!!errors.publishedDate}
            helperText={errors.publishedDate?.message as string}
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
                  (watch('version') ||
                    watch('operateSystem') ||
                    watch('managementName') ||
                    watch('appMasterId') ||
                    watch('publishedDate'))
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

export default ForcedUpdateManagementCreate;
