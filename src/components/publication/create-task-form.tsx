import React, { FC, useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramCommentTask } from 'gql/task-create';
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
import { Error } from 'components/common/error';

export interface CreateTaskFormProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: () => void;
}

export const CreateTaskForm: FC<CreateTaskFormProps> = ({ taskType, onCreate }) => {
  const { t } = useTranslation();
  const c = useStyles();

  const { me } = useMe();

  const [newTaskData, setNewTaskData] = useState<{
    postUrl: string;
    description: string;
  }>({
    postUrl: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskData({
      ...newTaskData,
      [e.target.name]: e.target.value,
    });
  };

  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const getTaskCost = (tips: number | string) => {
    const costWithComission =
      taskType.averageCost +
      taskType.averageCost * taskType.companyCommission * 0.01;
    return costWithComission + costWithComission * Number(tips) * 0.01;
  };

  const getBudget = (taskCost: number | string, executions: number | string) =>
    Math.ceil(Number(taskCost) * Number(executions));

  const [executions, setExecutions] = useState('1');
  const [tips, setTips] = useState('10');
  const taskCost = getTaskCost(tips);
  const [budget, setBudget] = useState(
    (getBudget(taskCost, Number(executions)) / 100).toFixed(2),
  );

  const notEnoughtMoney = Number(budget) * 100 > (me?.balance?.balance || 0);

  const handleExecutionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const executions = e.target.value.replace(/\D/, '');
    setExecutions(executions);
    const budget = Math.ceil(Number(taskCost) * Number(executions));
    setBudget((budget / 100).toFixed(2));
  };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
    const budget = parseFloat(e.target.value.replace(',', '.')) || 0;
    setExecutions(Math.floor((Number(budget) * 100) / Number(taskCost)).toString());
  };

  const handleTipsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTips(e.target.value);
    setBudget((getBudget(getTaskCost(e.target.value), executions) / 100).toFixed(2));
  };

  const [
    createInstagramCommentTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramCommentTask();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdTask = await createInstagramCommentTask({
      variables: {
        ...newTaskData,
        taskTypeId: taskType.id,
        totalBudget: Math.round(Number(budget) * 100),
        bonusRate: Number(tips),
        expiredAt,
      },
    });
    const createdTaskId = createdTask.data?.createInstagramCommentTask?.id;
    if (createdTaskId) {
      navigate(createdTaskRoute(createdTaskId));
    }
    (window as any).gtag('event', 'create-task', { budget });
    if (onCreate) {
      onCreate();
    }
  };

  const handleRefillClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  };

  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography className={c.header}>{t(taskType.title)}</Typography>
      <Typography className={c.subheader}>
        {/* {t(taskType.description)} */}
        {t(
          'Increase activity on your post with relevant questions from members of our community',
        )}
      </Typography>

      <TextField
        type='url'
        label={t('Post Url')}
        placeholder='https://www.instagram.com/p/CCEMRtuscla'
        name='postUrl'
        value={newTaskData.postUrl}
        onChange={handleChange}
        variant='outlined'
        margin='dense'
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label={t('Additional wishes')}
        placeholder={`(${t('optional')})`}
        InputLabelProps={{ shrink: true }}
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

      <Box display='flex'>
        <TextField
          type='number'
          inputProps={{
            step: 0.01,
          }}
          label={t('Budget')}
          name='budget'
          value={budget}
          onChange={handleBudgetChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        />

        <TextField
          select
          label={t('Tips')}
          name='tips'
          value={tips}
          onChange={handleTipsChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
          }}
          SelectProps={{
            native: true,
          }}
          style={{ marginLeft: 10 }}
        >
          {Array.from(Array(21).keys()).map((i) => (
            <option key={i} value={i * 5}>
              {i * 5}
            </option>
          ))}
        </TextField>

        <TextField
          type='number'
          label={t('Executions')}
          placeholder='0'
          name='executions'
          value={executions}
          onChange={handleExecutionsChange}
          variant='outlined'
          margin='dense'
          fullWidth
          style={{ marginLeft: 10 }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>~</InputAdornment>,
          }}
        />
      </Box>

      <Box ml={1} color='text.hint'>
        <Typography style={{ fontSize: '0.85rem' }}>
          {t(
            'Tips make your assignment stand out and allows you to attract better performers',
          )}
        </Typography>
      </Box>

      <Box mt={0.75} />

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
            !Number(budget) ||
            !Number(executions) ||
            !expiredAt ||
            notEnoughtMoney
            // !newTaskData.expiredAt
          }
        >
          {creating ? (
            <CircularProgress style={{ width: 28, height: 28 }} />
          ) : (
            t('Publish')
          )}
        </Button>
      )}
    </form>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingTop: t.spacing(1),
    },
    header: {
      textAlign: 'center',
      fontSize: t.typography.h5.fontSize,
      fontWeight: t.typography.h5.fontWeight,
      marginBottom: t.spacing(0.5),
    },
    subheader: {
      textAlign: 'center',
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
      marginBottom: t.spacing(1.75),
    },
  }),
);
