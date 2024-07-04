import { useState } from 'react';
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
import { StyledInput, StyledRadioWrapper } from './styles';

const radioValue: string = 'rent';
const rentDuration: number = 7;

interface ProductSectionProps {
  product: IProduct;
}

function ProductSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);
  const [selectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>(radioValue);

  const { data: cartData } = useGetCartByIdQuery(
    userId ? { userId } : skipToken
  );
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();

  const isProductInCart = cartData?.some(
    (item) => item.productId === product.id
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        userId,
        productId: product.id,
        duration: rentDuration,
      }).unwrap();

      return true;
    } catch (error) {
      return error;
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
      <Box height="120px" paddingBottom="24px" marginBottom="24px">
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
        <Box display="flex" flexDirection="column" height="76px" gap="8px">
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {t('product.chooseSize')}
          </Typography>
          <StyledInput value={selectedSize} size="small" fullWidth disabled />
          <StyledRadioWrapper>
            <RadioGroup value={value} onChange={handleRadioChange}>
              <FormControlLabel
                value={radioValue}
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
                label={<RadioLabel price={product.price} />}
              />
            </RadioGroup>
            <Box
              sx={{
                backgroundImage: `url(${radioImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '72px',
                width: '72px',
                borderRadius: '8px',
              }}
            />
          </StyledRadioWrapper>
        </Box>
      </Box>
      <Box marginTop="120px">
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
