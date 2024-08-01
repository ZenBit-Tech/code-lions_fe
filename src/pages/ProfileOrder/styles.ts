import { Link } from 'react-router-dom';

import { styled } from '@mui/system';

import theme from 'src/theme';

const styles = {
  link: {
    color: theme.palette.text.disabled,
    margin: '0 5px',
    fontSize: '13px',
  },
  mainSectionWrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    padding: '24px',
  },
  statusWrapper: {
    borderRadius: '20px',
    padding: '4px 16px',
    backgroundColor: theme.palette.error.light,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 24px 0',
  },
  rejectButton: {
    borderRadius: '8px',
    padding: '12px 24px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
  },
  orderSummaryWrapper: {
    borderRadius: '8px',
    padding: '12px 24px',
    backgroundColor: theme.palette.background.paper,
  },
  chatButton: {
    width: '180px',
    borderRadius: '8px',
    padding: '8px 24px',
    backgroundColor: theme.palette.common.black,
    marginTop: '12px',
  },
};

export default styles;

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  padding: '3px',
});
