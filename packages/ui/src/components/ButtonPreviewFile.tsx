import { Button } from '@mui/material';
import { useRecordContext } from 'react-admin';
const ButtonPreviewFile = ({label}:{label:string}) => {
  const record = useRecordContext();

  const previewFile = () => {
    const newTab = window.open('', '_blank') as Window;
    newTab.document.write(record.content);
    newTab.document.close();
  };

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      onClick={previewFile}
    >
      {label} 別タブでプレビュー
    </Button>
  );
};

export default ButtonPreviewFile;
