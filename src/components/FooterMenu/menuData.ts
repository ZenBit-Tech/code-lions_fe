import { urls } from 'src/common/constants';

const createMenuData = (t: (key: string) => string) => [
  {
    id: 'shop',
    mainLink: { to: '#', label: t('menu.shop') },
    links: [
      { id: 'login', to: urls.SIGN_IN, label: t('menu.login') },
      { id: 'wishlist', to: '#', label: t('menu.wishlist') },
      { id: 'cart', to: '#', label: t('menu.cart') },
    ],
  },
  {
    id: 'company',
    mainLink: { to: '#', label: t('menu.company') },
    links: [
      { id: 'about-us', to: '#', label: t('menu.aboutUs') },
      { id: 'terms', to: urls.TERMS_OF_USE, label: t('menu.terms') },
      { id: 'privacy', to: urls.PRIVACY_POLICY, label: t('menu.privacy') },
      { id: 'contact', to: '#', label: t('menu.contact') },
    ],
  },
  {
    id: 'help',
    mainLink: { to: '#', label: t('menu.help') },
    links: [
      { id: 'faqs', to: '#', label: t('menu.faqs') },
      { id: 'shipping', to: '#', label: t('menu.shipping') },
      { id: 'rent', to: '#', label: t('menu.rent') },
      { id: 'resell', to: '#', label: t('menu.resell') },
    ],
  },
];

export default createMenuData;
