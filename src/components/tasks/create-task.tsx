import React, { FC, useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramCommentTask } from 'gql/tasks';
import { navigate } from '@reach/router';
import { createdTaskRoute, BILLING_ROUTE } from 'routes';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Error } from 'components/error';

export interface CreateTaskProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: () => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ taskType, onCreate }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const { me } = useMe();

  const [
    createInstagramCommentTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramCommentTask();

  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const [newTaskData, setNewTaskData] = useState<{
    postUrl: string;
    description: string;
    // expiredAt: Date;
    totalBudget: number;
    bonusRate: number;
  }>({
    postUrl: '',
    description: '',
    // expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    totalBudget: 10, // In dollars
    bonusRate: 10,
  });

  const notEnoughtMoney =
    newTaskData.totalBudget * 100 > (me?.balance?.balance || 0);

  function handleChange(e: ChangeEvent<any>) {
    setNewTaskData({
      ...newTaskData,
      [e.target.name]:
        e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const createdTask = await createInstagramCommentTask({
      variables: {
        ...newTaskData,
        taskTypeId: taskType.id,
        totalBudget: newTaskData.totalBudget * 100,
        expiredAt,
      },
    });

    const createdTaskId = createdTask.data?.createInstagramCommentTask?.id;
    if (createdTaskId) {
      navigate(createdTaskRoute(createdTaskId));
    }

    if (onCreate) {
      onCreate();
    }
  }

  function handleRefillClick(e: MouseEvent) {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  }

  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography variant='h4'>{t(taskType.title)}</Typography>
      <Box mt={1} />
      <Typography variant='body2' color='textSecondary'>
        {t(taskType.description)}
      </Typography>

      <Box mt={2.5} />

      <TextField
        type='url'
        label={t('Post Url')}
        placeholder='https://www.instagram.com/p/CCEMRtuscla'
        id='postUrl'
        name='postUrl'
        value={newTaskData.postUrl}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        // autoFocus
        // required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label={`${t('Task description')} (${t('optional')})`}
        placeholder=''
        id='description'
        name='description'
        value={newTaskData.description}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        multiline
        rows={1}
        rowsMax={3}
      />

      <TextField
        type='number'
        label={t('Budget')}
        // label={notEnoughtMoney ? t('') : t('Budget')}
        // error={notEnoughtMoney}
        placeholder='0'
        id='totalBudget'
        name='totalBudget'
        value={newTaskData.totalBudget || ''}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
        inputProps={{
          min: 0,
        }}
      />

      <FormControl fullWidth margin='dense' variant='outlined'>
        <InputLabel shrink={true}>{t('Expired at')}</InputLabel>
        <DatePicker
          id='expiredAt'
          name='expiredAt'
          inputVariant='outlined'
          value={expiredAt}
          // format='MM/DD/YYYY'
          onChange={handleExpiredDateChange}
          variant='inline'
          autoOk={true}
        />
      </FormControl>

      <TextField
        type='number'
        label={t('Tips')}
        id='bonusRate'
        name='bonusRate'
        placeholder='0'
        value={newTaskData.bonusRate || ''}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        helperText={t(
          'Tips make your assignment stand out and allows you to attract better performers',
        )}
        InputProps={{
          startAdornment: <InputAdornment position='start'>%</InputAdornment>,
        }}
        inputProps={{
          min: 0,
          max: 100,
        }}
      />

      <Box mt={0.75} />

      <Box color='info.main'>
        <Typography variant='body2'>
          {t('Approximate number of executions')}:{' '}
          {Math.floor(
            (newTaskData.totalBudget * 100) /
              (taskType.averageCost +
                (taskType.averageCost * newTaskData.bonusRate) / 100),
          )}
        </Typography>
      </Box>

      {creatingError && <Error error={creatingError} />}

      <Box mt={1.5} />

      {notEnoughtMoney ? (
        <>
          <Error error={t('Insufficient funds on the balance')} />

          <Button
            href={BILLING_ROUTE}
            onClick={handleRefillClick}
            color='primary'
            size='large'
            variant='contained'
            fullWidth
            style={{ backgroundColor: '#32b336', marginTop: 10 }}
          >
            {t('Top up balance')}
          </Button>
        </>
      ) : (
        <Button
          type='submit'
          color='primary'
          size='large'
          variant='contained'
          fullWidth
          disabled={
            creating ||
            !newTaskData.postUrl ||
            !newTaskData.totalBudget ||
            !expiredAt ||
            notEnoughtMoney
            // !newTaskData.expiredAt
          }
        >
          {creating ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
          ) : (
            t('Submit')
          )}
        </Button>
      )}
    </form>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  }),
);
