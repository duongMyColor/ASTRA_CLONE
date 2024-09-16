import { formatDateAcstar } from '@repo/utils/dateFormat';
import { useRecordContext } from 'react-admin';
import { TextField } from '@mui/material';
import { disabledInputBackgroundStyle } from '@repo/styles';

const FormatInputDateShow = ({
  label,
  source,
  ...props
}: {
  label: string;
  source: string;
}) => {
  const record = useRecordContext();

  let formatDate = record ? formatDateAcstar(record[source]) : '';

  return (
    <TextField
      id="filled-basic"
      label={label}
      variant="filled"
      value={formatDate}
      disabled
      sx={{ marginTop: '22px', width: '100%', ...disabledInputBackgroundStyle }}
      {...props}
    />
  );
};

export default FormatInputDateShow;
