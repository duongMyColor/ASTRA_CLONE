import { useRecordContext } from 'react-admin';

interface CustomButtonByRoleProps {
  children: JSX.Element | JSX.Element[];
  condition?: any;
  source?: string;
  label?: string;
}

/**
 *
 * @param children - JSX.Element | JSX.Element[]
 * @param condition - condition to match
 * @param source - source to match
 * @returns
 */
export const BoxSortField = ({
  children,
  condition,
  source,
  label,
}: CustomButtonByRoleProps) => {
  const record = useRecordContext();



  return <>{children}</>;
};
