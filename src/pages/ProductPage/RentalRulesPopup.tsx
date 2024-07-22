import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import theme from 'src/theme';

import rulesData from '../RentalRulesPage/rulesData';
import { TitleStyled } from '../RentalRulesPage/styles';

import { ModalTitle, Popup } from './styles';

interface IModalPopup {
  onClose: () => void;
  userId: string;
  isAddingToCart: boolean;
  handleCartClick: React.MouseEventHandler<HTMLButtonElement>;
  handleAddToCart: () => Promise<boolean>;
}

function RentalRulesPopup({
  onClose,
  userId,
  isAddingToCart,
  handleCartClick,
  handleAddToCart,
}: IModalPopup) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpandClick = (id: number) => {
    setExpanded(expanded === id ? null : id);
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
                      <Box marginBottom="15px">
                        <Typography
                          key={index}
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
                control={<Checkbox />}
                label={t('rentalRules.doNotShowRules')}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box margin="0 5px" display="flex" justifyContent="center">
        <Button
          fullWidth
          variant="contained"
          startIcon={<BagCheckIcon />}
          onClick={userId ? handleAddToCart : handleCartClick}
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
      </Box>
    </Popup>
  );
}

export default RentalRulesPopup;
