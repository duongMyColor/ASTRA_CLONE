import { TextInput, ShowBase, Title } from 'react-admin';
import CustomForm from '@repo/ui/src/components/CustomForm';
import { BaseComponentProps } from '@repo/types/general';
import { Box } from '@mui/material';
import { validRole } from '../_core/permissions';
import { disabledInputBackgroundStyle, boxStyles } from '@repo/styles';

const PerformanceTypeMasterShow = ({
  actions,
  resource,
}: BaseComponentProps) => {
  const resourcePath = `/${resource}`;

  return (
    <Box sx={boxStyles}>
      <ShowBase>
        <>
          <Title title="演出種別マスタ　参照" />
          <CustomForm
            pathTo={resourcePath}
            showEditButton={validRole('edit', actions)}
            showCancelButton={true}
          >
            <TextInput
              source="id"
              label="演出種別ID"
              disabled
              sx={{ ...disabledInputBackgroundStyle, width: '50%' }}
            />

            <TextInput
              source="typeName"
              label="演出種別名"
              disabled
              sx={{ ...disabledInputBackgroundStyle, width: '50%' }}
            />
          </CustomForm>
        </>
      </ShowBase>
    </Box>
  );
};

export default PerformanceTypeMasterShow;
