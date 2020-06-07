// import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetUser } from './types/GetUser';
import { GET_USER } from './queries';

//===== QUERIES =====//

export const useUser = (id: 'me' | string) => {
  const q = useQuery<GetUser>(GET_USER, {
    variables: { id },
  });
  return { user: q.data?.getUser, ...q };
};
