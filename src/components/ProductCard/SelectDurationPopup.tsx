import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import CloseIcon from 'src/assets/icons/close.svg';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import RadioLabel from '../../pages/ProductPage/RadioLabel';
import { StyledFormControlLabel } from '../../pages/ProductPage/styles';

import { ModalTitle, Popup } from './styles';

interface IDuration {
  price: number;
  duration: number;
}

interface ISelectDurationPopup {
  onClose: () => void;
  product: IProduct;
  durations: IDuration[];
  isAddingToCart: boolean;
  handleAddToCart: (duration: number) => Promise<void>;
}

function SelectDurationPopup({
  onClose,
  product,
  durations,
  isAddingToCart,
  handleAddToCart,
}: ISelectDurationPopup) {
  const { t } = useTranslation();

  const radioImage = product.images[0];

  const [value, setValue] = useState<string>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleAddToCartAndCloseModal = useCallback(
    (duration: number) =>
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        try {
          await handleAddToCart(duration);

          return true;
        } catch (error) {
          return error;
        } finally {
          onClose();
        }
      },
    [handleAddToCart, onClose, value]
  );
  // const {
  //   t,
  //   expanded,
  //   handleExpandClick,
  //   handleCheckboxChange,
  //   handleAddToCartAndCloseModal,
  // } = useProductCardRulesPopup(handleAddToCart, onClose, userId);

  return (
    <Popup sx={{ width: '50%' }}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="80%"
        >
          <ModalTitle variant="h1">{t('product.selectPopupTitle')}</ModalTitle>
          <Box width="100%" marginTop="10px">
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
          </Box>
        </Box>
      </Box>
      <Box marginBottom="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: '12px', padding: '12px 72px' }}
        >
          <Typography
            variant="button"
            sx={{
              fontWeight: theme.typography.body1.fontWeight,
              fontSize: theme.typography.h5.fontSize,
            }}
          >
            {t('userProfileAdmin.cancelButton')}
          </Typography>
        </Button>
        <Button
          variant="contained"
          startIcon={<BagCheckIcon />}
          onClick={handleAddToCartAndCloseModal(parseFloat(value))}
          disabled={isAddingToCart}
          sx={{
            borderRadius: '12px',
            padding: '12px 54px',
            marginLeft: '24px',
          }}
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
    </Popup>
  );
}

export default SelectDurationPopup;
