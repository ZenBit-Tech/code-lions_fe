import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Avatar, Typography } from '@mui/material';

import { urls } from 'src/common/constants';
import ProductCard from 'src/components/ProductCard';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useFollowVendorMutation,
  useGetBestVendorsQuery,
  useUnfollowVendorMutation,
} from 'src/redux/bestVendors/bestVendorsService';
import { IProductFilters } from 'src/redux/product/types';

interface FollowStatus {
  [vendorId: string]: boolean;
}

type BestVerdorsListProps = {
  filters: IProductFilters;
};

function BestVendorsList({ filters }: BestVerdorsListProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { data: bestVendors } = useGetBestVendorsQuery(filters);
  const [followVendor] = useFollowVendorMutation();
  const [unFollowVendor] = useUnfollowVendorMutation();

  const [followStatus, setFollowStatus] = useState<FollowStatus>(() => {
    const storedStatus = localStorage.getItem('followStatus');

    return storedStatus ? JSON.parse(storedStatus) : {};
  });

  useEffect(() => {
    if (bestVendors) {
      setFollowStatus((prevStatus) => {
        const updatedStatus = bestVendors.reduce((acc, vendor) => {
          acc[vendor.vendorId] = prevStatus[vendor.vendorId] ?? false;

          return acc;
        }, {} as FollowStatus);

        return updatedStatus;
      });
    }
  }, [bestVendors]);

  useEffect(() => {
    localStorage.setItem('followStatus', JSON.stringify(followStatus));
  }, [followStatus]);

  const handleFollowVendor = async (vendorId: string) => {
    try {
      await followVendor({
        body: { vendorId },
      }).unwrap();

      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [vendorId]: true,
      }));
    } catch (error) {
      showToast('error', t('bestVendors.followFailed'));
    }
  };

  const handleUnFollowVendor = async (vendorId: string) => {
    try {
      await unFollowVendor({
        body: { vendorId },
      }).unwrap();

      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [vendorId]: false,
      }));
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
    <>
      <Box sx={{ mt: '40px', mb: '49px' }}>
        {!bestVendors?.length && <Box>{t('products.noProducts')}</Box>}
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
                <Avatar alt="vendor-avatar" src={photoUrl} />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  <Link to={`${urls.VENDOR}/${vendorId}`}>{vendorName}</Link>
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
                    ? t('bestVendors.unfollow')
                    : t('bestVendors.follow')}
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
