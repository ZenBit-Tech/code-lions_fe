import '@testing-library/jest-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import serviceWorker from 'src/test/worker';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  serviceWorker.listen({
    onUnhandledRequest: (req) => {
      // eslint-disable-next-line no-console
      console.error(`Unhandled request: ${req.method} ${req.url}`);
    },
  });
});

afterAll(() => {
  serviceWorker.close();
});

afterEach(() => {
  serviceWorker.resetHandlers();
});
