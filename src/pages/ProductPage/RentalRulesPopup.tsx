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
import rulesData from 'src/pages/RentalRulesPage/rulesData';
import { TitleStyled } from 'src/pages/RentalRulesPage/styles';
import theme from 'src/theme';

import useRentalRulesPopup from './hooks/useRentalRulesPopup';
import { ModalTitle, Popup } from './styles';

interface IRentalRulesPopup {
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
}: IRentalRulesPopup) {
  const {
    t,
    expanded,
    handleExpandClick,
    handleCheckboxChange,
    handleAddToCartAndCloseModal,
  } = useRentalRulesPopup(handleAddToCart, onClose, userId);

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
