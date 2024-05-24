import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'src/pages/HomePage/HomePage';
import SignInPage from 'src/pages/SignInPage/SignInPage';
import SignUpPage from 'src/pages/SignUpPage/SignUpPage';

const router = createBrowserRouter([
  { path: '', element: <HomePage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'signin', element: <SignInPage /> },
]);

export default router;
