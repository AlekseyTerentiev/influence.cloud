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

export interface ContactProps extends BoxProps {
  size?: 'medium' | 'small';
  edge?: 'end' | 'start';
}

export const Contact: FC<ContactProps> = ({ size, edge, ...otherProps }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <Box className={clsx(c.root, otherProps.className)} {...otherProps}>
      <IconButton
        href='https://wa.me/79653088216'
        target='_blank'
        size={size}
        edge={edge}
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
