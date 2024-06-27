import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

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
