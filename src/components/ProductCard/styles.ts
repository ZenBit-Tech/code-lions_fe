import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

export const ModalTitle = styled(Typography)({
  color: theme.palette.text.primary,
  fontSize: '36px',
  fontWeight: theme.typography.bold.fontWeight,
  lineHeight: 1.22,
  letterSpacing: '-0.36px',
  textAlign: 'center',
});

export const Popup = styled(Box)({
  backgroundColor: theme.palette.background.default,
  padding: '24px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.modal,
  width: '60%',
  maxHeight: '90%',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.text.disabled,
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
    borderRadius: '8px',
  },
});

const style = {
  card: {
    position: 'relative',
    width: '100%',
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: '12px',
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.common.white,
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
      boxShadow: theme.shadows[3],
    },
  },
  imgContainer: {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingTop: '100%',
  },

  imgLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  imgWrapper: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    border: `1px solid ${theme.palette.border.secondary}`,
    backgroundColor: theme.palette.grey[300],
    cursor: 'pointer',
  },
  heartIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    padding: '3px',
    transition: 'all 0.3s ease',
  },
  productInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90px',
    margin: '15px 0 0',
    position: 'relative',
    padding: '8px',
    justifyContent: 'flex-start',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bagIconWrapper: {
    display: 'flex',
    transition: 'all 0.3s ease',
    '&:hover': {
      scale: '1.1',
    },
  },
};

export default style;
