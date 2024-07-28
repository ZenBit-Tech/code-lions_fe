import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

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
import RulesErrorPopup from 'src/components/ProductCard/RulesErrorPopup';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import useProductSection from './hooks/useProductSection';
import RadioLabel from './RadioLabel';
import RentalRulesPopup from './RentalRulesPopup';
import { StyledInput, StyledFormControlLabel } from './styles';

const stringLimit = 30;

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
    handleGoToWishlistClick,
    isProductInCart,
    isAddingToCart,
    isRemovingFromCart,
    durations,
    rulesErrorPopupVisible,
    setRulesErrorPopupVisible,
    rulesErrorMessage,
  } = useProductSection(product);

  const { t } = useTranslation();
  const radioImage = product.images[0];

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

      {rulesErrorPopupVisible &&
        createPortal(
          <StyledBackdrop showModal={rulesErrorPopupVisible}>
            <RulesErrorPopup
              onClose={() => setRulesErrorPopupVisible(false)}
              errorMessage={rulesErrorMessage}
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
        <Button startIcon={<Heart />} onClick={handleGoToWishlistClick}>
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
