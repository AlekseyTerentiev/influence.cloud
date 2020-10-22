import React, { FC, useState, MouseEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
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
  Slider,
  FormControlLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LeftOutlined } from '@ant-design/icons';
import SwipeableViews from 'react-swipeable-views';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';
import { MediaInput } from 'components/common/media-input';
import { AccountLanguage, Gender } from 'gql/types/globalTypes';
import { TaskFilters, CreateTaskFilters } from './create-task-filters';

import { useStyles } from './create-instagram-story-task.s';

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

  const [swipeableViewIndex, setSwipeableViewIndex] = useState(0);

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
  const [cost, setCost] = useState<number[]>([100, 1000]);
  const [filters, setFilters] = useState<TaskFilters>({
    countries: ['US'],
    languages: [AccountLanguage.en],
    genders: [Gender.male],
    ageFrom: '16',
    ageTo: '40',
    followersAmount: '1000',
  });

  const handleFiltersChange = (filters: TaskFilters) => {
    setFilters(filters);
  };

  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const { me } = useMe();

  const [
    createInstagramStoryTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramStoryTask();

  const handleNextClick = (e: FormEvent) => {
    e.preventDefault();
    setSwipeableViewIndex(swipeableViewIndex + 1);
  };

  const handleBackClick = () => {
    setSwipeableViewIndex(swipeableViewIndex - 1);
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
    filters.countries.length && filters.languages.length && filters.genders.length;
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
      {t('Next')}
    </Button>
  );

  return (
    <div className={c.root}>
      <SwipeableViews
        index={swipeableViewIndex}
        onChangeIndex={(i) => setSwipeableViewIndex(i)}
        className={c.swipeableViews}
        slideClassName={c.swipeableView}
        animateHeight
        disabled
      >
        <form onSubmit={handleNextClick}>
          <TaskBudgetInput
            // averageCost={taskType.averageCost}
            // companyCommission={taskType.companyCommission}
            budget={totalBudget}
            bonus={bonusRate}
            onBudgetChange={setTotalBudget}
            onBonusChange={setBonusRate}
          />

          <Box mt={2} />

          <Typography className={c.label} style={{ marginBottom: 0 }}>
            Price per Posted Story
          </Typography>
          <Box pl={0.75} pr={1}>
            <Slider
              value={cost}
              onChange={handleCostChange}
              valueLabelDisplay='auto'
              valueLabelFormat={costText}
              marks={costMarks}
              min={100}
              max={5000}
              step={100}
            />
          </Box>

          <Box pt={1.25} />

          <Typography className={c.label}>Influensers Filters</Typography>
          <CreateTaskFilters filters={filters} onChange={handleFiltersChange} />

          <Box mt={2} />

          <NextButton disabled={!budgetValid || !filtersValid} />
        </form>

        <form onSubmit={handleNextClick}>
          <Box className={c.switchableTextField}>
            <TextField
              type='url'
              label='Destination Link'
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
              label='Mention Account'
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

        <form onSubmit={handleSubmit}>
          <TextField
            required
            label='Description'
            placeholder='Add description of your task, what influencer should tell about in promo story, which hashtags add.'
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
            You can provide the explanatory images or videos:
          </Typography>

          <Box mt={1} />

          <MediaInput
            multiple
            label='Upload Example Images or Videos'
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
            label='Preliminary approval of executors'
            style={{ marginTop: 4, marginBottom: 4 }}
          />

          <Box mt={2} />

          {creatingError && <Error error={creatingError} />}

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
      </SwipeableViews>

      {notEnoughtMoney && (
        <Box mt={2}>
          <NotEnoughtMoneyAlert />
        </Box>
      )}
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

const costMarks = [
  {
    value: 100,
    label: '$1',
  },
  {
    value: 1000,
    label: '$10',
  },
  {
    value: 2000,
    label: '$20',
  },
  {
    value: 3000,
    label: '$30',
  },
  {
    value: 4000,
    label: '$40',
  },
  {
    value: 5000,
    label: '$50',
  },
];

function costText(value: number) {
  return `$${value / 100}`;
}
