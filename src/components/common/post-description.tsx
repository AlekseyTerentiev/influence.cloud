import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InstagramPostData } from 'gql/types/InstagramPostData';
import clsx from 'clsx';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
} from '@material-ui/core';

export interface PostDescriptionProps {
  post: InstagramPostData;
}

export const PostDescription: FC<PostDescriptionProps> = ({
  post: { url, mediumPreviewUrl, ownerUsername, ownerProfilePic, description },
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const handleDescriptionExpandedChange = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const longText = description && description?.length > 150;

  return (
    <Box className={c.root}>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img
          className={c.preview}
          src={mediumPreviewUrl || ''}
          style={{ marginBottom: 10 }}
          alt=''
        />
      </a>

      {description && (
        <Typography
          color='textSecondary'
          className={clsx(c.description, {
            [c.descriptionExpanded]: descriptionExpanded,
          })}
        >
          {description}
          {longText && (
            <Button
              className={c.expandButton}
              onClick={handleDescriptionExpandedChange}
              variant='text'
              size='small'
            >
              {!descriptionExpanded ? t('more') : t('less')}
            </Button>
          )}
        </Typography>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    preview: {
      maxWidth: '100%',
      display: 'block',
      borderRadius: t.shape.borderRadius * 3,
    },
    description: {
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      position: 'relative',
      overflow: 'hidden',
      maxHeight: 30,
    },
    descriptionExpanded: {
      maxHeight: 'none',
    },
    expandButton: {
      color: t.palette.text.hint,
      background: 'white !important',
      fontSize: '0.8rem',
      lineHeight: '18px',
      position: 'absolute',
      right: -1,
      bottom: -2,
      padding: 0,
      paddingBottom: 1,
      '&:before': {
        content: '"..."',
        marginRight: 6,
      },
    },
  }),
);
