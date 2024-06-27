import { useLocation } from 'react-router-dom';

import { IconButton } from '@mui/material';

import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import NotificationIcon from 'src/assets/icons/profile/notification.svg';
import Title from 'src/components/shared/Title';

import { IconButtonStyled, StyledLink, TitleWrapper } from './styles';

interface ISectionTitle {
  title: string;
  greyBackground?: boolean;
  showBackLink?: boolean;
  showNotification?: boolean;
  mt?: string;
  ml?: string;
}

function SectionTitle({
  title,
  greyBackground = false,
  showBackLink = false,
  showNotification = false,
  mt,
  ml,
}: ISectionTitle) {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <TitleWrapper greyBackground={greyBackground} mt={mt} ml={ml}>
      {showBackLink && (
        <StyledLink to={backLinkHref}>
          <IconButton sx={{ padding: 0 }}>
            <ArrowIcon />
          </IconButton>
        </StyledLink>
      )}
      <Title variant="h5" component="h1">
        {title}
      </Title>
      {showNotification && (
        <IconButtonStyled>
          <NotificationIcon />
        </IconButtonStyled>
      )}
    </TitleWrapper>
  );
}

export default SectionTitle;
