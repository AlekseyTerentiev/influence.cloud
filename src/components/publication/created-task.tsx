import React, { FC, useState } from 'react';
import { useStyles } from './created-task.s';
import { useTranslation } from 'react-i18next';
import { useCreatedTasks } from 'gql/created-tasks';
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

  const task = createdTasks?.find((task) => task.id === taskId);

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
    // return <Error name={t('Task not found')} />;
    return null;
  }

  return (
    <Box className={c.root}>
      <Typography className={c.label}>Task info</Typography>
      <Box className={c.taskInfoContainer}>
        <Typography className={c.type}>
          {t(task.taskType?.name)} Task #{task.id}
        </Typography>
        <Typography>
          <CreatedTaskStatus status={task.status} taskExpiredAt={task.expiredAt} />
        </Typography>
      </Box>

      <Box mt={1.5}>
        <Typography className={c.label}>Budget Info</Typography>
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
        <Typography className={c.label}>Description</Typography>
        <Typography className={task.description ? '' : c.hint}>
          {task.description || 'No description'}
        </Typography>
      </Box>

      {task.__typename === 'InstagramCommentTask' && (
        <Box mt={1.5} mb={2}>
          <Typography className={c.label} style={{ marginBottom: 8 }}>
            Target Post
          </Typography>
          <PostDescription post={task.post} />
        </Box>
      )}

      {task.__typename === 'InstagramStoryTask' && task.websiteUrl && (
        <Box mt={1.5}>
          <Typography className={c.label}>Destination Link</Typography>
          <Link className={c.link} href={task.websiteUrl} target='_blank'>
            {task.websiteUrl}
          </Link>
        </Box>
      )}

      {task.__typename === 'InstagramStoryTask' && task.accountUsername && (
        <Box mt={1.5}>
          <Typography className={c.label}>Destination Account</Typography>
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
          <Typography className={c.label}>Attached Files</Typography>
          {task.layoutMediaUrls.length === 0 ? (
            <Typography className={c.hint}>No attached files</Typography>
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
        <Typography className={c.label}>Filters</Typography>

        <Typography className={c.filter}>
          Countries:{' '}
          {task?.countries?.length
            ? task.countries.map((v) => Countries.getName(v)).join(', ')
            : 'any'}
        </Typography>

        <Typography className={c.filter}>
          Languages:{' '}
          {task?.languages?.length
            ? task.languages.map((v) => t(languagesNames[v])).join(', ')
            : 'any'}
        </Typography>

        {filtersExpand && (
          <>
            <Typography className={c.filter}>
              Genders: {task?.genders?.length ? task.genders.join(', ') : 'any'}
            </Typography>

            {task.followers !== 0 && (
              <Typography className={c.filter}>
                Min followers: {task.followers}
              </Typography>
            )}

            {task.ageFrom !== 0 && (
              <Typography className={c.filter}>Age from: {task.ageFrom}</Typography>
            )}

            {task.ageTo !== 0 && (
              <Typography className={c.filter}>Age to: {task.ageTo}</Typography>
            )}

            {'costFrom' in task && (
              <Typography className={c.filter}>
                Cost from: <Currency value={task.costFrom} />
              </Typography>
            )}
            {'costTo' in task && (
              <Typography className={c.filter}>
                Cost to: <Currency value={task.costTo} />
              </Typography>
            )}

            {'needApprove' in task && (
              <Typography className={c.filter}>
                Need approve: {task.needApprove ? 'yes' : 'no'}
              </Typography>
            )}
          </>
        )}

        <Button
          size='small'
          className={c.expandButton}
          onClick={() => setFiltersExpand(!filtersExpand)}
        >
          {filtersExpand ? 'show less' : '... show more'}
        </Button>
      </Box>

      <Box mt={1.5}>
        <CreatedTaskExecutions task={task} />
      </Box>
    </Box>
  );
};
