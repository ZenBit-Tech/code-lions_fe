import { styled } from '@mui/system';

const UnreadMessages = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  marginRight: '0.5rem',
  borderRadius: '50%',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9em',
}));

export default UnreadMessages;
