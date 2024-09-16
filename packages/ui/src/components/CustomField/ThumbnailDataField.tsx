import { ImageField, SimpleShowLayout, useRecordContext } from 'react-admin';
import { Box, Button } from '@mui/material';
import { imageFieldStyles } from '@repo/styles';

export const ThumbnailDataField = ({ source }: { source: string }) => {

  const record = useRecordContext();
  return (
    <>
      <Box
        sx={{
          fontSize: '0.9em',
          color: 'rgba(0, 0, 0, 0.6)',
          fontWeight: '500',
        }}
      >
        アクスタサムネイル
      </Box>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Box
            sx={{
              fontSize: '0.75em',
              color: 'rgba(0, 0, 0, 0.6)',
              fontWeight: '400',
            }}
          >
            {record?.thumbnailUrl.title}
          </Box>
          <SimpleShowLayout spacing={3}>
            <ImageField source={source} label="" sx={imageFieldStyles} />
          </SimpleShowLayout>
        </Box>
      </Box>
    </>
  );
};
