import React, { FC, useState, ChangeEvent } from 'react';
import { useStyles } from './available-task.s';
import { useTranslation } from 'react-i18next';
import { useAvailableTasks } from 'gql/available-tasks';
import { useTakeInstagramCommentTask } from 'gql/instagram-comment-task';
import { navigate } from '@reach/router';
import { accountTaskRoute } from 'routes';
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { PostDescription } from 'components/common/post-description';

export interface AvailableTaskProps {
  accountId: number;
  taskId: number;
}

export const AvailableTask: FC<AvailableTaskProps> = ({ accountId, taskId }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { availableTasks, loading, error } = useAvailableTasks({ accountId });

  const [
    takeInstagramCommentTask,
    { loading: taking, error: takingError },
  ] = useTakeInstagramCommentTask(accountId, taskId);

  const [customerWishesAgreed, setCustomerWishesAgreed] = useState(false);
  const handleCustomerWishesAgreedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerWishesAgreed(e.target.checked);
  };

  const handleTakeTask = async () => {
    const takenTask = await takeInstagramCommentTask({
      variables: { accountId, taskId },
    });

    const takenTaskId = takenTask.data?.takeInstagramCommentTask?.id;
    if (takenTaskId) {
      navigate(accountTaskRoute(accountId, takenTaskId));
    }
  };

  const task = availableTasks?.find((task) => task.id === taskId);
  const tip = task ? Math.round((task.reward * task.bonusRate) / 100) : 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading error')} error={error} />;
  }

  if (!task) {
    return <Error name={t('Task not found')} />;
  }

  return (
    <Box className={c.root}>
      {'post' in task && <PostDescription post={task.post} />}

      <Box mt={2.5} display='flex' justifyContent='space-between'>
        <Box>
          <Currency className={c.reward} value={task.reward + tip} />
          <Typography color='textSecondary'>
            <Currency value={task.reward} /> + {t('tip')} <Currency value={tip} />
          </Typography>
        </Box>
        <Box mt={0.5} textAlign='right'>
          <Typography className={c.taskType}>
            {t(task.taskType?.name || '')} #{task.id}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {t('Payout')}: {t('instant')}
          </Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography className={c.label}>{t('Requirements')}:</Typography>

        {task.description ? (
          <FormGroup className={c.requirements}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  className={c.checkbox}
                  name='defaultRequirementAgreed'
                  color='primary'
                />
              }
              label={`${t('Join discussion')} (${t('minimum 4 words')})`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCustomerWishesAgreedChange}
                  className={c.checkbox}
                  name='customerWishesAgreed'
                  color='primary'
                />
              }
              label={task.description}
            />
          </FormGroup>
        ) : (
          <Typography>
            {t('Join discussion')} ({t('minimum 4 words')})
          </Typography>
        )}
      </Box>

      {takingError && <Error error={takingError} />}

      <Box mt={2.5} display='flex'>
        <Button
          target='_blank'
          href={('post' in task && task.post.url) || ''}
          color='primary'
          variant='outlined'
          fullWidth
        >
          {t('Open post')}
        </Button>

        <Button
          color='primary'
          variant='contained'
          fullWidth
          style={{ marginLeft: 8 }}
          disabled={(task.description && !customerWishesAgreed) || taking}
          onClick={handleTakeTask}
        >
          {t('Accept')}
        </Button>
      </Box>
    </Box>
  );
};
