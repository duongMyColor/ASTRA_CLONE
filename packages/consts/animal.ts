const types = [
  { id: 1, name: 'Mammal' },
  { id: 2, name: 'Bird' },
  { id: 3, name: 'Fish' },
];
const continents = [
  { id: 1, name: 'Africa' },
  { id: 2, name: 'North America' },
  { id: 3, name: 'South America' },
  { id: 4, name: 'Asia' },
  { id: 5, name: 'Europe' },
  { id: 6, name: 'Australia/Oceania' },
  { id: 7, name: 'Antarctica' },
];

const feedTypes = [
  { id: 1, name: 'Carnivore' },
  { id: 2, name: 'Omnivore' },
  { id: 3, name: 'Herbivore' },
];

const genders = [
  { id: 0, name: 'Male' },
  { id: 1, name: 'Female' },
  { id: 2, name: 'Unknow' },
];

const uploadTypes = [
  { id: 'DB', name: 'DB' },
  { id: 'LOCAL', name: 'LOCAL' },
  { id: 'S3', name: 'S3' },
];

const uploadTypesSB = [
  { id: 'DB', name: 'DB' },
  { id: 'LOCAL', name: 'LOCAL' },
  { id: 'S3', name: 'S3' },
  { id: 'SUPABASE', name: 'SUPABASE' },
];

export { continents, feedTypes, genders, types, uploadTypes, uploadTypesSB };
