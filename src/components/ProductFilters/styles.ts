import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from 'src/theme';

export const ColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'selected',
})<{ buttoncolor: string; selected: boolean }>(({ buttoncolor, selected }) => ({
  flexBasis: '34px',
  height: '34px',
  borderRadius: '50%',
  backgroundColor: buttoncolor,
  cursor: 'pointer',
  border: selected
    ? `2px solid ${theme.palette.common.black}`
    : '2px solid transparent',
  transition: 'backgroundColor 0.3s, border 0.3s',
  '&:hover': {
    border: `2px solid ${theme.palette.common.black}`,
    backgroundColor: buttoncolor,
  },
}));

export default ColorButton;
