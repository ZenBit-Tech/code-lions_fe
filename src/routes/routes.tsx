import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import SignInPage from 'src/pages/SignInPage';
import SignUpPage from 'src/pages/SignUpPage';
import VerifyEmailPage from 'src/pages/VerifyEmailPage';

const router = createBrowserRouter([
  { path: '', element: <HomePage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'verify', element: <VerifyEmailPage /> },
  { path: 'signin', element: <SignInPage /> },
]);

export default router;
