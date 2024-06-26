import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Table,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import formatDateString from 'src/common/formatDateString';
import { IAdminUser } from 'src/redux/user/types';

import ActionButtons from '../../ActionButtons';
import ModalPopup from '../../ModalPopup';
import StyledBackdrop from '../../StyledBackdrop';
import StyledPagination from '../../StyledPagination';

import {
  BodyTableCell,
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
} from './styles';

interface IUsersTable {
  users: IAdminUser[];
  pagesCount: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function UsersTable({ users, pagesCount, page, handleChange }: IUsersTable) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const handleOpen = (userId: string) => {
    setShowModal(true);
    setSelectedUser(userId);
  };
  const handleClose = () => setShowModal(false);

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
                <Box display="flex" gap="4px">
                  <Typography>{user.addressLine1 || ''}</Typography>
                  <Typography>{user.addressLine2 || ''}</Typography>
                </Box>
                <Box display="flex" gap="4px">
                  <Typography>{user.state || ''}</Typography>
                  <Typography>{user.city || ''}</Typography>
                </Box>
                <Typography>{user.country}</Typography>
              </BodyTableCell>
              <BodyTableCell align="left">
                {formatDateString(user.createdAt)}
              </BodyTableCell>
              <BodyTableCell align="left">
                <ActionButtons
                  userId={user.id}
                  handleOpen={() => handleOpen(user.id)}
                />
              </BodyTableCell>
              {showModal &&
                user.id === selectedUser &&
                createPortal(
                  <StyledBackdrop showModal={showModal}>
                    <ModalPopup onClose={handleClose} userId={user.id} />
                  </StyledBackdrop>,
                  document.body
                )}
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
      <StyledPagination
        count={pagesCount}
        page={page}
        handleChange={handleChange}
      />
    </TableContainer>
  );
}

export default UsersTable;
