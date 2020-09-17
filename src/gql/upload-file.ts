import { gql, useMutation } from '@apollo/client';
import { UploadFile, UploadFileVariables } from './types/UploadFile';

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const useUploadFile = () => {
  return useMutation<UploadFile, UploadFileVariables>(UPLOAD_FILE);
};
