import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadMediaForTask } from 'gql/created-tasks';

export const FileUpload = () => {
  const [uploadMediaForTask] = useUploadMediaForTask();
  const [taskId, setTaskId] = useState(0);

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    if (validity.valid) uploadMediaForTask({ variables: { taskId, media: file } });
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor='task-id'>TaskId:</label>
        <input
          id='task-id'
          name='task-id'
          value={taskId}
          required
          onChange={(e) => setTaskId(Number(e.target.value))}
        />
      </div>

      <input type='file' required onChange={onChange} />
    </>
  );

  // const onDrop = useCallback((acceptedFiles) => {
  //   // do something here
  //   console.log(acceptedFiles);

  //   uploadMediaForTask({ variables: { taskId: 140, media: acceptedFiles[0] } });
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  // });

  // return (
  //   <>
  //     <div {...getRootProps()} className={`dropzone ${isDragActive && 'isActive'}`}>
  //       <input {...getInputProps()} />
  //       {isDragActive ? (
  //         <p>Drop the files here ...</p>
  //       ) : (
  //         <p>Drag 'n' drop some files here, or click to select files</p>
  //       )}
  //     </div>
  //   </>
  // );
};
