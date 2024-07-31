import { Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ChatsContainer = styled('div')({
  width: '22rem',
  height: '90%',
  paddingRight: '1rem',
});

const ChatItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.7rem',
  border: `1px solid ${theme.palette.border.grey}`,
  borderRadius: '1rem',
  cursor: 'pointer',
  marginBottom: '1rem',
}));

const StyledAvatar = styled(Avatar)({
  marginRight: '1rem',
  height: '4rem',
  width: '4rem',
});

const ChatDetails = styled('div')({
  flex: 1,
});

const ChatHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.4rem',
});

const FullName = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle1,
  fontWeight: 500,
  lineHeight: '24px',
  fontSize: 16,
  marginRight: '1rem',
}));

const LastMessageDate = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle2,
}));

const LastMessage = styled('div')(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.grey[600],
}));

const UnreadMessages = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  borderRadius: '50%',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9em',
}));

const ScrollableBox = styled(Box)({
  width: '105%',
  marginTop: '1rem',
  maxHeight: '100%',
  overflowY: 'auto',
  paddingRight: '1rem',
});

const ScrollableMessageBox = styled(Box)({
  marginTop: '1rem',
  maxHeight: '100%',
  overflowY: 'auto',
  paddingRight: '1rem',
});

const ChatMessagesContainer = styled(Box)({
  maxWidth: '100%',
  minWidth: '64%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '0.6rem',
  padding: '1rem',
}));

const AvatarMessageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
}));

const StyledMessageAvatar = styled(Avatar)({
  marginRight: '0.5rem',
  height: '1.5rem',
  width: '1.5rem',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  fontSize: '18px',
  fontWeight: theme.typography.bold.fontWeight,
}));

const OwnMessage = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  textAlign: 'right',
}));

const OwnMessageBody = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  padding: '0.5rem',
  borderRadius: '1rem',
  borderBottomRightRadius: '0',
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

const SenderMessage = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
}));

const SenderMessageBody = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  padding: '0.5rem',
  borderRadius: '1rem',
  borderBottomLeftRadius: '0',
  backgroundColor: theme.palette.border.secondary,
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

const Typing = styled(Box)(({ theme }) => ({
  borderRadius: '0.8rem',
  borderBottomLeftRadius: '0',
  padding: '0.1rem 0.5rem',
  backgroundColor: theme.palette.border.secondary,
  marginBottom: '0.5rem',
}));

const ChatWithTextBox = styled(Box)({
  height: '85%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

export {
  UnreadMessages,
  LastMessageDate,
  LastMessage,
  StyledAvatar,
  ChatDetails,
  ChatsContainer,
  ChatHeader,
  ChatItem,
  FullName,
  ScrollableBox,
  ChatMessagesContainer,
  AvatarContainer,
  StyledTypography,
  OwnMessage,
  SenderMessage,
  OwnMessageBody,
  SenderMessageBody,
  AvatarMessageContainer,
  StyledMessageAvatar,
  ScrollableMessageBox,
  ChatWithTextBox,
  Typing,
};
