import theme from 'src/theme';

const style = {
  cardWrapper: {
    width: '189px',
    height: '263px',
    borderRadius: '12px',
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.common.white,
    overflow: 'hidden',
    position: 'relative',
  },
  imgWrapper: {
    width: '100%',
    height: '180px',
    objectFit: 'fill',
    border: `1px solid ${theme.palette.border.secondary}`,
    backgroundColor: theme.palette.grey[300],
  },
  heartIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    padding: '3px',
  },
  productInfoWrapper: {
    padding: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bagIconWrapper: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5px',
  },
};

export default style;
