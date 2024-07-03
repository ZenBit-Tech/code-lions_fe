import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import theme from 'src/theme';

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    marginLeft: '-4px',
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
  },
}));

export const StyledRadio = styled(Radio)(() => ({
  color: theme.palette.border.grey,
  '& .MuiSvgIcon-root': {
    height: 18,
    width: 18,
  },
  '.Mui-checked': {
    color: theme.palette.common.black,
  },
}));
