import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Theme, Box, Button } from '@material-ui/core';
import { Loading } from 'components/common/loading';

export interface LoadMoreProps {
  loading: boolean;
  onFetchMore: () => void;
}

export const FetchMore: FC<LoadMoreProps> = ({ loading, onFetchMore }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <Box className={c.root}>
      {loading ? (
        <Loading dense />
      ) : (
        <Button
          variant='text'
          color='primary'
          style={{ opacity: 0.75 }}
          onClick={onFetchMore}
        >
          {t('Load More')}
        </Button>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      height: t.spacing(8),
      paddingTop: t.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);
