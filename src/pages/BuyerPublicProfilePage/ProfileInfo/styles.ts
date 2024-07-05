import { IconButton, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Box, styled } from '@mui/system';

export const TitleWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const IconButtonStyled = styled(IconButton)(
  ({ theme }: { theme: Theme }) => ({
    padding: '0 6px',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  })
);

export const NameTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: 20,
  lineHeight: 1.85,
  letterSpacing: '-0.2px',
  [theme.breakpoints.up('sm')]: {},
}));

export const Number = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginLeft: '4px',
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.h2.fontWeight,
  fontSize: theme.typography.h3.fontSize,
}));
