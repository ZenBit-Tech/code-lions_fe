import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const Backdrop = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[400],
  zIndex: 1200,
}));

export const Modal = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: ' 50%',
  left: '50%',
  maxHheight: '90vh',
  minWidth: '472px',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  padding: '24px',
  borderRadius: '8px',
  backgroundColor: theme.palette.common.white,
}));

export const StyledCloseBtn = styled('button')(({ theme }) => ({
  display: 'block',
  cursor: 'pointer',
  padding: 0,
  border: 'none',
  marginLeft: 'auto',
  marginBottom: '40px',
  width: '24px',
  height: '24px',
  background: 'none',

  svg: {
    width: '100%',
    height: '100%',
    stroke: theme.palette.common.grey,
    transition: 'stroke 0.3ms',
  },

  '&:hover svg, &:focus svg': {
    stroke: theme.palette.common.black,
  },
}));

export const ModalTitle = styled(Typography)(({ theme }) => ({
  marginTop: '24px',
  marginBottom: '12px',
  width: '428px',
  color: theme.palette.text.primary,
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: 1.22,
  letterSpacing: '-0.36px',
  textAlign: 'center',
}));

export const ModalSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: '40px',
  width: '428px',
  color: theme.palette.grey[500],
  textAlign: 'center',
}));
