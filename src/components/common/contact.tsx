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
  edge?: 'end' | 'start';
}

export const Contact: FC<ContactProps> = ({ edge, ...otherProps }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <Box {...otherProps}>
      <IconButton
        href='https://wa.me/79653088216'
        target='_blank'
        size='small'
        edge={edge}
        title={t('Contact us')}
        style={{ color: 'inherit' }}
      >
        <WhatsAppOutlined className={c.icon} />
      </IconButton>
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    icon: {
      color: t.palette.grey[700],
    },
  }),
);
