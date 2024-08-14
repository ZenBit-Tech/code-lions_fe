import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';

import Oval from 'src/assets/icons/addProduct/oval.svg';
import { urls } from 'src/common/constants';
import RejectProductFlowModal from 'src/components/shared/RejectProductFlowModal';
import useRejectProductFlowModal from 'src/components/shared/RejectProductFlowModal/hooks/useRejectProductFlowModal';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  OnboardingHeader4,
  OnboardingText,
} from 'src/pages/OnboardingPage/styles';
import {
  decreaseAddProductStep,
  setPrice,
  resetAddProduct,
  selectProductId,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useUpdateProductMutation } from 'src/redux/vendorProduct/vendorProductService';
import theme from 'src/theme';

import OnboardingHeader3 from './styles';

function FinishForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const productId = useAppSelector(selectProductId);
  const {
    name: productName,
    description: productDescription,
    size: productSize,
    brand: productBrand,
    colors: productColors,
    material: productMaterial,
    categories: productCategories,
    style: productStyle,
    type: productType,
    price: productPrice,
  } = useAppSelector((state) => state.addProduct);

  const { isRejectModalOpen, toggleRejectModal } = useRejectProductFlowModal();

  const [updateProduct] = useUpdateProductMutation();

  interface IFinishCardForm {
    price: string;
  }

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFinishCardForm>({
    defaultValues: {
      price: String(productPrice),
    },
    mode: 'onChange',
  });

  const returnBack = () => {
    dispatch(decreaseAddProductStep());
  };

  const onSubmit = async (values: IFinishCardForm) => {
    try {
      await updateProduct({
        id: productId,
        data: {
          name: productName,
          description: productDescription,
          price: parseFloat(values.price),
          size: productSize,
          brand: productBrand,
          colors: productColors,
          material: productMaterial,
          categories: productCategories,
          style: productStyle,
          type: productType,
        },
      }).unwrap();

      dispatch(setPrice(parseFloat(values.price)));
      dispatch(resetAddProduct());
      showToast('success', t('editProduct.editingSuccess'));
      navigate(urls.VENDOR_GLOBAL_PRODUCTS);
    } catch (error) {
      showToast('error', t('editProduct.editingFailed'));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          bgcolor: theme.palette.background.default,
          padding: '24px',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '24px',
            gap: '10px',
          }}
        >
          <Oval />
          <OnboardingHeader3>{t('addProduct.productPrice')}</OnboardingHeader3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '40px',
            alignItems: 'top',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '150px',
            }}
          >
            <OnboardingHeader4 component="h4">
              {t('addProduct.price')}
            </OnboardingHeader4>
            <OnboardingText variant="subtitle2">
              {t('addProduct.priceDescription')}
            </OnboardingText>
          </Box>
          <Controller
            name="price"
            control={control}
            rules={{
              required: t('addProduct.priceRequired'),
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: t('addProduct.priceInvalid'),
              },
            }}
            render={({ field }) => (
              <StyledInput
                {...field}
                fullWidth
                autoComplete="off"
                placeholder={t('addProduct.inputPrice')}
                padding={InputPaddingVariants.MD}
                stylevariant={InputStyleVariants.OUTLINED}
                width="100%"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '24px',
          }}
        >
          <StyledButton
            styles={StyleVariants.TRANSPARENT2}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            onClick={returnBack}
          >
            {t('onboarding.prev')}
          </StyledButton>
          <StyledButton
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            radius="8px"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            {t('onboarding.next')}
          </StyledButton>
          <StyledButton
            styles={StyleVariants.RED}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            onClick={toggleRejectModal}
          >
            {t('editProduct.cancelBtn')}
          </StyledButton>
        </Box>
      </Box>
      {isRejectModalOpen && (
        <RejectProductFlowModal
          isModalOpen={isRejectModalOpen}
          onClose={toggleRejectModal}
          modalTitle={t('editModal.title')}
          modalSubtitle={t('editModal.subtitle')}
        />
      )}
    </>
  );
}

export default FinishForm;
