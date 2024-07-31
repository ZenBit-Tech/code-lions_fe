import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Avatar, Typography } from '@mui/material';

import mockAvatar from 'src/assets/photos/avatar.jpg';
import ProductCard from 'src/components/ProductCard';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import {
  useFollowVendorMutation,
  useGetBestVendorsQuery,
  useUnfollowVendorMutation,
} from 'src/redux/bestVendors/bestVendorsService';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/user/userSlice';

interface FollowStatus {
  [vendorId: string]: boolean;
}

function BestVendorsList() {
  const { t } = useTranslation();
  const { data: bestVendors } = useGetBestVendorsQuery();
  const [followVendor] = useFollowVendorMutation();
  const [unFollowVendor] = useUnfollowVendorMutation();
  const userId = useAppSelector(selectUserId);

  const [followStatus, setFollowStatus] = useState<FollowStatus>({});

  useEffect(() => {
    if (bestVendors) {
      const initialStatus = bestVendors.reduce((acc, vendor) => {
        acc[vendor.vendorId] = false;

        return acc;
      }, {} as FollowStatus);

      setFollowStatus(initialStatus);
    }
  }, [bestVendors]);

  const handleFollowVendor = async (vendorId: string) => {
    try {
      const response = await followVendor({
        body: { buyerId: userId, vendorId },
      }).unwrap();

      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [vendorId]: true,
      }));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFollowVendor = async (vendorId: string) => {
    try {
      const response = await unFollowVendor({
        body: { buyerId: userId, vendorId },
      }).unwrap();

      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [vendorId]: false,
      }));
      console.log(response);
    } catch (error) {
      console.log(error);
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
    <>
      <Box sx={{ mt: '40px', mb: '49px' }}>
        {bestVendors?.map(({ vendorId, vendorName, photoUrl, products }) => (
          <Box key={vendorId} component="div" sx={{ mt: '24px' }}>
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '36px',
              }}
            >
              <Box
                component="div"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '24px',
                }}
              >
                <Avatar alt="vendor-avatar" src={photoUrl || mockAvatar} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {vendorName}
                </Typography>
              </Box>
              <StyledButton
                type="button"
                styles={StyleVariants.BLACK}
                padding={PaddingVariants.LG}
                sx={{
                  width: '196px',
                }}
                onClick={() => {
                  toggleFollowStatus(vendorId);
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 400,
                    lineHeight: 'normal',
                    letterSpacing: 'normal',
                  }}
                >
                  {followStatus[vendorId]
                    ? 'Unfollow'
                    : t('vendorProfile.follow')}
                </Typography>
              </StyledButton>
            </Box>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              {products?.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 12px)',
                      lg: 'calc(25% - 18px)',
                    },
                  }}
                >
                  <ProductCard item={product} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default BestVendorsList;
