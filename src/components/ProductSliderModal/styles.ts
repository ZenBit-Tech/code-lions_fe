import theme from 'src/theme';

const style = {
  modalContentWrapper: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '90%',
    bgcolor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    '&:focus-visible': {
      outline: 'none',
    },
  },
  closeButton: {
    position: 'absolute' as const,
    top: '15px',
    right: '15px',
    padding: '3px',
  },
  slideWrapper: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    borderRadius: '12px',
  },
};

export default style;
