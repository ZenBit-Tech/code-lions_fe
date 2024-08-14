import { useTranslation } from 'react-i18next';

import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import NotificationIcon from 'src/assets/icons/profile/notification.svg';
import StarIcon from 'src/assets/icons/profile/star.svg';
import Container from 'src/components/shared/Container';
import SimpleSection from 'src/components/shared/SimpleSection';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useFollowVendorMutation,
  useUnfollowVendorMutation,
} from 'src/redux/bestVendors/bestVendorsService';
import { updateFollowStatus } from 'src/redux/bestVendors/bestVendorsSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme.tsx';

import {
  IconButtonStyled,
  NameTitle,
  TitleWrapper,
  FollowButtonWrapper,
  RatingNumber,
} from './styles';

interface ProfileInfoProps {
  name: string;
  rating: number;
  avatar: string;
  id: string;
}

function ProfileInfo({ name, rating, avatar, id }: ProfileInfoProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [followVendor] = useFollowVendorMutation();
  const [unFollowVendor] = useUnfollowVendorMutation();
  const followStatus = useAppSelector(
    (state) => state.bestVendors.followStatus
  );

  const handleFollowVendor = async (vendorId: string) => {
    try {
      await followVendor({
        body: { vendorId },
      }).unwrap();

      dispatch(updateFollowStatus({ vendorId, status: true }));
    } catch (error) {
      showToast('error', t('bestVendors.followFailed'));
    }
  };

  const handleUnFollowVendor = async (vendorId: string) => {
    try {
      await unFollowVendor({
        body: { vendorId },
      }).unwrap();

      dispatch(updateFollowStatus({ vendorId, status: false }));
    } catch (error) {
      showToast('error', t('bestVendors.unfollowFailed'));
    }
  };

  const toggleFollowStatus = (vendorId: string) => {
    if (followStatus[vendorId]) {
      handleUnFollowVendor(vendorId);
    } else {
      handleFollowVendor(vendorId);
    }
  };

  return (
    <SimpleSection>
      <Container>
        <TitleWrapper>
          <IconButtonStyled theme={theme}>
            <NotificationIcon />
          </IconButtonStyled>
        </TitleWrapper>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="12px"
          mt="16px"
          mb="20px"
        >
          <Avatar src={avatar} sx={{ width: '120px', height: '120px' }} />
          <NameTitle variant="subtitle1" theme={theme}>
            {name}
          </NameTitle>
          <Box display="flex" alignItems="center" marginBottom="20px">
            <StarIcon />
            <RatingNumber theme={theme}>{rating}</RatingNumber>
          </Box>
        </Box>
        <FollowButtonWrapper theme={theme}>
          <StyledButton
            type="button"
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.LG}
            sx={{
              width: '196px',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                lineHeight: 'normal',
                letterSpacing: 'normal',
              }}
              onClick={() => {
                toggleFollowStatus(id);
              }}
            >
              {followStatus[id]
                ? t('bestVendors.unfollow')
                : t('bestVendors.follow')}
            </Typography>
          </StyledButton>
        </FollowButtonWrapper>
      </Container>
    </SimpleSection>
  );
}

export default ProfileInfo;
