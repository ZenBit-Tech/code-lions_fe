import { Box } from '@mui/material';

import { IGetUserReviewsResponse } from 'redux/user/types';

import CommentCard from '../CommentCard';

interface Comments {
  comments: IGetUserReviewsResponse;
}
function CommentList({ comments }: Comments) {
  return (
    <Box sx={{ maxWidth: '1000px', marginBottom: '236px' }}>
      {comments.reviews.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}

export default CommentList;
