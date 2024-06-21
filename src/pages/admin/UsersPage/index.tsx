import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { sortOptions } from 'src/common/constants';
import SearchInput from 'src/components/shared/SearchInput';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { SortOrder } from 'src/redux/user/types';
import { useGetAllUsersQuery } from 'src/redux/user/userService';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import ModalPopup from '../ModalPopup';
import SortButton from '../SortButton';
import StyledBackdrop from '../StyledBackdrop';

import SectionWrapper from './styles';
import UsersTable from './UsersTable';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error != null && 'message' in error;
}

function UsersPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const methods = useForm();

  const [page, setPage] = useState(1);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [search, setSearch] = useState('');
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const [order, setOrder] = useState<SortOrder>(sortOptions.DESC);
  const handleClick = (value: SortOrder) => {
    setOrder(value);
  };

  const location = useLocation();

  let role;

  if (location && location.state) {
    role = location.state.role || undefined;
  }

  const { data, isLoading, error } = useGetAllUsersQuery({
    page,
    order,
    role,
    search,
  });

  const users = data?.users || [];
  const pagesCount = data?.pagesCount || 1;

  useEffect(() => {
    const getErrorMessage = (
      queryError: FetchBaseQueryError | SerializedError
    ): string => {
      if (
        'data' in queryError &&
        queryError.data &&
        (queryError.data as { message?: string }).message
      ) {
        return (queryError.data as { message: string }).message;
      }

      return t('usersAdmin.errorMessage');
    };

    if (error) {
      if (isFetchBaseQueryError(error) || isSerializedError(error)) {
        showToast('error', getErrorMessage(error));
      } else {
        showToast('error', t('usersAdmin.errorMessage'));
      }
    }
  }, [error, showToast, t]);

  if (isLoading) {
    return <CircularProgress />;
  }

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
        <FormProvider {...methods}>
          <SearchInput setSearch={handleSearchChange} />
        </FormProvider>
        <UsersTable
          pagesCount={pagesCount}
          page={page}
          users={users}
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
