import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InstagramPostData } from 'gql/types/InstagramPostData';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  // Divider,
  useMediaQuery,
} from '@material-ui/core';

export interface PostDescriptionProps {
  post: InstagramPostData;
}

export const PostDescription: FC<PostDescriptionProps> = ({
  post: { url, mediumPreviewUrl, ownerUsername, ownerProfilePic, description },
}) => {
  const c = useStyles();
  const { t } = useTranslation();
  const up390 = useMediaQuery('(min-width:390px)');
  const up460 = useMediaQuery('(min-width:460px)');
  const up580 = useMediaQuery('(min-width:580px)');

  const descriptionShort = description?.slice(
    0,
    up580 ? 110 : up460 ? 85 : up390 ? 75 : 65,
  );
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const handleDescriptionExpandedChange = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  return (
    <Box className={c.root}>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img
          className={c.preview}
          src={mediumPreviewUrl || ''}
          style={{ marginBottom: 10 }}
          alt='preview'
        />
      </a>

      {description && (
        <>
          <Typography
            color='textSecondary'
            display='block'
            style={{
              fontSize: '0.85rem',
              fontFamily: 'monospace',
              position: 'relative',
            }}
          >
            {descriptionShort?.length !== description.length ? (
              <>
                {descriptionExpanded ? description : descriptionShort + '...'}
                <Button
                  className={c.expandButton}
                  onClick={handleDescriptionExpandedChange}
                  variant='text'
                  size='small'
                >
                  {!descriptionExpanded ? t('more') : t('less')}
                </Button>
              </>
            ) : (
              description
            )}
          </Typography>
          {/* <Box mt={1.25}>
            <Divider />
          </Box> */}
        </>
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
    expandButton: {
      color: t.palette.text.hint,
      background: 'white',
      fontSize: '0.75rem',
      position: 'absolute',
      right: -5,
      bottom: -4,
      paddingTop: 2,
      paddingBottom: 2,
    },
  }),
);
