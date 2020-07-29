import { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAuth0 } from '@auth0/auth0-react';
import { SIGNUP_CALLBACK_ROUTE } from 'routes';

export const AuthPage: FC<RouteComponentProps & { signUp?: boolean }> = ({
  signUp,
}) => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect({
      screen_hint: signUp ? 'signup' : '',
      redirect_uri: window.location.origin + (signUp ? SIGNUP_CALLBACK_ROUTE : ''),
    });
  }, [loginWithRedirect, signUp]);

  return null;
};
