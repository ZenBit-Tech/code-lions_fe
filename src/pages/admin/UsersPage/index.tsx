import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import SearchInput from 'src/components/shared/SearchInput';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import ModalPopup from '../ModalPopup';
import SortButton from '../SortButton';
import StyledBackdrop from '../StyledBackdrop';

import SectionWrapper from './styles';
import UsersTable from './UsersTable';

function UsersPage() {
  const { t } = useTranslation();

  const handleClick = () => console.log('Sort button clicked!');

  const [page, setPage] = useState(1);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <AdminSectionTitle title={t('usersAdmin.title')} fontWeight={600} />
      <SectionWrapper>
        <Box display="flex" justifyContent="space-between" width="100%">
          <AdminSectionSubTitle title={t('usersAdmin.subTitle')} />
          <SortButton
            title={t('usersAdmin.sortButton')}
            onClick={handleClick}
          />
        </Box>
        <SearchInput />
        <UsersTable
          page={page}
          handleChange={handleChange}
          handleOpen={handleOpen}
        />
      </SectionWrapper>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <ModalPopup onClose={handleClose} />
          </StyledBackdrop>,
          document.body
        )}
    </>
  );
}

export default UsersPage;
