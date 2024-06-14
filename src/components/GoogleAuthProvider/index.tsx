import { ReactNode } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

interface IGoogleAuthProviderProps {
  children: ReactNode;
}

function GoogleAuthProvider({ children }: IGoogleAuthProviderProps) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthProvider;
