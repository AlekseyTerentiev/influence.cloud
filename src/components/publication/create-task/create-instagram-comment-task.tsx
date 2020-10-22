import React, { FC, useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramCommentTask } from 'gql/created-tasks';
import { navigate } from '@reach/router';
import { BILLING_ROUTE } from 'routes';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';
import { AccountLanguage } from 'gql/types/globalTypes';
import { Gender } from 'gql/types/globalTypes';
import { TaskFilters, CreateTaskFilters } from './create-task-filters';

export interface CreateInstagramCommentTaskProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: (taskId: number) => void;
}

export const CreateInstagramCommentTask: FC<CreateInstagramCommentTaskProps> = ({
  taskType,
  onCreate,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [postUrl, setPostUrl] = useState('');
  const [totalBudget, setTotalBudget] = useState('5');
  const [bonusRate, setBonusRate] = useState('10');
  const [description, setDescription] = useState('');

  const [filters, setFilters] = useState<TaskFilters>({
    countries: ['US'],
    languages: [AccountLanguage.en],
    gender: Gender.male,
    ageFrom: '16',
    ageTo: '40',
  });

  const handleFiltersChange = (filters: TaskFilters) => {
    setFilters(filters);
  };

  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const { me } = useMe();
  const handleRefillClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  };

  const [
    createInstagramCommentTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramCommentTask();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdTask = await createInstagramCommentTask({
      variables: {
        postUrl,
        description,
        taskTypeId: taskType.id,
        totalBudget: Math.round(Number(totalBudget) * 100),
        bonusRate: Number(bonusRate),
        expiredAt,
        country: filters.countries,
        languages: filters.languages,
        gender: filters.gender,
        ageFrom: Number(filters.ageFrom),
        ageTo: Number(filters.ageTo),
      },
    });
    const createdTaskId = createdTask.data?.createInstagramCommentTask?.id;
    if (!createdTaskId) {
      return;
    }
    (window as any).gtag('event', 'task-create', {
      type: taskType.type,
      budget: totalBudget,
    });
    if (onCreate) {
      onCreate(createdTaskId);
    }
  };

  const notEnoughtMoney = Number(totalBudget) * 100 > (me?.balance?.balance || 0);
  const submitDisabled =
    creating || notEnoughtMoney || !Number(totalBudget) || !expiredAt || !postUrl;

  return (
    <form onSubmit={handleSubmit}>
      <TaskBudgetInput
        // averageCost={taskType.averageCost}
        // companyCommission={taskType.companyCommission}
        budget={totalBudget}
        bonus={bonusRate}
        onBudgetChange={setTotalBudget}
        onBonusChange={setBonusRate}
      />

      <Box mt={1.5} />

      <Typography className={c.label}>Influensers Filters</Typography>
      <CreateTaskFilters filters={filters} onChange={handleFiltersChange} />

      <TextField
        type='url'
        label={t('Post Url')}
        placeholder='https://www.instagram.com/p/CCEMRtuscla'
        name='postUrl'
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

      {creatingError && <Error error={creatingError} />}

      <Box mt={2} />

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
          disabled={submitDisabled}
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
    root: {},
    label: {
      color: 'rgba(193, 194, 208, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
      marginBottom: t.spacing(0.5),
    },
  }),
);
