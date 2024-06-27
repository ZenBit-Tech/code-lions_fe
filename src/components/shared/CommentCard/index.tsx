import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { format } from 'date-fns';
import StarIcon from 'src/assets/icons/profile/star.svg';
import { pathToServer } from 'src/common/constants';
import { IReview } from 'src/redux/user/types';

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

const numberOfWordsInSentence = 12;

interface CommentCardProps {
  comment: IReview;
}

function CommentCard({ comment }: CommentCardProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleReadMore();
    }
  };

  const renderContent = () => {
    const words = comment.text.split(' ');

    if (words.length <= numberOfWordsInSentence || isExpanded) {
      return comment.text;
    } else {
      return `${words.slice(0, numberOfWordsInSentence).join(' ')}... `;
    }
  };

  return (
    <CommentCardWrapper>
      <CommentContent>
        <Box
          width="100%"
          display="flex"
          alignItems="top"
          justifyContent="space-between"
        >
          <ProfileAvatar
            src={`${pathToServer}${comment.reviewerAvatar.slice(1)}`}
            alt={comment.reviewerName}
          />
          <Box marginLeft="16px">
            <AuthorName variant="subtitle1">{comment.reviewerName}</AuthorName>
            <CommentDate variant="body2">
              {format(new Date(comment.createdAt), 'PP')}
            </CommentDate>
          </Box>
          <RatingWrapper>
            <StarIcon />
            <RatingNumber>{comment.rating}</RatingNumber>
          </RatingWrapper>
        </Box>
        <CommentText variant="body2" sx={{ marginTop: '8px' }}>
          {renderContent()}
          {comment.text.split(' ').length > numberOfWordsInSentence && (
            <span
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={toggleReadMore}
              onKeyDown={handleKeyDown}
            >
              {isExpanded
                ? t('vendorProfile.readLess')
                : t('vendorProfile.readMore')}
            </span>
          )}
        </CommentText>
      </CommentContent>
    </CommentCardWrapper>
  );
}

export default CommentCard;
