export const parseSearchParams = (params: URLSearchParams) => {
  const jsonString = Array.from(params.keys())[0];

  // Parse the JSON string
  const parsed = JSON.parse(jsonString as string);

  // Get the sort, range, and filter values
  const sort = JSON.parse(parsed.sort);
  const range = JSON.parse(parsed.range);
  const filter = JSON.parse(parsed.filter);

  return { sort, range, filter };
};

export const parseParams = (params: URLSearchParams) => {
  const jsonString = Array.from(params.keys())[0];

  // Parse the JSON string
  const parsed = JSON.parse(jsonString as string);

  return parsed;
};
