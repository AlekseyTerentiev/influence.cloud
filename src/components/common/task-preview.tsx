import React, { FC, HTMLAttributes } from 'react';
import { GetCreatedTasks_createdTasks_tasks } from 'gql/types/GetCreatedTasks';
import { GetAvailableTasks_availableTasks_tasks } from 'gql/types/GetAvailableTasks';
import { GetAccountTasks_accountTasks } from 'gql/types/GetAccountTasks';
import { makeStyles, createStyles, Theme, lighten, Box } from '@material-ui/core';
import { ReactComponent as StoryIcon } from 'img/story.svg';
import clsx from 'clsx';

export interface TaskPreviewProps extends HTMLAttributes<HTMLDivElement> {
  task:
    | GetCreatedTasks_createdTasks_tasks
    | GetAvailableTasks_availableTasks_tasks
    | GetAccountTasks_accountTasks;
}

export const TaskPreview: FC<TaskPreviewProps> = ({ task, ...props }) => {
  const c = useStyles();

  return (
    <Box {...props} className={clsx(c.root, props.className)}>
      {'post' in task && (
        <img
          className={c.preview}
          src={task.post.smallPreviewUrl || ''}
          alt='preview'
        />
      )}
      {task.taskType.type === 'instagram_story' && (
        <div className={c.preview}>
          <StoryIcon />
        </div>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      height: t.spacing(6),
      width: t.spacing(6),
      borderRadius: t.shape.borderRadius,
      background: 'rgba(244, 245, 248, 1)',
      marginRight: t.spacing(1),
      overflow: 'hidden',
    },
    preview: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: lighten(t.palette.text.primary, 0.3),
    },
  }),
);
