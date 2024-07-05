import { Box } from '@mui/material';

import CommentCard from '../CommentCard';

interface Comment {
  id: string;
  author: string;
  date: string;
  avatarUrl: string;
  rating: number;
  content: string;
}

const comments: Comment[] = [
  {
    id: '1',
    author: 'Anna Asol',
    date: 'Sep 12, 2023',
    avatarUrl: 'src/assets/photos/avatar.jpg',
    rating: 4.9,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor.',
  },
  {
    id: '2',
    author: 'Anna Asol',
    date: 'Sep 12, 2023',
    avatarUrl: 'src/assets/photos/avatar.jpg',
    rating: 4.9,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt pharetra. Mauris id eleifend tortor.',
  },
];

function CommentList() {
  return (
    <Box sx={{ maxWidth: '1000px', marginBottom: '236px' }}>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}

export default CommentList;
