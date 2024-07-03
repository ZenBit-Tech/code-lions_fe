import { setupServer } from 'msw/node';

import handlers from './handlers';

const serviceWorker = setupServer(...handlers);

export default serviceWorker;
