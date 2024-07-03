import { Paper, TableBody, TableCell } from '@mui/material';
import { Box, styled } from '@mui/system';

export const TableWrapper = styled(Box)({
  margin: '52px 166px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

// export const TableRowStyled = styled(TableRow)({
//   '& :first-of-type': {
//     borderBottomLeftRadius: '8px',
//     borderTopLeftRadius: '8px',
//   },
//   '& :last-child': {
//     borderBottomRightRadius: '8px',
//     borderTopRightRadius: '8px',
//   },
// });

// export const TableCellStyled = styled(TableCell)({
//   // border: 0,
// });

export const TableBodyStyled = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const BodyTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.grey[100],
  padding: '24px 0',
}));

export const ImageWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
