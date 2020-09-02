import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  IconButton,
  BoxProps,
} from '@material-ui/core';
import { WhatsAppOutlined } from '@ant-design/icons';

export interface ContactProps extends BoxProps {}

export const Contact: FC<ContactProps> = ({ ...otherProps }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <Box className={clsx(c.root, otherProps.className)} {...otherProps}>
      <IconButton
        edge='start'
        href='https://wa.me/79653088216'
        target='_blank'
        size='small'
        title={t('Contact us')}
      >
        <WhatsAppOutlined />
      </IconButton>
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      color: t.palette.grey[700],
    },
  }),
);
