import '@testing-library/jest-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';

import serviceWorker from 'src/test/worker';

expect.extend(matchers);

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window.scrollTo = vi.fn((_x: number, _y: number) => {}) as unknown as (
    options?: ScrollToOptions
  ) => void;
});

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
