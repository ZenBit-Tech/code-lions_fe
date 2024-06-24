import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import DeleteTrash from 'src/assets/icons/delete-trash.svg';
import EditPencil from 'src/assets/icons/edit-pencil.svg';
import theme from 'src/theme';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';
import ModalPopup from '../ModalPopup';
import StyledBackdrop from '../StyledBackdrop';

import useUserDetails from './hooks/useUserDetails';

interface IUserDetailsSectionProps {
  children?: ReactNode;
  sectionHeight: string;
}

function UserDetailsSection(props: IUserDetailsSectionProps) {
  const { children, sectionHeight } = props;

  const {
    userId,
    data,
    showModal,
    handleOpen,
    handleClose,
    getTitle,
    editUrl,
    isEditPage,
    name,
    t,
    location,
  } = useUserDetails();

  if (!data) return null;

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
