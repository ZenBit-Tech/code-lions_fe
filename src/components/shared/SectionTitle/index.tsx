import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import Title from 'src/components/shared/Title';
import { StyledLink, TitleWrapper } from './styles';

interface ISectionTitle {
  title: string;
  greyBackground?: boolean;
  showBackLink?: boolean;
  mt?: string;
}

function SectionTitle({
  title,
  greyBackground = false,
  showBackLink = false,
  mt,
}: ISectionTitle) {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <TitleWrapper greyBackground={greyBackground} mt={mt}>
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
    </TitleWrapper>
  );
}

export default SectionTitle;
