import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

const PaginationStyled = styled(Pagination)({
  '& .MuiPagination-ul': {
    justifyContent: 'flex-end',
    marginTop: '12px',
  },
  '&.MuiPagination-root .MuiPaginationItem-root': {
    color: theme.palette.text.disabled,
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontSize: theme.typography.subtitle1.fontSize,
  },
  '&.MuiPagination-root .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '10px',
  },
});

export default PaginationStyled;
