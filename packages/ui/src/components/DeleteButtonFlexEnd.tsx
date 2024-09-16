import { Stack } from '@mui/material';
import { DeleteWithConfirmButton } from 'react-admin';

/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const DeleteButtonFlexEnd = ({ label }: { label: string }) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    sx={{
      width: 'fit-content',
    }}
  >
    <DeleteWithConfirmButton
      confirmContent="よろしいですか?"
      confirmTitle="論理削除します"
      label={label}
      confirmColor="warning"
    />
  </Stack>
);

export default DeleteButtonFlexEnd;
