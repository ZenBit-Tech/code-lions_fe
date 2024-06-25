import { Box } from '@mui/material';

import StarIcon from 'src/assets/icons/profile/star.svg';

import {
  CommentCardWrapper,
  CommentContent,
  ProfileAvatar,
  AuthorName,
  RatingNumber,
  CommentDate,
  RatingWrapper,
  CommentText,
} from './styles';

interface Comment {
  id: string;
  author: string;
  date: string;
  avatarUrl: string;
  rating: number;
  content: string;
}

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <CommentCardWrapper>
      <CommentContent>
        <Box
          width="100%"
          display="flex"
          alignItems="top"
          justifyContent="space-between"
        >
          <ProfileAvatar src={comment.avatarUrl} alt={comment.author} />
          <Box marginLeft="16px">
            <AuthorName variant="subtitle1">{comment.author}</AuthorName>
            <CommentDate variant="body2">{comment.date}</CommentDate>
          </Box>
          <RatingWrapper>
            <StarIcon />
            <RatingNumber>{comment.rating}</RatingNumber>
          </RatingWrapper>
        </Box>
        <CommentText variant="body2" sx={{ marginTop: '8px' }}>
          {comment.content}
        </CommentText>
      </CommentContent>
    </CommentCardWrapper>
  );
}

export default CommentCard;
