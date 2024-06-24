import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import DeleteTrash from 'src/assets/icons/delete-trash.svg';
import EditPencil from 'src/assets/icons/edit-pencil.svg';
import { useDeleteUserByAdminMutation } from 'src/redux/user/userService';
import theme from 'src/theme';

import AdminSectionSubTitle from '../AdminSectionSubTitle';
import AdminSectionTitle from '../AdminSectionTitle';

interface IUserDetailsSectionProps {
  children?: ReactNode;
  sectionHeight: string;
}

const previousPage: number = -1;

function UserDetailsSection(props: IUserDetailsSectionProps) {
  const { children, sectionHeight } = props;
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();

  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

  const handleDeleteUser = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteUserByAdmin({ userId: id });
        navigate(previousPage);
      }

      return null;
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb="24px">
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.disabled, marginRight: '5px' }}
        >
          {t('userProfileAdmin.superadmin')}
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
          {t('userProfileAdmin.profile')}
        </Typography>
      </Box>
      <AdminSectionTitle
        title={t('userProfileAdmin.buyers')}
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
          <AdminSectionSubTitle title={t('userProfileAdmin.buyerName')} />
          <Box display="flex" justifyContent="space-between" width="64px">
            <IconButton>
              <EditPencil />
            </IconButton>
            <IconButton onClick={() => handleDeleteUser(userId)}>
              <DeleteTrash />
            </IconButton>
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default UserDetailsSection;
