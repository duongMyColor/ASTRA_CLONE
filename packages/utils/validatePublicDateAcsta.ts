import { ForcedUpdateManagementResponseIF } from '@repo/types/forceUpdateManagement';
import { RecordValue } from '@repo/types/general';
import dayjs from 'dayjs';

export const validatePublicDateAcsta = (values: RecordValue): boolean => {
  console.log({ values });

  if (!values.dateEnd) return true;
  let dateEnd = dayjs(values.dateEnd).valueOf();
  let dateStart = dayjs(values.dateStart).valueOf();
  if (dateEnd <= dateStart) return false;

  return true;
};
