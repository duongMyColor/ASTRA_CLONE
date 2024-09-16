import { Stack, Button } from '@mui/material';
import { ShowButton } from 'react-admin';
import { Link } from 'react-router-dom';
/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const ReferenceButtonFlexEnd = ({ label }: { label: string }) => (
  <Stack
    direction="row"
    justifyContent="flex-end"
    alignItems="center"
    sx={{
      width: 'fit-content',
    }}
  >
    <ShowButton label={label} />

  </Stack>
);

export default ReferenceButtonFlexEnd;
