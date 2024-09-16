import { cookies } from 'next/headers';
const getServerCookieValue = (name: string) => {
  const cookieStore = cookies();

  return cookieStore.get(name)?.value;
};

export { getServerCookieValue };
