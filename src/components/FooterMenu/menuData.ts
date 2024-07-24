import { urls, userRoles } from 'src/common/constants';

const createMenuData = (
  t: (key: string) => string,
  role: string | null,
  userId?: string
) => {
  const menuData = [
    {
      id: 'shop',
      mainLink: { to: urls.PRODUCT_FEED, label: t('menu.shop') },
      links: [],
    },
    {
      id: 'company',
      mainLink: { to: urls.COMPANY, label: t('menu.company') },
      links: [
        { id: 'about-us', to: urls.ABOUT_US, label: t('menu.aboutUs') },
        { id: 'terms', to: urls.TERMS_OF_USE, label: t('menu.terms') },
        { id: 'privacy', to: urls.PRIVACY_POLICY, label: t('menu.privacy') },
        { id: 'contact', to: urls.CONTACT, label: t('menu.contact') },
      ],
    },
    {
      id: 'help',
      mainLink: { to: urls.HELP, label: t('menu.help') },
      links: [
        { id: 'rent', to: urls.HOW_IT_WORKS, label: t('menu.howItWorks') },
        { id: 'faqs', to: urls.FAQ, label: t('menu.faqs') },
        { id: 'shipping', to: urls.SHIPPING, label: t('menu.shipping') },
      ],
    },
  ];

  if (!role) {
    menuData[0].links = [
      { id: 'login', to: urls.SIGN_IN, label: t('menu.login') },
      { id: 'signup', to: urls.SIGN_UP, label: t('menu.signUp') },
    ];
  }

  if (role === userRoles.BUYER) {
    menuData[0].links = [
      {
        id: 'wishlist',
        to: `${urls.PROFILE}/${urls.WISHLIST}/${userId}`,
        label: t('menu.wishlist'),
      },
      { id: 'cart', to: urls.CART, label: t('menu.cart') },
    ];
  }

  return menuData;
};

export default createMenuData;
