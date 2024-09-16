const productContentLength = {
  name: {
    max: 20,
    min: 0,
  },
};

const masterCategories = [
  { id: 1, name: 'Home' },
  { id: 2, name: 'Pet' },
  { id: 3, name: 'Computer' },
];

const subCategories = [
  { id: 1, name: 'Kitchen', masterId: 1 },
  { id: 2, name: 'Garden', masterId: 1 },
  { id: 3, name: 'Bedroom', masterId: 1 },
  { id: 4, name: 'Dog', masterId: 2 },
  { id: 5, name: 'Cat', masterId: 2 },
  { id: 6, name: 'Mouse', masterId: 2 },
  { id: 7, name: 'Laptop', masterId: 3 },
  { id: 8, name: 'Desktop', masterId: 3 },
];

const statusActiveAppMaster = [
  { id: 0, name: 'アクティブ' },
  { id: 1, name: '非アクティブ' },
];

export interface TypeStatusAppMaster {
  0: boolean;
  1: boolean;
}
const STATUS_APP_MASTER: TypeStatusAppMaster = {
  0: false,
  1: true,
};

export {
  productContentLength,
  masterCategories,
  subCategories,
  statusActiveAppMaster,
  STATUS_APP_MASTER,
};
