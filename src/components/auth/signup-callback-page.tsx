import { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { navigate } from '@reach/router';
import { SIGNUP_COMPLETE_ROUTE } from 'routes';

export const SignUpCallbackPage: FC<RouteComponentProps> = () => {
  useEffect(() => {
    (window as any).ga('send', 'event', 'registration', 'auth0');
    navigate(SIGNUP_COMPLETE_ROUTE, { replace: true });
  }, []);

  return null;
};
