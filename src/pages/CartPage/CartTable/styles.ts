import { Paper, TableBody, TableCell } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TableBodyStyled = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const BodyTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.border.light,
  padding: '24px 0',
}));

export const ImageWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  width: '80px',
  height: '96px',
}));

export const Image = styled('img')({
  objectFit: 'cover',
  objectPosition: 'center',
});
const whiteColor = 'white';

export const Circle = styled(Box)<{ color: string }>(({ color, theme }) => ({
  borderRadius: '50%',
  width: '16px',
  height: '16px',
  backgroundColor: color,
  border:
    color === whiteColor ? `1px solid ${theme.palette.common.black}` : 'none',
}));
