import { TableBody, TableHead } from '@mui/material';
import { styled } from '@mui/system';

export const TableHeadStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: '8px',
}));

export const TableBodyStyled = styled(TableBody)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));
