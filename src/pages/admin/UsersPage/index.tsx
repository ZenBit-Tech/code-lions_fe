import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { sortOptions, urlRoles, userRoles } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import Loader from 'src/components/Loader';
import SearchInput from 'src/components/shared/SearchInput';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { NonAdminRole, SortOrder } from 'src/redux/user/types';
import { useGetAllUsersQuery } from 'src/redux/user/userService';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import SortButton from '../SortButton';

import SectionWrapper from './styles';
import UsersTable from './UsersTable';

function UsersPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const methods = useForm();

  const [page, setPage] = useState(1);
  const [role, setRole] = useState<NonAdminRole | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<SortOrder>(sortOptions.DESC);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handleClick = (value: SortOrder) => {
    setOrder(value);
  };

  const location = useLocation();

  useEffect(() => {
    const newRole =
      location.state?.role === userRoles.BUYER ||
      location.state?.role === userRoles.VENDOR
        ? location.state.role
        : undefined;

    if (newRole !== role) {
      setRole(newRole);
      setPage(1);
    }
  }, [location.state?.role, role]);

  const { data, isLoading, error } = useGetAllUsersQuery({
    page,
    order,
    role,
    search,
  });

  const users = data?.users || [];
  const pagesCount = data?.pagesCount || 1;

  const { handleOnSubmitError } = useErrorHandling();

  useEffect(() => {
    if (error) {
      handleOnSubmitError(error, showToast, t('usersAdmin.errorMessage'));
    }
  }, [error, handleOnSubmitError, showToast, t]);

  if (isLoading) {
    return <Loader />;
  }

  const getTitle = (path: string): string => {
    if (path.includes(urlRoles.vendors)) return t('userProfileAdmin.vendors');
    if (path.includes(urlRoles.buyers)) return t('userProfileAdmin.buyers');

    return t('userProfileAdmin.users');
  };

  return (
    <>
      <AdminSectionTitle title={getTitle(location.pathname)} fontWeight={600} />
      <SectionWrapper>
        <Box display="flex" justifyContent="space-between" width="100%">
          <AdminSectionSubTitle
            title={`${getTitle(location.pathname)} ${t('usersAdmin.subTitle')}`}
          />
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
        />
      </SectionWrapper>
    </>
  );
}

export default UsersPage;
