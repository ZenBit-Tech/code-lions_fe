import { useTranslation } from 'react-i18next';

import { Table, TableContainer, TableRow, Typography } from '@mui/material';

import ActionButtons from '../../ActionButtons';
import StyledPagination from '../../StyledPagination';

import {
  BodyTableCell,
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
} from './styles';

export type userRoles = 'BUYER' | 'VENDOR';

function createData(
  name: string,
  email: string,
  address: string[],
  date: string,
  id: string,
  role: userRoles
) {
  return { name, email, address, date, id, role };
}

const users = [
  createData(
    'User1',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User1',
    'BUYER'
  ),
  createData(
    'User2',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User2',
    'BUYER'
  ),
  createData(
    'User3',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User3',
    'VENDOR'
  ),
  createData(
    'User4',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User4',
    'VENDOR'
  ),
  createData(
    'User5',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User5',
    'BUYER'
  ),
  createData(
    'User6',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User6',
    'BUYER'
  ),
  createData(
    'User7',
    'user1@mergeAlias.com',
    ['2972 Westheimer Rd.', 'Santa Ana', 'Illinois', '85486'],
    'May 6, 2023',
    'User7',
    'BUYER'
  ),
];

interface IUsersTable {
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleOpen: () => void;
}

function UsersTable({ page, handleChange, handleOpen }: IUsersTable) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadStyled>
          <TableRowStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('usersAdmin.name')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('usersAdmin.email')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('usersAdmin.address')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('usersAdmin.date')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('usersAdmin.action')}
              </Typography>
            </TableCellStyled>
          </TableRowStyled>
        </TableHeadStyled>
        <TableBodyStyled>
          {users.map((user) => (
            <TableRow key={user.id}>
              <BodyTableCell component="th" scope="row" align="left">
                {user.name}
              </BodyTableCell>
              <BodyTableCell align="left">{user.email}</BodyTableCell>
              <BodyTableCell align="left">{user.address}</BodyTableCell>
              <BodyTableCell align="left">{user.date}</BodyTableCell>
              <BodyTableCell align="left">
                <ActionButtons
                  id={user.id}
                  role={user.role}
                  handleOpen={handleOpen}
                />
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
      <StyledPagination count={10} page={page} handleChange={handleChange} />
    </TableContainer>
  );
}

export default UsersTable;
