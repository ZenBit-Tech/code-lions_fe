import { Box, IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SocialMediaButtonProps extends IconButtonProps {
  href: string;
  target: string;
  rel: string;
}

export const SocialMediaButton = styled(IconButton)<SocialMediaButtonProps>(
  ({ theme }) => ({
    width: '36px',
    height: '36px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: theme.palette.text.disabled,
    },
  })
);

export const SocialMediaButtons = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'left',
  gap: 16,
}));
