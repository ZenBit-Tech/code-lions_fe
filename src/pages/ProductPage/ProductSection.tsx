import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  Box,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import ChatDots from 'src/assets/icons/chat-dots.svg';
import ChevronDown from 'src/assets/icons/chevron-down-grey.svg';
import ChevronRight from 'src/assets/icons/chevron-right-grey-small.svg';
import Heart from 'src/assets/icons/heart.svg';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import RadioLabel from './RadioLabel';
import { StyledMenuItem, StyledRadioWrapper } from './styles';

const radioValue: string = 'rent';

interface ProductSectionProps {
  product: IProduct;
}

function ProductSection({ product }: ProductSectionProps) {
  const { t } = useTranslation();

  const [openSize, setOpenSize] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.size);
  const [value, setValue] = useState<string>(radioValue);

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSize(event.target.value as string);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleOpen = () => setOpenSize(true);
  const handleClose = () => setOpenSize(false);

  return (
    <Box width="456px">
      <Box height="202px" paddingBottom="24px" marginBottom="24px">
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
        <Typography variant="subtitle2" padding="15px 0">
          {product.description}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: '26px',
              lineHeight: '40px',
              marginRight: '10px',
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
          <Select
            onChange={handleSizeChange}
            value={selectedSize}
            open={openSize}
            onClose={handleClose}
            onOpen={handleOpen}
            fullWidth
            IconComponent={(props) => <ChevronDown {...props} />}
            size="small"
            sx={{
              border: `1px solid ${theme.palette.border.secondary}`,
              '.MuiSelect-icon': {
                width: '20px',
                height: '20px',
                top: 10,
              },
            }}
          >
            <StyledMenuItem value={t('product.mockSize')}>
              {product.size}
            </StyledMenuItem>
          </Select>
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
                label={<RadioLabel />}
              />
            </RadioGroup>
            <Box
              sx={{
                backgroundImage: `url(${product.images[0]})`,
                height: '72px',
                width: '72px',
                borderRadius: '8px',
              }}
            />
          </StyledRadioWrapper>
        </Box>
      </Box>
      <Box marginTop="120px">
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
            {t('product.wishlist')}
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
