import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  IconButton,
  BoxProps,
} from '@material-ui/core';
import { WhatsAppOutlined } from '@ant-design/icons';

const PHONE_NUMBER = '79166750948';

export interface ContactProps extends BoxProps {
  edge?: 'end' | 'start';
}

export const Contact: FC<ContactProps> = ({ edge, ...otherProps }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <Box {...otherProps}>
      <IconButton
        href={`https://wa.me/${PHONE_NUMBER}`}
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
