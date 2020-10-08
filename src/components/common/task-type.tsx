import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GetCreatedTasks_createdTasks_tasks } from 'gql/types/GetCreatedTasks';
import { GetAvailableTasks_availableTasks_tasks } from 'gql/types/GetAvailableTasks';
import { GetAccountTasks_accountTasks } from 'gql/types/GetAccountTasks';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { ReactComponent as StoryIcon } from 'img/story.svg';
import { ReactComponent as CommentsIcon } from 'img/comments.svg';
import clsx from 'clsx';

export interface TaskTypeProps extends TypographyProps {
  task:
    | GetCreatedTasks_createdTasks_tasks
    | GetAvailableTasks_availableTasks_tasks
    | GetAccountTasks_accountTasks;
  onlyIcon?: boolean;
}

export const TaskType: FC<TaskTypeProps> = ({
  task,
  onlyIcon = false,
  ...props
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  return (
    <Typography {...props} className={clsx(c.root, props.className)}>
      {(task.__typename === 'InstagramCommentTask' ||
        task.__typename === 'AvailableInstagramCommentTask' ||
        task.__typename === 'InstagramCommentAccountTask') && (
        <CommentsIcon className={c.icon} />
      )}
      {(task.__typename === 'InstagramStoryTask' ||
        task.__typename === 'AvailableInstagramStoryTask' ||
        task.__typename === 'InstagramStoryAccountTask') && (
        <StoryIcon className={c.icon} />
      )}{' '}
      {!onlyIcon && <span className={c.type}>{t(task.taskType?.name)}</span>}
    </Typography>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      textTransform: 'capitalize',
    },
    icon: {
      width: 14,
      height: 14,
    },
    type: {
      marginLeft: t.spacing(0.7),
      fontSize: 15,
      lineHeight: '16px',
    },
  }),
);
