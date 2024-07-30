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
  useGetBestVendorsQuery,
  useUpdateFollowStatusMutation,
} from 'src/redux/bestVendors/bestVendorsService';

function BestVendorsList() {
  const { t } = useTranslation();
  const { data: bestVendors } = useGetBestVendorsQuery();
  const [updateFollowStatus] = useUpdateFollowStatusMutation();

  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (bestVendors) {
      const initialStatus = bestVendors.reduce(
        (acc, vendor) => {
          acc[vendor.vendorId] = vendor.isFollowed || false;

          return acc;
        },
        {} as Record<string, boolean>
      );

      setFollowStatus(initialStatus);
    }
  }, [bestVendors]);

  const handleUpdateFollowStatus = async (vendorId: string) => {
    try {
      const currentStatus = followStatus[vendorId];
      const response = await updateFollowStatus({
        id: vendorId,
        body: { isFollowed: !currentStatus },
      }).unwrap();

      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [vendorId]: response.isFollowed,
      }));
    } catch (error) {
      console.log(error);
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
                  handleUpdateFollowStatus(vendorId);
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
