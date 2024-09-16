import { Stack } from '@mui/material';
import { EditButton } from 'react-admin';

/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const EditButtonFlexEnd = ({label}: {label:string}) => (
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
);

export default EditButtonFlexEnd;
