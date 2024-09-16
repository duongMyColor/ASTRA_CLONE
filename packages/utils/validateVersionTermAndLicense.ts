import { RecordValue } from '@repo/types/general';
import dataProvider from '../../apps/cms/src/providers/dataProviders/dataProvider';

export const validateVersionTermAndLicense = async (
  values: RecordValue,
  resource: string
) => {
  const regex = /^\d+$/;

  console.log(values);
  if (!regex.test(values?.version)) return false;

  const responseIdLastest = await dataProvider.getIdLastest(resource);

  let versionEnd = parseInt(responseIdLastest.data[0]?.version) || null;
  if(!versionEnd) return true
  let versionNext = parseInt(values?.version);

  if (versionNext <= versionEnd) return false;
  return true;
};
