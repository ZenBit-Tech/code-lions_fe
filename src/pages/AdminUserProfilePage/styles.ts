import { Box, styled } from '@mui/system';

import hexToRgba from 'src/common/hexToRgba';
import theme from 'src/theme';

const backgroundOpacity: number = 0.5;

export const StyledUserSection = styled(Box)({
  backgroundColor: hexToRgba(theme.palette.background.paper, backgroundOpacity),
  padding: '30px',
  height: '100%',
});

export const StyledShape = styled(Box)({
  backgroundColor: theme.palette.common.black,
  width: '8px',
  height: '24px',
  borderRadius: '10px',
});
