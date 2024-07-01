import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  padding: '0 0 16px 0',
  border: 0,
  color: theme.palette.text.disabled,
}));

export const TableBodyCellStyled = styled(TableCell)({
  border: 0,
  padding: '0 0 12px 0',
});

export const TableRowStyled = styled(TableRow)({
  '&:last-child': {
    '& .MuiTableCell-root': {
      padding: 0,
    },
  },
});
