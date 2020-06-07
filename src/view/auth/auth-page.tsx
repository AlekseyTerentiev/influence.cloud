import { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAuth } from 'auth';
import { SIGNUP_CALLBACK_ROUTE } from 'routes';

export const AuthPage: FC<RouteComponentProps & { signUp?: boolean }> = ({ signUp }) => {
  const { loginWithRedirect } = useAuth();

  useEffect(() => {
    loginWithRedirect({
      screen_hint: signUp ? 'signup' : '',
      redirect_uri: window.location.origin + (signUp ? SIGNUP_CALLBACK_ROUTE : ''),
    });
  }, [loginWithRedirect, signUp]);

  return null;
};
