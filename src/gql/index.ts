import { useQuery, useMutation } from '@apollo/react-hooks';
import { GetUser } from './types/GetUser';
import { GET_USER, UPSERT_USER } from './queries';

export const useUser = (id: 'me' | string) => {
  const q = useQuery<GetUser>(GET_USER, {
    variables: { id },
  });
  return { user: q.data?.getUser, ...q };
};

export const useUpsertUser = () => {
  return useMutation(UPSERT_USER);
};
