import { chipStyles } from '@repo/consts/general';
import { ChipField, useRecordContext } from 'react-admin';

export const StatusChipField = ({
  source,
  label,
  sortable = false,
}: {
  source: string;
  label: string;
  sortable?: boolean;
}) => {
  const record = useRecordContext();
  return (
    <>
      {record && record[source] === 'アクティブ' && (
        <ChipField
          source={source}
          label={label}
          sx={chipStyles.configured}
          sortable={sortable}
        />
      )}

      {record && record[source] === '非アクティブ' && (
        <ChipField
          source={source}
          label={label}
          sx={chipStyles.notConfigured}
          sortable={sortable}
        />
      )}
    </>
  );
};
