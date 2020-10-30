import React, { FC, useState, useMemo, MouseEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useTaskTypeCosts } from 'gql/task-types';
import { useCreateInstagramStoryTask } from 'gql/created-tasks';
import { navigate } from '@reach/router';
import { BILLING_ROUTE } from 'routes';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LeftOutlined } from '@ant-design/icons';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';
import { MediaInput } from 'components/common/input/media-input';
import { AccountLanguage, Gender } from 'gql/types/globalTypes';
import { TaskFilters, CreateTaskFilters } from './create-task-filters';
import { Slider } from 'components/common/input/slider';
import { useStyles } from './create-instagram-story-task.s';
import _ from 'lodash';

const getFullTaskCost = (
  cost: number,
  companyCommission: number,
  bonus: number | string,
) => {
  const costWithComission = cost + cost * companyCommission * 0.01;
  return costWithComission + costWithComission * Number(bonus) * 0.01;
};

export interface CreateInstagramStoryTaskProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: (taskId: number) => void;
}

export const CreateInstagramStoryTask: FC<CreateInstagramStoryTaskProps> = ({
  taskType,
  onCreate,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [viewIndex, setViewIndex] = useState(0);

  const [websiteUrlEnabled, setWebsiteUrlEnabled] = useState(true);
  const [accountUsernameEnabled, setAccountUsernameEnabled] = useState(false);
  const [accountUsername, setAccountUsername] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [totalBudget, setTotalBudget] = useState('50');
  const [bonusRate, setBonusRate] = useState('10');
  const [description, setDescription] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);
  const [layoutMediaUrls, setLayoutMediaUrls] = useState<string[]>([]);
  const [needApprove, setNeedApprove] = useState(false);
  const [cost, setCost] = useState<number[]>([100, 5000]);
  const [filters, setFilters] = useState<TaskFilters>({
    countries: ['US'],
    languages: [AccountLanguage.en],
    genders: [Gender.male, Gender.female],
    ageFrom: '18',
    ageTo: '65',
    followersAmount: '100',
  });

  const handleFiltersChange = (filters: TaskFilters) => {
    setFilters(filters);
  };

  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const { me } = useMe();

  const taskTypeCountryCosts = useTaskTypeCosts(taskType.id, filters.countries);

  const thousandViews = useMemo<{ from: number; to: number }>(() => {
    const minCost = _.minBy(taskTypeCountryCosts, 'cost');
    const maxCost = _.maxBy(taskTypeCountryCosts, 'cost');

    return {
      from: _.round((Number(totalBudget) * 100) / Number(maxCost?.cost), 1),
      to: _.round((Number(totalBudget) * 100) / Number(minCost?.cost), 1),
    };
  }, [taskTypeCountryCosts, totalBudget]);

  const executionsFrom = useMemo(() => {
    const fullCostFrom = getFullTaskCost(
      cost[1],
      taskType.companyCommission,
      bonusRate,
    );
    return Math.floor((Number(totalBudget) / fullCostFrom) * 100);
  }, [cost, totalBudget, taskType.companyCommission, bonusRate]);

  const executionsTo = useMemo(() => {
    const fullCostTo = getFullTaskCost(
      cost[0],
      taskType.companyCommission,
      bonusRate,
    );
    return Math.floor((Number(totalBudget) / fullCostTo) * 100);
  }, [cost, totalBudget, taskType.companyCommission, bonusRate]);

  const [
    createInstagramStoryTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramStoryTask();

  const handleNextClick = (e: FormEvent) => {
    e.preventDefault();
    setViewIndex(viewIndex + 1);
  };

  const handleBackClick = () => {
    setViewIndex(viewIndex - 1);
  };

  const handleCostChange = (event: any, newValue: number | number[]) => {
    setCost(newValue as number[]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdTask = await createInstagramStoryTask({
      variables: {
        websiteUrl: websiteUrlEnabled ? websiteUrl : '',
        accountUsername: accountUsernameEnabled ? accountUsername : '',
        needApprove,
        description,
        layoutMediaUrls,
        taskTypeId: taskType.id,
        costFrom: cost[0],
        costTo: cost[1],
        totalBudget: Math.round(Number(totalBudget) * 100),
        bonusRate: Number(bonusRate),
        expiredAt,
        countries: filters.countries,
        languages: filters.languages,
        genders: filters.genders,
        ageFrom: Number(filters.ageFrom),
        ageTo: Number(filters.ageTo),
        followersAmount: Number(filters.followersAmount),
      },
    });
    const createdTaskId = createdTask.data?.createInstagramStoryTask?.id;
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

  const destinationValid =
    (websiteUrlEnabled && websiteUrl) || (accountUsernameEnabled && accountUsername);

  const filtersValid =
    (executionsFrom !== 0 || executionsTo !== 0) &&
    filters.countries.length &&
    filters.languages.length &&
    filters.genders.length;
  const budgetValid = Number(totalBudget) && !notEnoughtMoney;

  const submitDisabled =
    notEnoughtMoney ||
    !destinationValid ||
    !description ||
    !budgetValid ||
    !filtersValid ||
    mediaLoading ||
    !expiredAt ||
    creating;

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
      {t('Next Step')}
    </Button>
  );

  return (
    <div className={c.root}>
      {viewIndex === 0 && (
        <form onSubmit={handleNextClick}>
          <div className={c.predict}>
            <Box>
              <Typography className={c.predictValue}>
                {thousandViews?.from &&
                  thousandViews.from !== thousandViews.to &&
                  `${thousandViews?.from} - `}
                {thousandViews.to && `${thousandViews.to}k`}
                {!thousandViews?.to && '-'}
              </Typography>
              <Typography className={c.predictLabel}>
                {t('expected followers reach')}
              </Typography>
            </Box>
            <Box textAlign='right'>
              <Typography className={c.predictValue}>
                {executionsTo <= 1
                  ? executionsTo
                  : executionsFrom === 0
                  ? `${t('up to')} ${executionsTo}`
                  : `${executionsFrom} - ${executionsTo}`}
              </Typography>
              <Typography className={c.predictLabel}>
                {t('promo stories')}
              </Typography>
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

          <Box mt={2} />

          <Typography className={c.label}>
            {t('promo story reward from - up to')}
          </Typography>
          <Slider
            defaultValue={cost}
            onChangeCommitted={handleCostChange}
            min={100}
            max={50000}
            step={100}
            valueFormat={(v) => `$${v / 100}`}
          />

          <Box pt={0.5} />

          <Typography className={c.label}>{t('Filter Influencers')}</Typography>
          <CreateTaskFilters filters={filters} onChange={handleFiltersChange} />

          <Box mt={2} />

          {!notEnoughtMoney && (
            <NextButton disabled={!budgetValid || !filtersValid} />
          )}
        </form>
      )}

      {viewIndex === 1 && (
        <form onSubmit={handleNextClick}>
          <Box className={c.switchableTextField}>
            <TextField
              type='url'
              label={t('Destination Link')}
              placeholder='https://your-link.com'
              name='websiteUrl'
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              variant='outlined'
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!websiteUrlEnabled}
            />
            <Switch
              checked={websiteUrlEnabled}
              onChange={(e) => setWebsiteUrlEnabled(e.target.checked)}
              color='primary'
              classes={{ root: c.switch }}
            />
          </Box>
          <Box className={c.switchableTextField}>
            <TextField
              label={t('Mention Account')}
              placeholder='artyombespalov'
              name='accountUsername'
              value={accountUsername}
              onChange={(e) => setAccountUsername(e.target.value)}
              disabled={!accountUsernameEnabled}
              variant='outlined'
              margin='normal'
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Switch
              checked={accountUsernameEnabled}
              onChange={(e) => setAccountUsernameEnabled(e.target.checked)}
              color='primary'
              classes={{ root: c.switch }}
            />
          </Box>
          <Typography className={c.helpText}>
            {t(
              'Only accounts with 10k+ followers can add link, we recommend to add account mention for others.',
            )}
          </Typography>

          <Box mt={2.5} />

          <Box display='flex'>
            <BackButton />
            <NextButton disabled={!destinationValid} />
          </Box>
        </form>
      )}

      {viewIndex === 2 && (
        <form onSubmit={handleSubmit}>
          <TextField
            required
            label={t('Description')}
            placeholder={t(
              'Add description of your task, what influencer should tell about in promo story, which hashtags add.',
            )}
            InputLabelProps={{ shrink: true }}
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={3}
            rowsMax={5}
          />

          <Box mt={1} />

          <Typography align='center' variant='body2'>
            {t('You can provide the explanatory images or videos:')}
          </Typography>

          <Box mt={1} />

          <MediaInput
            multiple
            label={t('Upload Example Images or Videos')}
            onChange={(urls) => setLayoutMediaUrls(urls)}
            onLoading={(loading) => setMediaLoading(loading)}
          />

          <Box mt={2} />

          <FormControl fullWidth margin='normal' variant='outlined'>
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

          <FormControlLabel
            control={
              <Switch
                checked={needApprove}
                onChange={(e) => setNeedApprove(e.target.checked)}
                name='checkedB'
                color='primary'
              />
            }
            label={t('Approve requests directly (Auto mode - off)')}
            style={{ marginTop: 4, marginBottom: 4 }}
          />

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

      {notEnoughtMoney && <NotEnoughtMoneyAlert />}
    </div>
  );
};

const NotEnoughtMoneyAlert: FC = () => {
  const { t } = useTranslation();

  const handleRefillClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  };

  return (
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
  );
};
