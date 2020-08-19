import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskStatus } from 'gql/types/globalTypes';
import { Box } from '@material-ui/core';

export interface CreatedTaskStatusProps {
  status: TaskStatus;
  taskExpiredAt: string;
}

export const CreatedTaskStatus: FC<CreatedTaskStatusProps> = ({
  status,
  taskExpiredAt,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      color={
        status === 'completed'
          ? 'success.main'
          : status === 'expired' || status === 'canceled'
          ? 'text.secondary'
          : 'info.main'
      }
    >
      {status === 'inProgress'
        ? `${t('Until')} ${new Date(taskExpiredAt).toLocaleDateString()}`
        : status === 'expired'
        ? t('completed')
        : t(status)}
    </Box>
  );
};
