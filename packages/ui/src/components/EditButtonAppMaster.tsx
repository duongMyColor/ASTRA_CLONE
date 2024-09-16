import { Stack } from '@mui/material';
import { EditButton, useRecordContext } from 'react-admin';

/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const EditButtonAppMaster = ({ label }: { label: string }) => {
  const record = useRecordContext();

  console.log({ record });
  return (
    <>
      {record?.isDeleted === false && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            width: 'fit-content',
          }}
        >
          <EditButton label={label} size="small"></EditButton>
        </Stack>
      )}
    </>
  );
};

export default EditButtonAppMaster;
