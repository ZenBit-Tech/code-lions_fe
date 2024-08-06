import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Box, IconButton, Modal, TextField, Typography } from '@mui/material';

import CloseIcon from 'src/assets/icons/close.svg';
import FilledStarIcon from 'src/assets/icons/filled-star.svg';
import StarIcon from 'src/assets/icons/star.svg';
import UnfilledStarIcon from 'src/assets/icons/unfilled-star.svg';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useSendReviewMutation } from 'src/redux/user/userService';
import theme from 'src/theme';

import StyledButton from '../StyledButton';
import { PaddingVariants, StyleVariants } from '../StyledButton/types';

import {
  StyledBigIconWrapper,
  StyledModalContainer,
  StyledSmallIconWrapper,
} from './styles';

type ReviewModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  userId: string;
  reviewerId: string;
  orderId: number;
};

const stars = 5;
const reviewLimit = 500;

function ReviewModal({
  isModalOpen,
  onClose,
  userId,
  reviewerId,
  orderId,
}: ReviewModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reviewText: '',
      selectedStars: 0,
    },
  });
  const [sendReview] = useSendReviewMutation();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const selectedStars = watch('selectedStars');

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  const onSubmit = async (data: {
    reviewText: string;
    selectedStars: number;
  }) => {
    const review = {
      text: data.reviewText,
      rating: data.selectedStars,
      userId,
      orderId,
      reviewerId,
    };

    try {
      await sendReview(review).unwrap();
      showToast('success', 'Review is added');
      onClose();
    } catch (error) {
      showToast('error', 'Something went wrong');
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        <Box display="flex" alignSelf="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledBigIconWrapper>
          <StyledSmallIconWrapper>
            <StarIcon />
          </StyledSmallIconWrapper>
        </StyledBigIconWrapper>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="12px"
        >
          <Typography variant="subtitle1" fontSize={36} fontWeight={700}>
            {t('reviewModal.reviewOrder')} #{orderId}
          </Typography>
          <Typography color={theme.palette.grey[500]}>
            {t('reviewModal.subtitle')}
          </Typography>
        </Box>
        <Box display="flex">
          {[...Array(stars)].map((_, index) => (
            <Controller
              key={index}
              name="selectedStars"
              control={control}
              render={({ field }) => (
                <IconButton onClick={() => field.onChange(index + 1)}>
                  {index < selectedStars ? (
                    <FilledStarIcon />
                  ) : (
                    <UnfilledStarIcon />
                  )}
                </IconButton>
              )}
            />
          ))}
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" gutterBottom>
            {t('reviewModal.writeReview')}
          </Typography>
          <Controller
            name="reviewText"
            control={control}
            rules={{
              maxLength: {
                value: reviewLimit,
                message: `Review text cannot exceed ${reviewLimit} characters`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                multiline
                rows={4}
                placeholder={t('reviewModal.placeholder')}
                sx={{ width: '424px' }}
                error={!!errors.reviewText}
                helperText={errors.reviewText ? errors.reviewText.message : ''}
              />
            )}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt="16px">
          <StyledButton
            styles={StyleVariants.TRANSPARENT}
            padding={PaddingVariants.LG}
            onClick={onClose}
            sx={{ border: 'none' }}
          >
            {t('reviewModal.cancel')}
          </StyledButton>
          <StyledButton
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.LG}
            onClick={handleSubmit(onSubmit)}
            disabled={selectedStars === 0}
          >
            {t('reviewModal.sendReview')}
          </StyledButton>
        </Box>
      </StyledModalContainer>
    </Modal>
  );
}

export default ReviewModal;
