import { TextField, Box, Tooltip } from '@mui/material';
/**
 * DeleteButtonFlexEnd component for delete button
 * @returns
 */
const TooltipCustom = ({
  label = 'このフィールドに記入してください',
  width = '100%',
  children,
}: {
  label?: string;
  children: React.ReactNode;
  width?: string;
}) => (
  <Tooltip
    title={label}
    enterDelay={500}
    arrow
    slotProps={{
      popper: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -20],
            },
          },
        ],
      },
    }}
  >
    <Box sx={{ width }}>{children}</Box>
  </Tooltip>
);

export default TooltipCustom;
