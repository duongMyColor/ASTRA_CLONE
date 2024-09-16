import { SaveButton } from 'react-admin';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';

/**
 * EditToolBar component with save and cancel buttons
 * @param path: string - path to redirect after cancel button is clicked
 * @returns
 */
const EditToolBar = ({ path }: { path: string }) => (
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
    <SaveButton />
    <Link to={path}>
      <Button type="button" variant="contained" color="error">
        Cancel
      </Button>
    </Link>
  </Stack>
);

export default EditToolBar;
