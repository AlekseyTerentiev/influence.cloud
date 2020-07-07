import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramCommentTask } from 'gql';
import moment from 'moment';

export interface CreateTaskProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: () => void;
}

export const CreateTask: FC<CreateTaskProps> = ({ taskType, onCreate }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [
    createInstagramCommentTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramCommentTask();

  const [newTaskData, setNewTaskData] = useState<{
    postUrl: string;
    description: string;
    expireAt: Date;
    totalBudget: number;
    bonusRate: number;
  }>({
    postUrl: '',
    description: '',
    expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    totalBudget: 10, // In dollars
    bonusRate: 10,
  });

  function handleChange(e: ChangeEvent<any>) {
    setNewTaskData({
      ...newTaskData,
      [e.target.name]:
        e.target.type === 'number' ? Number(e.target.value) : e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (taskType.name === 'comment') {
      await createInstagramCommentTask({
        variables: {
          ...newTaskData,
          taskTypeId: taskType.id,
          totalBudget: newTaskData.totalBudget * 100,
        },
      });
    }
    if (onCreate) {
      onCreate();
    }
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
        label='Budget'
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

      <TextField
        type='date'
        label={'Expired Date'}
        id='expireAt'
        name='expireAt'
        value={moment(newTaskData.expireAt).format('YYYY-MM-DD')}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
      />

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

      <Box mt={1} />

      <Typography variant='body2'>
        Примерное кол-во выполнений:{' '}
        {Math.floor(
          (newTaskData.totalBudget * 100) /
            (taskType.averageCost +
              (taskType.averageCost * newTaskData.bonusRate) / 100),
        )}
      </Typography>

      <Box mt={2} />

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
          !newTaskData.expireAt
        }
      >
        {t('Submit')}
      </Button>

      {creatingError && (
        <Typography color='error' style={{ marginTop: 8 }}>
          {creatingError && creatingError.message}
        </Typography>
      )}
    </form>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
    },
  }),
);
