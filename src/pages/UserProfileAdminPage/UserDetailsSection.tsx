import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, IconButton, Typography } from '@mui/material';

import ArrowLeft from 'src/assets/icons/arrow-left.svg';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import DeleteTrash from 'src/assets/icons/delete-trash.svg';
import EditPencil from 'src/assets/icons/edit-pencil.svg';
import theme from 'src/theme';

import { StyledShape, StyledUserSection } from './styles';

interface IUserDetailsSectionProps {
  children?: ReactNode;
}

function UserDetailsSection(props: IUserDetailsSectionProps) {
  const { children } = props;

  const { t } = useTranslation();

  return (
    <StyledUserSection>
      <Box>
        <Box display="flex" alignItems="center">
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
        <Box
          display="flex"
          alignItems="center"
          sx={{ margin: '30px 0 24px 0' }}
        >
          <IconButton sx={{ marginTop: '3px' }}>
            <ArrowLeft />
          </IconButton>
          <Typography
            variant="h3"
            sx={{ fontWeight: '700', marginLeft: '3px' }}
          >
            {t('userProfileAdmin.buyers')}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '24px 24px 8px 24px',
            height: '356px',
          }}
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box display="flex" alignItems="center">
              <StyledShape />
              <Typography
                variant="subtitle1"
                sx={{ fontSize: '20px', marginLeft: '12px' }}
              >
                {t('userProfileAdmin.buyerName')}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" width="64px">
              <IconButton>
                <EditPencil />
              </IconButton>
              <IconButton>
                <DeleteTrash />
              </IconButton>
            </Box>
          </Box>
          {children}
        </Box>
      </Box>
    </StyledUserSection>
  );
}

export default UserDetailsSection;
