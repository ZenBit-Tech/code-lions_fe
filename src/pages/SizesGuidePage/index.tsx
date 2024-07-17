import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import InfoTable from 'src/components/shared/InfoTable';
import SectionTitle from 'src/components/shared/SectionTitle';

import StyledHeader3 from './styles';
import { clothesSizeData, shoeSizeData, jeansSizeData } from './tableData';

function SizesGuidePage() {
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle title={t('sizesGuide.title')} greyBackground showBackLink />
      <Box component="section" sx={{ width: '100%', padding: '0 18px 30px' }}>
        <Box component="div" sx={{ maxWidth: '920px', margin: '0 auto' }}>
          <StyledHeader3 component="h3">
            {t('sizesGuide.clothesSizeTable')}
          </StyledHeader3>
          <InfoTable
            tableData={clothesSizeData}
            lastLine={t('sizesGuide.oneSize')}
          />
          <StyledHeader3 component="h3">
            {t('sizesGuide.jeansSizeTable')}
          </StyledHeader3>
          <InfoTable tableData={jeansSizeData} />
          <StyledHeader3 component="h3">
            {t('sizesGuide.shoeSizeTable')}
          </StyledHeader3>
          <InfoTable tableData={shoeSizeData} />
        </Box>
      </Box>
    </>
  );
}

export default SizesGuidePage;
