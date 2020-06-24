import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles, Box, Typography } from '@material-ui/core';

export interface NewProps {}

export const New: FC<NewProps> = ({}) => {
  const c = useStyles();
  const { t } = useTranslation();

  return <Box className={c.root}></Box>;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);
