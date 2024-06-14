import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';

const URL = 'url';

interface IBackgroundImageProps extends BoxProps {
  url: string;
}

const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== URL,
})<IBackgroundImageProps>(({ theme, url }) => ({
  display: 'none',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default BackgroundImage;
