import React, { FC, useState, useMemo, MouseEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
// import { useGetTaskTypeCost } from 'gql/task-types';
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
  IconButton,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';
import { AccountLanguage, Gender } from 'gql/types/globalTypes';
import { TaskFilters, CreateTaskFilters } from './create-task-filters';
import { LeftOutlined } from '@ant-design/icons';
import { Currency } from 'components/billing/currency';

const getFullTaskCost = (
  cost: number,
  companyCommission: number,
  bonus: number | string,
) => {
  const costWithComission = cost + cost * companyCommission * 0.01;
  return costWithComission + costWithComission * Number(bonus) * 0.01;
};

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

  const [viewIndex, setViewIndex] = useState(0);

  const [postUrl, setPostUrl] = useState('');
  const [totalBudget, setTotalBudget] = useState('5');
  const [bonusRate, setBonusRate] = useState('10');
  const [description, setDescription] = useState('');

  const [filters, setFilters] = useState<TaskFilters>({
    countries: ['US'],
    languages: [AccountLanguage.en],
    genders: [Gender.male, Gender.female],
    ageFrom: '18',
    ageTo: '65',
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

  // const [getTaskTypeCost, { data: taskTypeCostData }] = useGetTaskTypeCost();

  // useEffect(() => {
  //   getTaskTypeCost({
  //     variables: { id: taskType.id, country: filters.countries[0] },
  //   });
  // }, [filters.countries]);

  // const thousandViews = useMemo(() => {
  //   return taskTypeCostData?.taskTypeCost
  //     ? _.round(
  //         (Number(totalBudget) * 100) /
  //           Number(taskTypeCostData?.taskTypeCost.costForThousand),
  //         1,
  //       )
  //     : 0;
  // }, [totalBudget, taskTypeCostData?.taskTypeCost.costForThousand]);

  const executions = useMemo(() => {
    return Math.floor(
      (Number(totalBudget) * 100) /
        getFullTaskCost(taskType.averageCost, taskType.companyCommission, bonusRate),
    );
  }, [totalBudget, taskType, bonusRate]);

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
        countries: filters.countries,
        languages: filters.languages,
        genders: filters.genders,
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
  const budgetValid = Number(totalBudget) && !notEnoughtMoney;
  const filtersValid =
    executions !== 0 &&
    filters.countries.length &&
    filters.languages.length &&
    filters.genders.length;
  const submitDisabled =
    creating || !budgetValid || !filtersValid || !expiredAt || !postUrl;

  const handleNextClick = (e: FormEvent) => {
    e.preventDefault();
    setViewIndex(viewIndex + 1);
  };

  const handleBackClick = () => {
    setViewIndex(viewIndex - 1);
  };

  const BackButton = () => (
    <IconButton
      onClick={handleBackClick}
      size='small'
      edge='start'
      className={c.backButton}
    >
      <LeftOutlined />
    </IconButton>
  );

  const NextButton = ({ disabled }: { disabled: boolean }) => (
    <Button
      type='submit'
      color='primary'
      size='large'
      variant='contained'
      fullWidth
      disabled={disabled}
    >
      {t('Next')}
    </Button>
  );

  return (
    <>
      {viewIndex === 0 && (
        <form onSubmit={handleNextClick}>
          <div className={c.predict}>
            <Box>
              <Typography className={c.predictValue}>
                {/* {thousandViews.toFixed(2)}k */}
                <Currency value={taskType.averageCost} />
              </Typography>
              <Typography className={c.predictLabel}>comment price</Typography>
            </Box>
            <Box textAlign='right'>
              <Typography className={c.predictValue}>~{executions}</Typography>
              <Typography className={c.predictLabel}>comments</Typography>
            </Box>
          </div>

          <TaskBudgetInput
            // averageCost={taskType.averageCost}
            // companyCommission={taskType.companyCommission}
            budget={totalBudget}
            bonus={bonusRate}
            onBudgetChange={setTotalBudget}
            onBonusChange={setBonusRate}
          />

          <Box mt={1.75} />

          <Typography className={c.label}>Influensers Filters</Typography>
          <CreateTaskFilters filters={filters} onChange={handleFiltersChange} />

          <Box mt={2} />

          {!notEnoughtMoney && (
            <NextButton disabled={!budgetValid || !filtersValid} />
          )}
        </form>
      )}

      {viewIndex === 1 && (
        <form onSubmit={handleSubmit}>
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

          <Box mt={2} />

          <Box display='flex'>
            <BackButton />
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
          </Box>
        </form>
      )}

      {creatingError && <Error error={creatingError} />}

      {notEnoughtMoney && (
        <Box>
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
        </Box>
      )}
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    predict: {
      padding: t.spacing(0.5, 0, 1.75),
      display: 'flex',
      justifyContent: 'space-between',
    },
    predictValue: {
      color: t.palette.primary.main,
      fontWeight: t.typography.fontWeightBold,
      fontSize: '1.35rem',
    },
    predictLabel: {
      fontSize: '0.95rem',
      lineHeight: 1.2,
      color: '#48484a',
    },
    label: {
      color: 'rgba(166, 167, 177, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
      marginBottom: t.spacing(0.5),
    },
    backButton: {
      marginRight: t.spacing(1),
      color: t.palette.text.hint,
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius,
      padding: 11,
    },
  }),
);
