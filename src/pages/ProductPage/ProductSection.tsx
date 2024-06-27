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
import theme from 'src/theme';

import RadioLabel from './RadioLabel';
import { StyledMenuItem, StyledRadioWrapper } from './styles';

const mockImageUrl: string = 'src/assets/photos/mockPhoto1.png';

function ProductSection() {
  const { t } = useTranslation();

  const [openSize, setOpenSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    t('product.mockSize')
  );
  const [value, setValue] = useState('rent');

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
            {t('product.category')}
          </Typography>
          <ChevronRight />
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.text.disabled,
              margin: '0 5px',
            }}
          >
            {t('product.name')}
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
          {t('product.name')}
        </Typography>
        <Typography variant="subtitle2" padding="15px 0">
          {t('product.mockDesc')}
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
            {t('product.mockPrice')}
          </Typography>
          <Typography
            sx={{
              lineHeight: '40px',
              color: theme.palette.text.disabled,
              textDecoration: 'line-through',
            }}
          >
            {t('product.mockOldPrice')}
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
              {t('product.mockSize')}
            </StyledMenuItem>
          </Select>
          <StyledRadioWrapper>
            <RadioGroup value={value} onChange={handleRadioChange}>
              <FormControlLabel
                value="rent"
                labelPlacement="end"
                control={
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 16,
                      },
                    }}
                  />
                }
                label={<RadioLabel />}
              />
            </RadioGroup>
            <Box
              sx={{
                backgroundImage: `url(${mockImageUrl})`,
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
            sx={{ fontWeight: 400, fontSize: '20px' }}
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
              fontWeight: 700,
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
            sx={{ fontWeight: 700, lineHeight: 1.75 }}
          >
            {t('product.messenger')}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default ProductSection;
