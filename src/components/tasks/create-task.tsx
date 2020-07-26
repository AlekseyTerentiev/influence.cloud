import React, { FC, useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramCommentTask } from 'gql/tasks';
import { navigate, Link } from '@reach/router';
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
        label='Post Url'
        placeholder='https://www.instagram.com/p/CCEMRtuscla'
        id='postUrl'
        name='postUrl'
        value={newTaskData.postUrl}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        autoFocus
        // required
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label='Description (optional)'
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
        label={'Budget'}
        // label={notEnoughtMoney ? 'Недостаточно средств на счету' : 'Budget'}
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
        <InputLabel shrink={true}>{t('Expired At')}</InputLabel>
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
        label='Bonus'
        id='bonusRate'
        name='bonusRate'
        placeholder='0'
        value={newTaskData.bonusRate || ''}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        helperText={
          'Наличие чаевых выделяет ваше задание и позволяет привлечь более качественных исполнителей'
        }
        InputProps={{
          startAdornment: <InputAdornment position='start'>%</InputAdornment>,
        }}
        inputProps={{
          min: 0,
          max: 100,
        }}
      />

      <Box mt={0.5} />

      <Box color='info.main'>
        <Typography variant='body2'>
          Примерное кол-во выполнений:{' '}
          {Math.floor(
            (newTaskData.totalBudget * 100) /
              (taskType.averageCost +
                (taskType.averageCost * newTaskData.bonusRate) / 100),
          )}
        </Typography>
      </Box>

      <Box mt={1.6} />

      {notEnoughtMoney ? (
        <>
          <Typography color='error' variant='body2' gutterBottom>
            Недостаточно средств на счету
          </Typography>

          <Button
            href={BILLING_ROUTE}
            onClick={handleRefillClick}
            color='primary'
            size='large'
            variant='contained'
            fullWidth
            style={{ backgroundColor: '#32b336' }}
          >
            Пополнить баланс
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
            <CircularProgress style={{ width: 24, height: 24 }} />
          ) : (
            t('Submit')
          )}
        </Button>
      )}

      {creatingError && (
        <Typography color='error' style={{ marginTop: 14 }}>
          {creatingError && creatingError.message}
        </Typography>
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
