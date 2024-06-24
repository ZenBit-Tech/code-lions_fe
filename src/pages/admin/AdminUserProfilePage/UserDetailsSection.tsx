import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, Link } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import DeleteTrash from 'src/assets/icons/delete-trash.svg';
import EditPencil from 'src/assets/icons/edit-pencil.svg';
import { linkUrls, urlRoles } from 'src/common/constants';
import { useGetUserByIdQuery } from 'src/redux/user/userService';
import theme from 'src/theme';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import ModalPopup from '../ModalPopup';
import StyledBackdrop from '../StyledBackdrop';

interface IUserDetailsSectionProps {
  children?: ReactNode;
  sectionHeight: string;
}

function UserDetailsSection(props: IUserDetailsSectionProps) {
  const { children, sectionHeight } = props;

  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  const { data } = useGetUserByIdQuery(userId ? { userId } : skipToken);

  if (!data) return null;

  const { name } = data;

  const basePath = location.pathname.replace(`/${userId}`, '');

  const editUrl = `${basePath}/${linkUrls.ADMIN_USER_PROFILE_EDIT}/${userId}`;

  const getTitle = (path: string) => {
    if (path.includes(urlRoles.vendors)) return t('userProfileAdmin.vendors');
    if (path.includes(urlRoles.buyers)) return t('userProfileAdmin.buyers');

    return t('userProfileAdmin.users');
  };

  const isEditPage = location.pathname.includes(
    linkUrls.ADMIN_USER_PROFILE_EDIT
  );

  return (
    <Box>
      <Box display="flex" alignItems="center" mb="24px">
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.disabled, marginRight: '5px' }}
        >
          {t('userProfileAdmin.admin')}
        </Typography>
        <ChevronRight />
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.text.disabled,
            margin: '0 5px',
            fontSize: '13px',
          }}
        >
          {`${name} ${t('userProfileAdmin.profile')}`}
        </Typography>
      </Box>
      <AdminSectionTitle
        title={getTitle(location.pathname)}
        fontWeight={700}
        showBackLink
      />
      <Box
        sx={{
          backgroundColor: theme.palette.common.white,
          borderRadius: '10px',
          padding: '24px 24px 8px 24px',
          height: sectionHeight,
        }}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <AdminSectionSubTitle
            title={`${name} ${t('userProfileAdmin.profile')}`}
          />
          <Box display="flex" justifyContent="space-between" width="64px">
            {!isEditPage && (
              <Link to={editUrl} state={{ from: location }}>
                <IconButton sx={{ padding: 0 }}>
                  <EditPencil />
                </IconButton>
              </Link>
            )}
            <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
              <DeleteTrash />
            </IconButton>
            {showModal &&
              createPortal(
                <StyledBackdrop showModal={showModal}>
                  <ModalPopup onClose={handleClose} userId={userId} />
                </StyledBackdrop>,
                document.body
              )}
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default UserDetailsSection;
