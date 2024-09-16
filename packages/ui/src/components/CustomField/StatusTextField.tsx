import { TextInput, useRecordContext } from 'react-admin';

export const StatusTextField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'アクティブ' && (
        <TextInput
          source={source}
          label="ステータス"
          disabled
          fullWidth
          sx={{
            '& .Mui-disabled': {
              WebkitTextFillColor: 'green',
            },
            '& .MuiFilledInput-input': {
              background: '#f4f4f5c4',
            },
          }}
        />
      )}

      {record && record[source] === '非アクティブ' && (
        <TextInput
          source={source}
          label="ステータス"
          disabled
          fullWidth
          sx={{
            '& .Mui-disabled': {
              WebkitTextFillColor: 'red',
            },
          }}
        />
      )}
    </>
  );
};
