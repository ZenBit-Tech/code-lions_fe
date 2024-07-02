import { Avatar, Box, styled, Typography } from '@mui/material';

const SpacingNumberAvatar = 10;

export const CommentCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  marginBottom: '24px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.border.secondary}`,
  minHeight: '163px',
  width: '100%',
  backgroundColor: theme.palette.common.white,
}));

export const CommentContent = styled(Box)(() => ({
  flex: 1,
}));

export const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.typography.h3.fontSize,
  fontFamily: theme.typography.h5.fontFamily,
  letterSpacing: '-0.1px',
}));

export const CommentDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: '12px',
}));

export const RatingWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'top',
  marginLeft: 'auto',
  marginTop: '5px',
}));

export const RatingNumber = styled(Typography)(({ theme }) => ({
  marginLeft: '4px',
  paddingBottom: '6px',
  fontWeight: 'bold',
  color: theme.palette.grey[800],
  fontFamily: theme.typography.h3.fontFamily,
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(SpacingNumberAvatar),
  height: theme.spacing(SpacingNumberAvatar),
}));

export const CommentText = styled(Typography)(({ theme }) => ({
  marginTop: '8px',
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
}));
