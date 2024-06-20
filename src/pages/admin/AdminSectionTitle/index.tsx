import { useLocation } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import ArrowIcon from 'src/assets/icons/arrow-left.svg';

import StyledLink from './styles';

interface IAdminSectionTitle {
  title: string;
  fontWeight: number;
  showBackLink?: boolean;
}

function AdminSectionTitle({
  title,
  fontWeight,
  showBackLink = false,
}: IAdminSectionTitle) {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <Box display="flex" alignItems="center" mb="24px" gap="8px">
      {showBackLink && (
        <StyledLink to={backLinkHref}>
          <IconButton sx={{ padding: 0 }}>
            <ArrowIcon />
          </IconButton>
        </StyledLink>
      )}
      <Typography
        variant="h3"
        component="h1"
        fontWeight={fontWeight}
        lineHeight="1.25"
      >
        {title}
      </Typography>
    </Box>
  );
}

export default AdminSectionTitle;
