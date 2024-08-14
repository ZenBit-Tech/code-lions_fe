import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Collapse, IconButton, List, Box, Typography } from '@mui/material';

import ChevronDown from 'src/assets/icons/chevron-down.svg';
import SectionTitle from 'src/components/shared/SectionTitle';
import SimpleSection from 'src/components/shared/SimpleSection';
import theme from 'src/theme';

import rulesData from './rulesData';
import { Container, SectionWrapper, TextWrapper, TitleStyled } from './styles';

function RentalRulesPage() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpandClick = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SimpleSection>
      <Container>
        <SectionTitle
          title={t('rentalRules.title')}
          greyBackground
          showBackLink
          mt="12px"
        />
        <SectionWrapper>
          <TextWrapper>
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
                      <Box key={index} marginBottom="15px">
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
          </TextWrapper>
        </SectionWrapper>
      </Container>
    </SimpleSection>
  );
}

export default RentalRulesPage;
