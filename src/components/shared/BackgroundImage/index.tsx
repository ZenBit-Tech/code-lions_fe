import { styled } from '@mui/system';
import { Box, BoxProps } from '@mui/material';

const URL = 'url';
interface BackgroundImageProps extends BoxProps {
  url: string;
}

const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== URL,
})<BackgroundImageProps>(({ theme, url }) => ({
  display: 'none',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '842px',
    height: '100vh',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default BackgroundImage;
