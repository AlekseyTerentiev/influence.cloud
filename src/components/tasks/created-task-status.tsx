import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskStatus } from 'gql/types/globalTypes';
import { Box } from '@material-ui/core';

export interface CreatedTaskStatusProps extends HTMLAttributes<HTMLDivElement> {
  status: TaskStatus;
  taskExpiredAt: string;
}

export const CreatedTaskStatus: FC<CreatedTaskStatusProps> = ({
  status,
  taskExpiredAt,
  ...otherProps
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
      {...otherProps}
    >
      {status === 'inProgress'
        ? `${t('until')} ${new Date(taskExpiredAt).toLocaleDateString()}`
        : status === 'expired'
        ? t('closed')
        : t(status)}
    </Box>
  );
};
