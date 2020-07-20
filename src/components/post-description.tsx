import React, { FC, useState } from 'react';
import { InstagramPostData } from 'gql/types/InstagramPostData';

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
  post: { displayUrl, ownerUsername, description },
}) => {
  const c = useStyles();

  const descriptionShort = description?.slice(0, 55);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  function handleDescriptionExpandedChange() {
    setDescriptionExpanded(!descriptionExpanded);
  }

  return (
    <Box className={c.root}>
      <img className={c.preview} src={displayUrl} style={{ marginBottom: 16 }} />

      {description && (
        <Typography
          variant='caption'
          color='textSecondary'
          display='block'
          style={{ fontFamily: 'monospace', position: 'relative' }}
        >
          {descriptionShort?.length !== description.length ? (
            <>
              {descriptionExpanded ? description : descriptionShort + '...'}
              <Button
                style={{
                  position: 'absolute',
                  right: -11,
                  bottom: -2,
                  opacity: 0.5,
                }}
                onClick={handleDescriptionExpandedChange}
                variant='text'
                size='small'
              >
                {!descriptionExpanded ? 'more' : 'less'}
              </Button>
            </>
          ) : (
            description
          )}
        </Typography>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    preview: {
      maxWidth: '100%',
      display: 'block',
    },
  }),
);