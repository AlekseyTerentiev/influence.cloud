import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountTaskStatus as TaskStatus } from 'gql/types/globalTypes';
import { Box } from '@material-ui/core';
import { FDate } from 'components/common/fdate';

export interface AccountTaskStatusProps extends HTMLAttributes<HTMLDivElement> {
  status: TaskStatus;
  taskCompletedAt: string;
}

export const AccountTaskStatus: FC<AccountTaskStatusProps> = ({
  status,
  taskCompletedAt,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <Box
      color={
        status === 'completed'
          ? 'success.main'
          : status === 'expired'
          ? 'error.main'
          : 'info.main'
      }
      {...otherProps}
    >
      {status === 'completed' ? <FDate date={taskCompletedAt} /> : t(status)}
    </Box>
  );
};
