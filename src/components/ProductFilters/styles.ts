import { Button, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from 'src/theme';

export const ColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'selected',
})<{ buttoncolor: string; selected: boolean }>(({ buttoncolor, selected }) => ({
  width: '34px',
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
  '& .MuiButtonBase-root-MuiButton-root': {
    minWidth: '34px',
  },
}));

export const CustomizedSlider = styled(Slider)`
  & .MuiSlider-rail {
    border: 1.49px solid ${theme.palette.secondary.main};
    width: 100%;
    height: 1px;
    opacity: 1;
  }

  & .MuiSlider-thumb {
    width: 14px;
    height: 12px;
    border-radius: 100%;
    background-color: ${theme.palette.secondary.main};
  }
  & .MuiSlider-track {
    border: 1.49px solid ${theme.palette.common.black};
    background-color: ${theme.palette.common.black};
    height: 1px;
  }

  & .MuiSlider-mark {
    background-color: transparent;
  }
`;
