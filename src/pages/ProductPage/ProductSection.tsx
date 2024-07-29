import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

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
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useCreateChatMutation } from 'src/redux/chat/chatService';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import useProductSection from './hooks/useProductSection';
import RadioLabel from './RadioLabel';
import RentalRulesPopup from './RentalRulesPopup';
import { StyledInput, StyledFormControlLabel } from './styles';

interface ProductSectionProps {
  product: IProduct;
}

function ProductSection({ product }: ProductSectionProps) {
  const {
    userId,
    selectedSize,
    value,
    showModal,
    handleClose,
    handleRadioChange,
    handleAddToCartOrOpenModal,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartClick,
    isProductInCart,
    isAddingToCart,
    isRemovingFromCart,
    durations,
  } = useProductSection(product);

  const { t } = useTranslation();
  const radioImage = product.images[0];
  const [createChat] = useCreateChatMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const stringLimit = 30;

  const toChat = async () => {
    try {
      const result = await createChat({
        chatPartnerId: product.vendor.id,
        content: `${window.location.origin}${location.pathname}`,
      }).unwrap();

      navigate(`${urls.BUYER_CHATS}/${result.id}`);
    } catch (error) {
      showToast('error', error.data.message);
    }
  };

  return (
    <Box width="456px">
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <RentalRulesPopup
              onClose={handleClose}
              isAddingToCart={isAddingToCart}
              userId={userId}
              handleAddToCart={handleAddToCart}
            />
          </StyledBackdrop>,
          document.body
        )}
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
          <Link
            href={`${urls.PRODUCT_CATEGORY_URL}/${product.categories[0]}`}
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
                margin: '0 5px',
              }}
            >
              {capitalizeAndTruncate(product.categories[0])}
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
                    label={
                      <RadioLabel
                        categories={product.categories}
                        duration={duration}
                        price={price}
                      />
                    }
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
            onClick={userId ? handleAddToCartOrOpenModal : handleCartClick}
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
              {t('product.goToWishlist')}
            </Typography>
          </Link>
        </Button>
        <Button onClick={toChat} startIcon={<ChatDots />}>
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
