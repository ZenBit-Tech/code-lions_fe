import { Link } from 'react-router-dom';

import { Chip, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

import hexToRgba from 'src/common/utils/hexToRgba';

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

const statusColors = {
  newOder: '#B2C450',
  sent: '#36B37E',
  delivered: '#2668BD',
  waiting: '#FF640D',
  returned: '#3F30F3',
};

const orderStatus = {
  NEW: 'New order',
  SENT: 'Sent',
  DELIVERED: 'Delivered',
  WAITING: 'Waiting for returning',
  RETURNED: 'Returned',
};

const opacity = 0.25;

export const Status = styled(Chip)<{ status: string }>(({ status }) => {
  let color;
  let backgroundColor;

  if (status === orderStatus.NEW) {
    color = statusColors.newOder;
    backgroundColor = hexToRgba(statusColors.newOder, opacity);
  } else if (status === orderStatus.SENT) {
    color = statusColors.sent;
    backgroundColor = hexToRgba(statusColors.sent, opacity);
  } else if (status === orderStatus.DELIVERED) {
    color = statusColors.delivered;
    backgroundColor = hexToRgba(statusColors.delivered, opacity);
  } else if (status === orderStatus.WAITING) {
    color = statusColors.waiting;
    backgroundColor = hexToRgba(statusColors.waiting, opacity);
  } else if (status === orderStatus.RETURNED) {
    color = statusColors.returned;
    backgroundColor = hexToRgba(statusColors.returned, opacity);
  } else {
    color = 'inherit';
  }

  return {
    color,
    backgroundColor,
  };
});

export const StyledLink = styled(Link)({
  textDecoration: 'underline',
});
