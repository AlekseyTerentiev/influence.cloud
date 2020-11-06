import React, { FC, useState } from 'react';
import { useStyles } from './created-task.s';
import { useTranslation } from 'react-i18next';
import { useCreatedTasks, useCreatedTask } from 'gql/created-tasks';
import { useCancelTask } from 'gql/created-tasks';
import { Box, Typography, Button, Link } from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { PostDescription } from 'components/common/post-description';
import { Currency } from 'components/billing/currency';
import { CreatedTaskStatus } from 'components/publication/created-task-status';
import { CreatedTaskExecutions } from 'components/publication/created-task-executions';
import Countries from 'country-list';
import { languagesNames } from 'components/common/input/language-select';

export interface CreatedTaskProps {
  taskId: number;
}

export const CreatedTask: FC<CreatedTaskProps> = ({ taskId }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { createdTasks, loading, error } = useCreatedTasks();
  const { createdTask } = useCreatedTask({ taskId });
  const task = createdTasks?.find((task) => task.id === taskId) || createdTask;

  const [
    cancelTask,
    { loading: cancelProcessing, error: cancelError },
  ] = useCancelTask();

  const [cancelTaskDialogOpen, setCancelTaskDialogOpen] = useState(false);
  const handleCancelTaskClick = () => {
    setCancelTaskDialogOpen(true);
  };
  const handleCancelTaskDialogClose = () => {
    setCancelTaskDialogOpen(false);
  };
  const handleCancelTaskSubmit = () => {
    cancelTask({ variables: { taskId } });
    handleCancelTaskDialogClose();
  };

  const [filtersExpand, setFiltersExpand] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={t('Loading Error')} error={error} />;
  }

  if (!task) {
    return null;
    // return <Error name={t('Task not found')} />;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.label}>{t('Task info')}</Typography>
      <Box className={c.taskInfoContainer}>
        <Typography className={c.type}>
          {t(task.taskType?.name)} #{task.id}
        </Typography>
        <Typography>
          <CreatedTaskStatus status={task.status} taskExpiredAt={task.expiredAt} />
        </Typography>
      </Box>

      <Box mt={1.5}>
        <Typography className={c.label}>{t('Budget Info')}</Typography>
        <Box display='flex'>
          <Typography className={c.spent}>
            {t('Spent')}:{' '}
            <Currency value={Math.round(task.totalBudget - task.currentBudget)} />
          </Typography>
          <Box ml='auto' />
          <Typography className={c.budget}>
            {t('Budget')}: <Currency value={task.totalBudget} />
          </Typography>

          <Typography className={c.tip}>
            {t('Tip')}: {task.bonusRate}%
          </Typography>
        </Box>
      </Box>

      <Box mt={1.5}>
        <Typography className={c.label}>{t('Description')}</Typography>
        <Typography className={task.description ? '' : c.hint}>
          {task.description || 'No description'}
        </Typography>
      </Box>

      {task.__typename === 'InstagramCommentTask' && (
        <Box mt={1.5} mb={2}>
          <Typography className={c.label} style={{ marginBottom: 8 }}>
            {t('Target Post')}
          </Typography>
          <PostDescription post={task.post} />
        </Box>
      )}

      {task.__typename === 'InstagramStoryTask' && task.websiteUrl && (
        <Box mt={1.5}>
          <Typography className={c.label}>{t('Destination Link')}</Typography>
          <Link className={c.link} href={task.websiteUrl} target='_blank'>
            {task.websiteUrl}
          </Link>
        </Box>
      )}

      {task.__typename === 'InstagramStoryTask' && task.accountUsername && (
        <Box mt={1.5}>
          <Typography className={c.label}>{t('Mention Account')}</Typography>
          <Link
            className={c.link}
            href={'https://www.instagram.com/' + task.accountUsername}
            target='_blank'
            noWrap
          >
            @{task.accountUsername}
          </Link>
        </Box>
      )}

      {task.__typename === 'InstagramStoryTask' && (
        <Box mt={1.5} mb={2}>
          <Typography className={c.label}>{t('Attached Files')}</Typography>
          {task.layoutMediaUrls.length === 0 ? (
            <Typography className={c.hint}>{t('No attached files')}</Typography>
          ) : (
            <Box mb={2}>
              {task.layoutMediaUrls.map((url) => (
                <img key={url} src={url} className={c.layoutMedia} alt='' />
              ))}
            </Box>
          )}
        </Box>
      )}

      {task.status === 'inProgress' && (
        <Box mt={1.5} mb={1.5}>
          <Typography className={c.label}>{t('Cancel task')}</Typography>
          <Button
            variant='text'
            onClick={handleCancelTaskClick}
            size='small'
            className={c.cancelButton}
          >
            {t('Cancel task')}
          </Button>
          <Modal
            open={cancelTaskDialogOpen}
            onClose={handleCancelTaskDialogClose}
            fullWidthOnMobile={false}
          >
            <Typography variant='h5' gutterBottom>
              {t('Remove the task from publication')}?
            </Typography>
            <Button
              color='secondary'
              variant='contained'
              onClick={handleCancelTaskSubmit}
              disabled={cancelProcessing}
              style={{ margin: 'auto' }}
            >
              {t('Remove from publication')}
            </Button>
            {cancelError && <Error error={cancelError} textAlign='left' />}
          </Modal>
        </Box>
      )}

      <Box mt={1.5}>
        <Typography className={c.label}>{t('Filters')}</Typography>

        <Typography className={c.filter}>
          {t('Geo')}:{' '}
          {task?.countries?.length
            ? task.countries.map((v) => Countries.getName(v)).join(', ')
            : t('any')}
        </Typography>

        <Typography className={c.filter}>
          {t('Languages')}:{' '}
          {task?.languages?.length
            ? task.languages.map((v) => t(languagesNames[v])).join(', ')
            : t('any')}
        </Typography>

        {filtersExpand && (
          <>
            <Typography className={c.filter}>
              {t('Gender')}:{' '}
              {task?.genders?.length
                ? task.genders.map((v) => t(v)).join(', ')
                : t('any')}
            </Typography>

            {task.followers !== 0 && (
              <Typography className={c.filter}>
                {t('Min Followers')}: {task.followers}
              </Typography>
            )}

            {task.ageFrom !== 0 && (
              <Typography className={c.filter}>
                {t('Min Age')}: {task.ageFrom}
              </Typography>
            )}

            {task.ageTo !== 0 && (
              <Typography className={c.filter}>
                {t('Max Age')}: {task.ageTo}
              </Typography>
            )}

            {'costFrom' in task && (
              <Typography className={c.filter}>
                {t('Min Reward')}: <Currency value={task.costFrom} />
              </Typography>
            )}
            {'costTo' in task && (
              <Typography className={c.filter}>
                {t('Max Reward')}: <Currency value={task.costTo} />
              </Typography>
            )}

            {'needApprove' in task && (
              <Typography className={c.filter}>
                {t('Need Approve')}: {task.needApprove ? t('yes') : t('no')}
              </Typography>
            )}
          </>
        )}

        <Button
          size='small'
          className={c.expandButton}
          onClick={() => setFiltersExpand(!filtersExpand)}
        >
          {filtersExpand ? t('show less') : '... ' + t('show more')}
        </Button>
      </Box>

      <Box mt={1.5}>
        <CreatedTaskExecutions task={task} />
      </Box>
    </Box>
  );
};
