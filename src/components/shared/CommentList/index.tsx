import { Box } from '@mui/material';

import { IReview } from 'redux/user/types';

import CommentCard from '../CommentCard';

interface Comments {
  comments: IReview[];
  path: string;
}
function CommentList({ comments, path }: Comments) {
  return (
    <Box sx={{ maxWidth: '1100px', marginBottom: '236px' }}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} path={path} />
      ))}
    </Box>
  );
}

export default CommentList;
