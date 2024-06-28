import { Box } from '@mui/material';

import { IReview } from 'redux/user/types';

import CommentCard from '../CommentCard';

interface Comments {
  comments: IReview[];
}
function CommentList({ comments }: Comments) {
  return (
    <Box sx={{ maxWidth: '1000px', marginBottom: '236px' }}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}

export default CommentList;
