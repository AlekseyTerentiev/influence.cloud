import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadFile } from 'gql/upload-file';
import { Box } from '@material-ui/core';

export interface FilesUploadProps {
  onUpload: (urls: string[]) => void;
}

export const FilesUpload: FC<FilesUploadProps> = ({ onUpload }) => {
  const [uploadFile] = useUploadFile();

  // const onChange = ({
  //   target: { validity, files },
  // }: ChangeEvent<HTMLInputElement>) => {
  //   console.log('validity', validity);
  //   console.log('files', files);

  //   onUpload('url');
  //   // if (validity.valid) uploadMediaForTask({ variables: { media: file } });
  // };

  // return <input type='file' required onChange={onChange} />;

  const onDrop = useCallback(async (files) => {
    console.log('files', files);

    const file = files[0];
    const uploadedFile = await uploadFile({ variables: { file } });
    alert('uploadedFile: ' + uploadedFile);
    console.log('uploadedFile:', uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      className={`dropzone ${isDragActive && 'isActive'}`}
      style={{ border: '1px solid #eee', cursor: 'pointer' }}
      bgcolor='#f5f5f5'
      px={1}
      mb={1}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
};
