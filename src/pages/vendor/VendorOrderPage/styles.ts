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
  newOrderVendorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: '8px 0 24px 0',
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px 0 0 8px',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: theme.typography.fontSize,
      padding: '11.5px 16px',
    },
    '&:focus-visible': {
      border: `1px solid ${theme.palette.common.black}`,
    },
  },
  sendButton: {
    borderRadius: '0 8px 8px 0',
    padding: '12px 24px',
    backgroundColor: theme.palette.common.black,
    border: `1px solid ${theme.palette.common.black}`,
  },
  rejectButton: {
    marginLeft: '16px',
    borderRadius: '8px',
    padding: '12px 24px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
  },
  receivedWrapper: {
    newOrderVendorWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  },
  returnedWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '8px 0 24px 0',
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
