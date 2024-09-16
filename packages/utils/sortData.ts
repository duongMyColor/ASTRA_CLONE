import { RecordValue } from '@repo/types/general';

export const sortData = (res: any, type?: number) => {
  let data = [];
  if (res.length > 0) {
    let position = res.map((value: any) => value.id);
    res.sort((a: any, b: any) => (type !== 1 ? a.id - b.id : b.id - a.id));

    for (let i = 0; i < res.length; i++) {
      res[i].no = i + 1;
    }

    for (let i = 0; i < position.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (position[i] === res[j].id) {
          data.push(res[j]);
          break;
        }
      }
    }
  }

  return data;
};

export const sortDataByManagementName = (res: any, order: any[]) => {
  let data = [];
  if (res.length > 0) {
    res.sort((a: any, b: any) => a.id - b.id);

    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (
          order[i].managementName === res[j].managementName &&
          order[i].id === res[j].id
        ) {
          data.push(res[j]);
          break;
        }
      }
    }
  }

  return data;
};
export const sortDataByVersion = (res: any, order: string[]) => {
  let data: RecordValue[] = [];
  if (res.length > 0) {
    res.sort((a: any, b: any) => a.id - b.id);

    for (let i = 0; i < order.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (order[i] === res[j].version) {
          if (data && data.some((item) => item === res[j])) continue;
          data.push(res[j]);
          break;
        }
      }
    }
  }

  return data;
};

const parseVersion = (version: string) => version.split('.').map(Number);

const compareVersions = (orderBy: string) => (a: string, b: string) => {
  const versionA = parseVersion(a);
  const versionB = parseVersion(b);

  for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
    const numA = versionA[i] || 0;
    const numB = versionB[i] || 0;

    if (numA < numB) return orderBy === 'ASC' ? -1 : 1;
    if (numA > numB) return orderBy === 'ASC' ? 1 : -1;
  }

  return 0;
};

export const sortVersion = (versions: string[], orderBy: string) => {
  return versions.sort(compareVersions(orderBy));
};
