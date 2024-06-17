import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

import { TableBodyStyled, TableHeadStyled } from './styles';

function createData(
  name: string,
  email: string,
  address: string[],
  date: string,
  action: number
) {
  return { name, email, address, date, action };
}

const rows = [
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    1
  ),
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    1
  ),
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    1
  ),
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    1
  ),
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    1
  ),
];

function UsersTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadStyled>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHeadStyled>
        <TableBodyStyled>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="left">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.action}</TableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
