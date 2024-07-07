import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  styled,
} from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import ChatDots from 'src/assets/icons/chat-dots.svg';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import Heart from 'src/assets/icons/heart.svg';
import { urls } from 'src/common/constants';
import {
  useGetCartByIdQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { IProduct } from 'src/redux/product/types';
import { selectUserId } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import RadioLabel from './RadioLabel';
import { StyledInput } from './styles';

const durations = [
  { duration: 7, price: 0 },
  { duration: 14, price: 0 },
];

const weeksCount: number = 2;

interface ProductSectionProps {
  product: IProduct;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ checked }) => ({
  backgroundColor: checked ? theme.palette.secondary.main : 'transparent',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.secondary}`,
  padding: '16px 25px 16px 8px',
  margin: '12px 0',
  transition: 'background-color 0.3s',
}));

function ProductSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);
  const [selectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>('');

  durations[0].price = product.price;
  durations[1].price = product.price * weeksCount;

  const { data: cartData } = useGetCartByIdQuery(
    userId ? { userId } : skipToken
  );
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const isProductInCart = cartData?.filter(
    (item) => item.productId === product.id
  )[0];

  useEffect(() => {
    if (isProductInCart) {
      const defaultOption = durations.find(
        (opt) =>
          opt.duration === isProductInCart.duration &&
          opt.price === Number(isProductInCart.price)
      );

      if (defaultOption) {
        setValue(defaultOption.duration.toString());
      }
    } else {
      setValue(durations[0]?.duration.toString() || '');
    }
  }, [isProductInCart, isProductInCart?.duration, product.price]);

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

      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);

      return false;
    }
  };
  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({
        userId,
        productId: product.id,
      }).unwrap();

      return true;
    } catch (error) {
      return error;
    }
  };

  const radioImage = product.images.slice().reverse()[0];

  return (
    <Box width="456px">
      <Box paddingBottom="24px" marginBottom="24px">
        <Box display="flex" alignItems="center" mb="12px">
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              marginRight: '5px',
            }}
          >
            {t('product.home')}
          </Typography>
          <ChevronRight />
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              margin: '0 5px',
            }}
          >
            {product.categories[0]}
          </Typography>
          <ChevronRight />
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              margin: '0 5px',
            }}
          >
            {product.name}
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
            onClick={handleAddToCart}
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
          <Link to={`${urls.PROFILE}/${urls.WISHLIST}/${userId}`}>
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
