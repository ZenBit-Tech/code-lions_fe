import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useHideRentalRulesMutation } from 'src/redux/user/userService';
import { selectHideRentalRules } from 'src/redux/user/userSlice';

const useProductCardRulesPopup = (
  handleAddToCart: () => Promise<void>,
  onClose: () => void,
  userId: string
) => {
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

  const handleAddToCartAndCloseModal = useCallback(async () => {
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
  }, [
    handleAddToCart,
    willHideRentalRules,
    isCheckboxChecked,
    hideRentalRules,
    userId,
    onClose,
  ]);

  return {
    t,
    expanded,
    isCheckboxChecked,
    handleExpandClick,
    handleCheckboxChange,
    handleAddToCartAndCloseModal,
  };
};

export default useProductCardRulesPopup;
