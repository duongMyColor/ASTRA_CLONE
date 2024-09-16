import { ForcedUpdateManagementPostIF } from '@repo/types/forceUpdateManagement';

function getCategory(char: string) {
  if (/\d/.test(char)) return 1;
  if (/[A-Z]/.test(char)) return 2;
  if (/[a-z]/.test(char)) return 3;
  if (/[\u3040-\u309F]/.test(char)) return 4;
  if (/[\u30A0-\u30FF]/.test(char)) return 5;
  if (/[\u4E00-\u9FAF]/.test(char)) return 6;
  if (/[\uFF10-\uFF19]/.test(char)) return 7;
  if (/[\uFF21-\uFF3A]/.test(char)) return 8;
  if (/[\uFF41-\uFF5A]/.test(char)) return 9;
  return 10;
}

function sortDataForcedUpdate(
  items: ForcedUpdateManagementPostIF[],
  orderBy: string
): ForcedUpdateManagementPostIF[] {
  const data = [...items];

  if (items) {
    const sortedData = data.sort((a, b) => {
      const categoryA = getCategory(a.managementName);

      const categoryB = getCategory(b.managementName);
      if (categoryA !== categoryB) {
        return orderBy === 'ASC'
          ? categoryA - categoryB
          : categoryB - categoryA;
      }

      if (a.managementName === b.managementName && a.id && b.id)
        return orderBy === 'ASC' ? a.id - b.id : b.id - a.id;
      return orderBy === 'ASC'
        ? a.managementName.localeCompare(b.managementName)
        : b.managementName.localeCompare(a.managementName);
    });

    return sortedData;
  }

  return [];
}

export { getCategory, sortDataForcedUpdate };
