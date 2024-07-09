import { Box, Container, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const CategoryWrapper = styled(Container)({
  display: 'flex !important',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

export const CategoryImage = styled('img')({
  width: '196px',
  height: '196px',
  borderRadius: '50%',
  margin: '0px 0px 12px',
  objectFit: 'cover',
});

export const NextArrowWrapper = styled(Box)({
  position: 'absolute',
  top: '33%',
  right: '-3%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  zIndex: 1,
});

export const PrevArrowWrapper = styled(Box)({
  position: 'absolute',
  top: '33%',
  left: '-2%',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  zIndex: 1,
});

export const SliderTitle = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
    marginBottom: '32px',
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    fontFamily: theme.typography.h5.fontFamily,
  })
);

export const CategoryTitile = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    fontFamily: theme.typography.h5.fontFamily,
  })
);
