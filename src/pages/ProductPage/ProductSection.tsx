import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  Button,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Link,
} from '@mui/material';

import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import ChatDots from 'src/assets/icons/chat-dots.svg';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import Heart from 'src/assets/icons/heart.svg';
import { urls } from 'src/common/constants';
import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { ICartItem } from 'src/redux/cart/types';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { selectUserId } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import RadioLabel from './RadioLabel';
import { StyledInput, StyledFormControlLabel } from './styles';

const durations = [
  { duration: 7, price: 0 },
  { duration: 14, price: 0 },
];

const weeksCount: number = 2;
const stringLimit: number = 30;

interface ProductSectionProps {
  product: IProduct;
}

function ProductSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const userId = useSelector(selectUserId);

  const [selectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>(durations[0]?.duration.toString());

  durations[0].price = product.price;
  durations[1].price = product.price * weeksCount;

  const cartData = useAppSelector((state) => state.cart);

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const isProductInCart = cartData?.some(
    (item: ICartItem) => item.productId === product.id
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddToCart = async () => {
    const selectedDuration = durations.find(
      (d) => d.duration.toString() === value
    );

    if (!selectedDuration) {
      return false;
    }

    try {
      await addToCart({
        userId,
        productId: product.id,
        duration: selectedDuration.duration,
        price: selectedDuration.price,
      }).unwrap();
      showToast('success', t('cart.productAdded'));

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({
        userId,
        productId: product.id,
      }).unwrap();
      showToast('success', t('cart.productRemoved'));

      return true;
    } catch (error) {
      return error;
    }
  };

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!userId) {
      showToast('warning', t('cart.addWarning'));
    }
  };

  const radioImage = product.images[0];

  return (
    <Box width="456px">
      <Box paddingBottom="24px" marginBottom="24px">
        <Box display="flex" alignItems="center" mb="12px">
          <Link
            href={urls.HOME}
            sx={{
              textDecoration: 'none',
              lineHeight: 0.8,
              '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: theme.palette.text.disabled,
              },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.text.disabled,
                marginRight: '5px',
              }}
            >
              {t('product.home')}
            </Typography>
          </Link>
          <ChevronRight />
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              margin: '0 5px',
            }}
          >
            {capitalizeAndTruncate(product.categories[0])}
          </Typography>
          <ChevronRight />
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              margin: '0 5px',
            }}
          >
            {capitalizeAndTruncate(product.name, stringLimit)}
          </Typography>
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: '34px',
            lineHeight: '1.11',
            letterSpacing: '-0.6px',
          }}
        >
          {product.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: '26px',
              lineHeight: '40px',
              marginRight: '10px',
              marginTop: '20px',
            }}
          >
            {`$${product.price}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ borderTop: `1px solid ${theme.palette.border.primary}` }}
        padding="24px 0"
        gap="24px"
      >
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {t('product.chooseSize')}
          </Typography>
          <StyledInput value={selectedSize} size="small" fullWidth disabled />

          {!isProductInCart && (
            <RadioGroup value={value} onChange={handleRadioChange}>
              {durations.map(({ duration, price }) => (
                <Box sx={{ position: 'relative' }} key={duration}>
                  <StyledFormControlLabel
                    value={duration.toString()}
                    labelPlacement="end"
                    control={
                      <Radio
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: theme.typography.h3.fontSize,
                          },
                        }}
                      />
                    }
                    label={<RadioLabel duration={duration} price={price} />}
                    checked={value === duration.toString()}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '30px',
                      right: '20px',
                      backgroundImage: `url(${radioImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '72px',
                      width: '72px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              ))}
            </RadioGroup>
          )}
        </Box>
      </Box>
      <Box>
        {isProductInCart ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<BagCheckIcon />}
            onClick={handleRemoveFromCart}
            disabled={isRemovingFromCart}
            sx={{ borderRadius: '12px', padding: '16px 24px' }}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: theme.typography.body1.fontWeight,
                fontSize: theme.typography.h5.fontSize,
              }}
            >
              {t('product.removeFromCart')}
            </Typography>
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<BagCheckIcon />}
            onClick={userId ? handleAddToCart : handleCartClick}
            disabled={isAddingToCart}
            sx={{ borderRadius: '12px', padding: '16px 24px' }}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: theme.typography.body1.fontWeight,
                fontSize: theme.typography.h5.fontSize,
              }}
            >
              {t('product.addToCart')}
            </Typography>
          </Button>
        )}
      </Box>
      <Box display="flex" marginTop="12px">
        <Button startIcon={<Heart />} sx={{}}>
          <Link
            href={
              userId
                ? `${urls.PROFILE}/${urls.WISHLIST}/${userId}`
                : urls.SIGN_IN
            }
            sx={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontWeight: theme.typography.bold.fontWeight,
                lineHeight: 1.75,
                marginRight: '20px',
              }}
            >
              {t('product.wishlist')}
            </Typography>
          </Link>
        </Button>
        <Button startIcon={<ChatDots />}>
          <Typography
            variant="button"
            sx={{
              fontWeight: theme.typography.bold.fontWeight,
              lineHeight: 1.75,
            }}
          >
            {t('product.messenger')}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default ProductSection;
