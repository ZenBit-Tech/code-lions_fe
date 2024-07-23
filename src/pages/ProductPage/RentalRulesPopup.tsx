import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  List,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import BagCheckIcon from 'src/assets/icons/bag-check.svg';
import ChevronDown from 'src/assets/icons/chevron-down.svg';
import CloseIcon from 'src/assets/icons/close.svg';
import { useHideRentalRulesMutation } from 'src/redux/user/userService';
import { selectHideRentalRules } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import rulesData from '../RentalRulesPage/rulesData';
import { TitleStyled } from '../RentalRulesPage/styles';

import { ModalTitle, Popup } from './styles';

interface IModalPopup {
  onClose: () => void;
  userId: string;
  isAddingToCart: boolean;
  handleAddToCart: () => Promise<boolean>;
}

function RentalRulesPopup({
  onClose,
  userId,
  isAddingToCart,
  handleAddToCart,
}: IModalPopup) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const willHideRentalRules = useSelector(selectHideRentalRules);

  const [hideRentalRules] = useHideRentalRulesMutation();

  const handleExpandClick = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleAddToCartAndCloseModal = async () => {
    const addToCartPromise = handleAddToCart();

    const hideRentalRulesPromise =
      !willHideRentalRules && isCheckboxChecked
        ? hideRentalRules({ id: userId }).unwrap()
        : Promise.resolve();

    try {
      await Promise.all([addToCartPromise, hideRentalRulesPromise]);

      return true;
    } catch (error) {
      return error;
    } finally {
      onClose();
    }
  };

  return (
    <Popup>
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
          <ModalTitle variant="h1">{t('rentalRules.rentalRules')}</ModalTitle>
          <Box width="100%" marginTop="10px">
            {rulesData.map(({ id, subtitle, rules }) => (
              <Box display="flex" flexDirection="column" key={id}>
                <Box display="flex" alignItems="center">
                  <TitleStyled variant="h3">{t(subtitle)}</TitleStyled>
                  <IconButton
                    onClick={() => handleExpandClick(id)}
                    aria-expanded={expanded === id}
                    aria-label="show more"
                    size="small"
                    sx={{
                      marginLeft: 'auto',
                      transform:
                        expanded === id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    <ChevronDown />
                  </IconButton>
                </Box>
                <Collapse in={expanded === id} timeout="auto" unmountOnExit>
                  <List sx={{ margin: '0 20px' }}>
                    {rules.map((rule, index) => (
                      <Box marginBottom="15px" key={index}>
                        <Typography
                          variant="body2"
                          color={theme.palette.text.disabled}
                        >
                          {t(rule)}
                        </Typography>
                      </Box>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
            <Box
              display="flex"
              justifyContent="flex-start"
              width="100%"
              margin="10px 0"
            >
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} />}
                label={t('rentalRules.doNotShowRules')}
              />
            </Box>
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
          onClick={handleAddToCartAndCloseModal}
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

export default RentalRulesPopup;
