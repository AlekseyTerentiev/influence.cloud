import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';

import { WhatsAppOutlined } from '@ant-design/icons';

export interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <IconButton
      edge='start'
      href='https://wa.me/79653088216'
      target='_blank'
      className={c.root}
      size='small'
      title={t('Contact us')}
    >
      <WhatsAppOutlined />
    </IconButton>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.grey[700],
    },
  }),
);
