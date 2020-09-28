import React, { FC, useState, ChangeEvent, useRef } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import { ReactComponent as RemoveIcon } from 'img/close.svg';
import { Error } from 'components/common/error';

const uploadFiles = async (files: FileList) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  const response = await fetch(`${process.env.REACT_APP_MEDIA_UPLOAD_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const res = await response.json();
  return res;
};

export interface MediaInputProps {
  onChange: (urls: string[]) => void;
  onLoading: (loading: boolean) => void;
}

export const MediaInput: FC<MediaInputProps> = ({ onChange, onLoading }) => {
  const c = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files) {
      return;
    }
    setLoading(true);
    onLoading(true);
    setError('');
    try {
      const newUrls = await uploadFiles(files);
      const urls = [...mediaUrls, ...newUrls];
      setMediaUrls(urls);
      onChange(urls);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  const handleRemovePreview = (removingUrl: string) => {
    setMediaUrls(mediaUrls.filter((url) => url !== removingUrl));
  };

  const handleAddClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className={c.previews}>
        {mediaUrls.map((url) => (
          <div
            key={url}
            className={c.preview}
            style={{ backgroundImage: `url("${url}")` }}
          >
            <IconButton
              className={c.removePreviewBtn}
              size='small'
              onClick={() => handleRemovePreview(url)}
            >
              <RemoveIcon className={c.removePreviewBtnIcon} />
            </IconButton>
          </div>
        ))}
        {mediaUrls.length > 0 && (
          <div className={c.addButton} onClick={handleAddClick}>
            {loading ? <CircularProgress style={{ width: 20, height: 20 }} /> : '+'}
          </div>
        )}
      </div>

      {error && <Error error={error} my={1} />}

      {mediaUrls.length === 0 && (
        <label htmlFor='upload-file' className={c.fileInputLabel}>
          {loading ? (
            <CircularProgress style={{ width: 16, height: 16 }} />
          ) : (
            'Add explanatory Images or Videos'
          )}
        </label>
      )}

      <input
        ref={inputRef}
        disabled={loading}
        type='file'
        accept='image/*, video/*'
        multiple
        id='upload-file'
        required
        onChange={handleChange}
        className={c.fileInput}
      />
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    fileInputLabel: {
      cursor: 'pointer',
      display: 'block',
      padding: t.spacing(1, 2),
      borderRadius: t.shape.borderRadius,
      border: `1px solid ${t.palette.info.main}`,
      color: t.palette.info.main,
      textAlign: 'center',
    },
    fileInput: {
      opacity: 0,
      position: 'absolute',
      zIndex: -1,
    },
    previews: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridAutoRows: 80,
      gridGap: t.spacing(0.75),
    },
    preview: {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: t.shape.borderRadius * 2,
    },
    removePreviewBtn: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: '#fff',
      padding: 4,
    },
    removePreviewBtnIcon: {
      width: 12,
      height: 12,
    },
    addButton: {
      border: `3px dashed ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius * 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
      color: t.palette.divider,
      cursor: 'pointer',
    },
  }),
);
