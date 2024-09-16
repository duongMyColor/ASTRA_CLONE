
import { MAP_ACCEPT_TYPE_FILE } from '@repo/consts/general';

export const validateTypeFile = async (
  file: string,
  nameFile: string
) => {

  if(!file)return
  const typeFile = file?.split('.')?.pop()
  return MAP_ACCEPT_TYPE_FILE[nameFile].includes(`${typeFile}`)

};
