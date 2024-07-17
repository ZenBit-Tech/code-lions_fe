import { Chip, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

import { ProductStatus } from 'src/redux/product/types';

export const TableHeadStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

export const TableRowStyled = styled(TableRow)({
  '& :first-of-type': {
    borderBottomLeftRadius: '8px',
    borderTopLeftRadius: '8px',
  },
  '& :last-child': {
    borderBottomRightRadius: '8px',
    borderTopRightRadius: '8px',
  },
});

export const TableCellStyled = styled(TableCell)({
  border: 0,
  textTransform: 'uppercase',
});

export const TableBodyStyled = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const BodyTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.grey[100],
  verticalAlign: 'center',
}));

const productStatus = {
  PUBLISHED: 'published',
  INACTIVE: 'inactive',
};

export const Status = styled(Chip)<{ status: ProductStatus }>(({
  status,
  theme,
}) => {
  let color;
  let backgroundColor;

  if (status === productStatus.PUBLISHED) {
    color = theme.palette.success.dark;
    backgroundColor = theme.palette.success.light;
  } else if (status === productStatus.INACTIVE) {
    color = theme.palette.error.main;
    backgroundColor = theme.palette.error.light;
  } else {
    color = 'inherit';
  }

  return {
    color,
    backgroundColor,
    textTransform: 'capitalize',
  };
});
