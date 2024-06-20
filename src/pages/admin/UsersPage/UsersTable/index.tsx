import { useTranslation } from 'react-i18next';

import { Table, TableContainer, TableRow, Typography } from '@mui/material';

import formatDateString from 'src/common/formatDateString';
import { IAdminUser } from 'src/redux/user/types';

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

interface IUsersTable {
  users: IAdminUser[];
  pagesCount: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  handleOpen: () => void;
}

function UsersTable({
  users,
  pagesCount,
  handleChange,
  handleOpen,
}: IUsersTable) {
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
              <BodyTableCell align="left">
                <Typography>{user.addressLine1 || ''}</Typography>
                <Typography>{user.addressLine2 || ''}</Typography>
                <Typography>{user.country}</Typography>
                <Typography>{user.state || ''}</Typography>
                <Typography>{user.city || ''}</Typography>
              </BodyTableCell>
              <BodyTableCell align="left">
                {formatDateString(user.createdAt)}
              </BodyTableCell>
              <BodyTableCell align="left">
                <ActionButtons userId={user.id} handleOpen={handleOpen} />
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
      <StyledPagination count={pagesCount} handleChange={handleChange} />
    </TableContainer>
  );
}

export default UsersTable;
