import { SortOrder } from 'src/redux/user/types';

export const apiUrl = import.meta.env.VITE_API_URL;

export const productsOnPage = 12;

export const urls = {
  HOME: '/',
  SIGN_UP: '/signup',
  VERIFY: '/verify',
  SIGN_IN: '/signin',
  RESTORE_PASSWORD: '/restore-password',
  ENTER_CODE: '/enter-code',
  NEW_PASSWORD: '/new-password',
  PRIVACY_POLICY: '/privacy-policy',
  HOW_IT_WORKS: '/how-it-works',
  TERMS_OF_USE: '/terms-of-use',
  SIZES_GUIDE: '/sizes-guide',
  SIGN_IN_ADMIN: 'admin/signin',
  ADMIN: '/admin',
  ONBOARDING: '/onboarding',
  ADMIN_USERS: 'users',
  ADMIN_SIGN_IN: 'signin',
  ADMIN_USER_PROFILE: 'users/:userId',
  ADMIN_USER_PROFILE_EDIT: 'users/edit/:userId',
  ADMIN_BUYERS: 'buyers',
  ADMIN_BUYER_PROFILE: 'buyers/:userId',
  ADMIN_BUYER_PROFILE_EDIT: 'buyers/edit/:userId',
  ADMIN_VENDORS: 'vendors',
  ADMIN_VENDOR_PROFILE: 'vendors/:userId',
  ADMIN_VENDOR_PROFILE_EDIT: 'vendors/edit/:userId',
  ADMIN_USERS_FULL: '/admin/users',
  ADMIN_PRODUCT_REQUEST: 'product-request',
  ADMIN_PRODUCT_LIST: 'product-list',
  ADMIN_CHATS: '/admin/chats',
  ADMIN_CHAT_ID: '/admin/chats/:chatId',
  PROFILE: '/profile',
  USER_BUYER_PROFILE: 'buyer/:id',
  BUYER: 'buyer',
  USER_VENDOR_PROFILE: 'vendor/:id',
  PROFILE_DETAILS: 'details',
  PROFILE_ORDERS: 'orders',
  PROFILE_ORDER: 'orders/:orderId',
  PROFILE_WISHLIST: 'wishlist/:userId',
  WISHLIST: 'wishlist',
  PROFILE_SETTINGS: 'settings',
  PROFILE_SUPPORT: 'support',
  PROFILE_SUPPORT_ID: 'support/:chatId',
  PRODUCT_FEED: '/products',
  PRODUCT_CATEGORY: '/products/category/:category',
  PRODUCT_CATEGORY_URL: '/products/category',
  PRODUCT: '/products/:productId',
  VENDOR: '/vendor',
  VENDOR_ADD_PRODUCT: 'add-product',
  VENDOR_EDIT_PRODUCT: 'edit-product/:productId',
  VENDOR_DASHBOARD: 'dashboard',
  VENDOR_PRODUCTS: 'products',
  PUBLIC_PRODUCT_ID: '/public-product/:productId',
  PUBLIC_PRODUCT: '/public-product',
  VENDOR_ORDERS: 'orders',
  VENDOR_ORDER: 'orders/:orderId',
  VENDOR_CHATS: '/vendor/chats',
  VENDOR_CHAT_ID: '/vendor/chats/:chatId',
  BUYER_CHATS: '/profile/buyer/chats',
  BUYER_CHAT_ID: '/profile/buyer/chats/:chatId',
  VENDOR_PROFILE: 'profile',
  BEST_VENDORS: '/best-vendors',
  COMPANY: '/company',
  ABOUT_US: '/about-us',
  CONTACT: '/contact',
  FAQ: '/faq',
  SHIPPING: '/shipping',
  RENT: '/rent',
  HELP: '/help',
  CART: 'cart',
  CHECKOUT: 'checkout',
  VENDOR_GLOBAL_PRODUCTS: '/vendor/products',
};

export const RTKUrls = {
  VERIFY_OTP: 'auth/verify-otp',
  RESEND_OTP: 'auth/resend-otp',
  SIGN_IN: 'auth/login',
  REFRESH_TOKEN: 'auth/refresh-token',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  NEW_PASSWORD: 'auth/new-password',
  REGISTER_USER: 'auth/register',
  GOOGLE_AUTH: 'auth/google',
  CHANGE_EMAIL: 'auth/change-email',
  ADMIN_USERS: 'users/admin',
  USERS: 'users',
  ROLE: 'role',
  PHOTO: 'photo',
  PHONE: 'phone',
  ADDRESS: 'address',
  SIZE: 'size',
  CREDIT_CARD: 'credit-card',
  UPDATE_PROFILE: '/update-profile',
  CARD_DATA: '/card-data',
  UPDATE_PROFILE_ADMIN: 'update-profile-admin',
  SOFT_DELETE: 'soft-delete',
  TOGGLE_NOTIFICATIONS: 'users/toggle-notifications',
  PRODUCTS: 'products',
  WISHLIST: 'wishlist',
  CART: 'cart',
  REVIEWS: 'reviews',
  USER_REVIEWS: 'reviews/user',
  BEST_VENDORS: 'best-vendors',
  LATEST: 'latest',
  SIZES: 'sizes',
  PRIMARY: 'set-primary',
  PRODUCTS_ADMIN: 'products/admin',
  PRODUCTS_ADMIN_APPROVE: 'products/admin/approve',
  PRODUCTS_ADMIN_REJECT: 'products/admin/reject',
  PRODUCTS_VENDOR: 'products/vendor',
  FILE: 'pdf-file',
  HIDE_RENTAL_RULES: 'hide-rental-rules',
  CREATE_CHECKOUT: '/stripe/create-checkout-session',
  CREATE_ACCOUNT: '/stripe/create-account',
  CHAT: 'chats',
  SUPPORT: 'chats/support',
  ORDERS: 'orders',
  BUYER_ORDERS: 'orders/buyer',
  ORDERS_VENDOR: 'orders/vendor',
  FOLLOW_VENDOR: '/vendors/follow',
  UNFOLLOW_VENDOR: '/vendors/unfollow',
};

export const HttpMethods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const validations = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_REGEX: /^[0-9]{10,11}$/,
  PHONE_LENGTH: 11,
};

export const appErrors = {
  FAILED_TO_VERIFY: 'Failed to verify email',
  FAILED_TO_RESEND_OTP: 'Failed to resend otp code',
  FAILED_SIGN_IN: 'Failed to sign in',
  FAILED_TO_SEND_EMAIL: 'Email are not send due to unexpected error',
  MISSING_CREDENTIALS: 'Missing credentials',
  EMAIL_INCORRECT: 'Please enter valid email',
  PASSWORD_LENGTH: 'Password needs to be at least 8 characters',
  PASSWORD_MATCH:
    'Passwords entered in the "Password" and "Repeat password" fields must match',
  INVALID_PHONE: 'Phone number should contain digits only',
  INVALID_LENGTH: 'Invalid length, should be 11',
  REQUIRED: 'Field is required',
  TOO_LONG: 'Too long, should be less than 100 characters',
  INVALID_CARD_NUMBER: 'Invalid card number, should be 16 digits',
  INVALID_EXPIRE_DATE:
    'Invalid expire date, should be in format MM/YY in the future',
  INVALID_CVV: 'Invalid CVV, should be 3 digits',
};

export const pathToPhotos = '/assets/photos';

export const pathToServer = 'https://code-lions-be.onrender.com';

export const socialNetworkLinks = {
  FACEBOOK: 'https://www.facebook.com/',
  INSTAGRAM: 'https://www.instagram.com/',
  EMAIL: 'mailto:codelions@helpseo.net',
};

export const onboardingSteps = {
  ROLE: 1,
  INFO: 2,
  ADDRESS: 3,
  SIZES: 4,
  FINISH: 5,
};

export type CountryCode = { code: string };

export const countryCodes: CountryCode[] = [
  { code: '+38' },
  { code: '+1' },
  { code: '' },
];

export const defaultCountryCode = '+1';

export const userRoles = {
  BUYER: 'buyer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

export const linkUrls = {
  ADMIN_USER_PROFILE_EDIT: 'edit',
  VENDOR_EDIT_PRODUCT: 'vendor/edit-product',
};

export const sortOptions: Record<string, SortOrder> = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const countries = [{ label: 'Canada', value: 'Canada' }];

export const states = [
  { label: 'Ontario', value: 'Ontario' },
  { label: 'Quebec', value: 'Quebec' },
  { label: 'Nova Scotia', value: 'Nova Scotia' },
  { label: 'New Brunswick', value: 'New Brunswick' },
  { label: 'Manitoba', value: 'Manitoba' },
  { label: 'British Columbia', value: 'British Columbia' },
  { label: 'Alberta', value: 'Alberta' },
  { label: 'Saskatchewan', value: 'Saskatchewan' },
  { label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador' },
  { label: 'Prince Edward Island', value: 'Prince Edward Island' },
];

export const cities = [
  { label: 'Toronto', value: 'Toronto' },
  { label: 'Montreal', value: 'Montreal' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Fredericton', value: 'Fredericton' },
  { label: 'Charlottetown', value: 'Charlottetown' },
  { label: "St. John's", value: "St. John's" },
  { label: 'Regina', value: 'Regina' },
  { label: 'Calgary', value: 'Calgary' },
  { label: 'Saskatoon', value: 'Saskatoon' },
  { label: 'Halifax', value: 'Halifax' },
];
export const httpStatusCodes = {
  UNAUTHORIZED: 401,
};

export const phoneCodes = {
  CANADA: '+1',
};

export const urlRoles = {
  vendors: 'vendors',
  buyers: 'buyers',
};

export const profilePathsFor = {
  vendor: 'vendor/buyer',
  buyer: 'vendor',
};

export const homeProductsSorting = {
  JUST_IN: 'justin',
  RECOMMENDED: 'recommended',
  YOUR_SIZE: 'yoursize',
};

export const productStyles = {
  CASUAL: 'casual',
  PREMIUM: 'premium',
  FANCY: 'fancy',
};

export const maxProductPrice = 500;

export const productCategories = [
  'bags',
  'shoes',
  'clothing',
  'designers',
  'accessories',
];

export const colors = [
  { name: 'black', hex: '#000000' },
  { name: 'red', hex: '#EB5757' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'green', hex: '#008000' },
  { name: 'pink', hex: '#F178B6' },
  { name: 'yellow', hex: '#F2C94C' },
  { name: 'purple', hex: '#7700C8' },
  { name: 'blue', hex: '#0990FF' },
  { name: 'grey', hex: '#6D6B6B' },
  { name: 'brown', hex: '#955539' },
];

export const shippingOption = {
  FREE: 'Free shipping',
  EXPRESS: 'Express shipping',
};

export const shippingFee = {
  FREE: 0,
  EXPRESS: 15,
};

export const productStock = 1;

export const cardTypes = {
  VIDEO: 'video',
  IMAGE: 'image',
};

export const eventalCategory: string = 'evental';
export const timeFormat = 'p';
export const monthAndDayFormat = 'MMMM d';
export const yearMonthAndDayFormat = 'yyyy MM d';

export const orderStatus = {
  NEW: 'New order',
  REJECTED: 'Rejected',
  SENT: 'Sent',
  RECEIVED: 'Received',
  SENT_BACK: 'Sent back',
  OVERDUE: 'Overdue',
  RETURNED: 'Returned',
};

export const profileOrdersTabs = {
  CURRENT: 'Current',
  ARCHIVE: 'Archive',
};

export const redirectDelay = 3000;
