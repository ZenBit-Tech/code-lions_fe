import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileIcon from 'src/assets/icons/profile/profile.svg';
import OrdersIcon from 'src/assets/icons/profile/orders.svg';
import WishlistIcon from 'src/assets/icons/profile/wishlist.svg';
import SettingsIcon from 'src/assets/icons/profile/settings.svg';
import SupportIcon from 'src/assets/icons/profile/support.svg';
import LogoutIcon from 'src/assets/icons/profile/logout.svg';
import {
  AvatarStyled,
  DividerStyled,
  ListItemAvatarStyled,
  ListItemStyled,
  ListItemTextStyled,
  ListStyled,
} from './styles';

const menuItems = [
  { icon: <ProfileIcon />, textKey: 'profileMenu.personalInformation' },
  { icon: <OrdersIcon />, textKey: 'profileMenu.myOrders' },
  { icon: <WishlistIcon />, textKey: 'profileMenu.wishlist' },
  { icon: <SettingsIcon />, textKey: 'profileMenu.settings' },
  { icon: <SupportIcon />, textKey: 'profileMenu.support' },
  { icon: <LogoutIcon />, textKey: 'profileMenu.logOut' },
];

const IndexConstants = {
  EVEN_CONDITION: 0,
  DIVISOR_FOR_INDEX: 2,
};

function ProfileMenu() {
  const { t } = useTranslation();

  return (
    <ListStyled>
      {menuItems.map((item, index) => (
        <React.Fragment key={item.textKey}>
          <ListItemStyled>
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
          </ListItemStyled>
          <DividerStyled aria-hidden="true" />
        </React.Fragment>
      ))}
    </ListStyled>
  );
}

export default ProfileMenu;
