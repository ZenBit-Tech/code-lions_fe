import React, { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import LogoutIcon from 'src/assets/icons/profile/logout.svg';
import OrdersIcon from 'src/assets/icons/profile/orders.svg';
import ProfileIcon from 'src/assets/icons/profile/profile.svg';
import SettingsIcon from 'src/assets/icons/profile/settings.svg';
import SupportIcon from 'src/assets/icons/profile/support.svg';
import WishlistIcon from 'src/assets/icons/profile/wishlist.svg';
import { urls } from 'src/common/constants';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useCreateSupportMutation } from 'src/redux/chat/chatService';
import { useAppDispatch } from 'src/redux/hooks';
import { logout, selectUserId } from 'src/redux/user/userSlice';

import {
  AvatarStyled,
  DividerStyled,
  LinkStyled,
  ListItemAvatarStyled,
  ListItemStyled,
  ListItemTextStyled,
  ListStyled,
} from './styles';

const IndexConstants = {
  EVEN_CONDITION: 0,
  DIVISOR_FOR_INDEX: 2,
};

function ProfileMenu() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [createSupport] = useCreateSupportMutation();

  const userId = useSelector(selectUserId);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSupportClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      const support = await createSupport(undefined).unwrap();

      navigate(`${urls.PROFILE_SUPPORT}/${support.id}`);
    } catch {
      showToast('error', t('toasterMessages.failedCreateSupport'));
    }
  };

  const menuItems = [
    {
      icon: <ProfileIcon />,
      textKey: 'profileMenu.personalInformation',
      to: urls.PROFILE_DETAILS,
    },
    {
      icon: <OrdersIcon />,
      textKey: 'profileMenu.myOrders',
      to: urls.PROFILE_ORDERS,
    },
    {
      icon: <WishlistIcon />,
      textKey: 'profileMenu.wishlist',
      to: `${urls.WISHLIST}/${userId}`,
    },
    {
      icon: <SettingsIcon />,
      textKey: 'profileMenu.settings',
      to: urls.PROFILE_SETTINGS,
    },
    {
      icon: <SupportIcon />,
      textKey: 'profileMenu.support',
      to: urls.PROFILE_SUPPORT,
      onClick: handleSupportClick,
    },
    {
      icon: <LogoutIcon />,
      textKey: 'profileMenu.logOut',
      to: urls.SIGN_IN,
      onClick: handleLogout,
    },
  ];

  return (
    <ListStyled>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.textKey}>
          <ListItemStyled>
            <LinkStyled
              to={item.to}
              even={
                index % IndexConstants.DIVISOR_FOR_INDEX ===
                IndexConstants.EVEN_CONDITION
              }
              onClick={item.onClick}
            >
              <ListItemAvatarStyled>
                <AvatarStyled
                  even={
                    index % IndexConstants.DIVISOR_FOR_INDEX ===
                    IndexConstants.EVEN_CONDITION
                  }
                >
                  {item.icon}
                </AvatarStyled>
              </ListItemAvatarStyled>
              <ListItemTextStyled primary={t(item.textKey)} />
            </LinkStyled>
          </ListItemStyled>
          <DividerStyled aria-hidden="true" />
        </React.Fragment>
      ))}
    </ListStyled>
  );
}

export default ProfileMenu;
