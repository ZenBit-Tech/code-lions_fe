import { useTranslation } from 'react-i18next';

import {
  clothesSizes,
  jeansSizes,
  shoesSizes,
} from 'src/common/selectSizeOptions';
import LabelText from 'src/components/shared/LabelText';
import { CustomSelect } from 'src/components/shared/StyledSelect';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';

import { TitleStyled } from '../PersonalInformationForm/styles';

import FormStyled from './styles';

function SizesForm() {
  const { t } = useTranslation();

  return (
    <FormStyled>
      <TitleStyled variant="subtitle1">{t('profileDetails.sizes')}</TitleStyled>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.clothesSize')} </LabelText>
        <CustomSelect
          options={clothesSizes}
          displayEmpty
          // value={value}
          // onChange={(v) => setValue(String(v.target.value))}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.shoesSize')} </LabelText>
        <CustomSelect
          options={shoesSizes}
          displayEmpty
          // value={value}
          // onChange={(v) => setValue(String(v.target.value))}
        />
      </TitleInputWrapper>
      <TitleInputWrapper>
        <LabelText> {t('profileDetails.jeansSize')} </LabelText>
        <CustomSelect
          options={jeansSizes}
          displayEmpty
          // value={value}
          // onChange={(v) => setValue(String(v.target.value))}
        />
      </TitleInputWrapper>
    </FormStyled>
  );
}

export default SizesForm;
