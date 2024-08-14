import { useEffect, useState } from 'react';

import { setPending } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

interface IuseRejectProductFlowModal {
  isRejectModalOpen: boolean;
  toggleRejectModal: () => void;
}

const useRejectProductFlowModal = (): IuseRejectProductFlowModal => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const pending = useAppSelector((state) => state.addProduct.pending);
  const dispatch = useAppDispatch();

  const toggleRejectModal = (): void => {
    setIsRejectModalOpen(!isRejectModalOpen);
    if (pending) {
      dispatch(setPending(false));
    }
  };

  useEffect(() => {
    if (!pending) return;
    setIsRejectModalOpen(true);
  }, [pending]);

  return {
    isRejectModalOpen,
    toggleRejectModal,
  };
};

export default useRejectProductFlowModal;
