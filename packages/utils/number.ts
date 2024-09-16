export const generateRandomId = () => {
  return Math.floor(Math.random() * 100000);
};

export const roundNumberWith5Decimals = (number: number) => {
  return Number(number.toFixed(5));
};
