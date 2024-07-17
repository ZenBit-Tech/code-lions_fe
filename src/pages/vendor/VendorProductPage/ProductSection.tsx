import { useTranslation } from 'react-i18next';

import { Button, Radio, RadioGroup, Box, Typography } from '@mui/material';

import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import ChatDots from 'src/assets/icons/chat-dots.svg';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import Heart from 'src/assets/icons/heart.svg';
import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import RadioLabel from './RadioLabel';
import { StyledInput, StyledFormControlLabel } from './styles';

const stringLimit: number = 30;

interface ProductSectionProps {
  product: IProduct;
}

const durations = [
  { duration: 7, price: 0 },
  { duration: 14, price: 0 },
];

const weeksCount: number = 2;

const radioValue: string = durations[0].duration.toString();

function ProductSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();
  const radioImage = product.images[0];

  durations[0].price = product.price;
  durations[1].price = product.price * weeksCount;

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
          <StyledInput value={product.size} size="small" fullWidth disabled />

          <RadioGroup value={radioValue}>
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
                  checked={radioValue === duration.toString()}
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
        <Button
          fullWidth
          variant="contained"
          startIcon={<BagCheckIcon />}
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
      </Box>
      <Box display="flex" marginTop="12px">
        <Button startIcon={<Heart />} sx={{}}>
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
