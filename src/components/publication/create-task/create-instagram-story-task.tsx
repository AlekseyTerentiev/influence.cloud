import React, { FC, useState, MouseEvent, ChangeEvent, FormEvent } from 'react';
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
  InputAdornment,
  FormControlLabel,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LeftOutlined } from '@ant-design/icons';
import SwipeableViews from 'react-swipeable-views';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';
import { MediaInput } from 'components/common/media-input';

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
  const [cost, setCost] = useState({
    costFrom: '',
    costTo: '50',
  });
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

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost({ ...cost, [e.target.name]: e.target.value.replace(',', '.') });
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
        costFrom: Math.round(Number(cost.costFrom) * 100),
        costTo: Math.round(Number(cost.costTo) * 100),
        totalBudget: Math.round(Number(totalBudget) * 100),
        bonusRate: Number(bonusRate),
        expiredAt,
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

  const budgetValid =
    Number(totalBudget) && cost.costFrom !== '' && Number(cost.costTo);

  const submitDisabled =
    notEnoughtMoney ||
    !destinationValid ||
    !description ||
    !budgetValid ||
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
        // disabled
      >
        <form onSubmit={handleNextClick}>
          <TaskBudgetInput
            averageCost={taskType.averageCost}
            companyCommission={taskType.companyCommission}
            budget={totalBudget}
            bonus={bonusRate}
            onBudgetChange={setTotalBudget}
            onBonusChange={setBonusRate}
          />

          <Box display='flex'>
            <TextField
              type='number'
              inputProps={{
                step: 0.01,
              }}
              label='Cost From'
              name='costFrom'
              value={cost.costFrom}
              onChange={handleCostChange}
              placeholder='0'
              variant='outlined'
              margin='dense'
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
            />
            <TextField
              type='number'
              inputProps={{
                step: 0.01,
              }}
              label='Cost To'
              name='costTo'
              value={cost.costTo}
              onChange={handleCostChange}
              placeholder='0'
              variant='outlined'
              margin='dense'
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              style={{ marginLeft: 10 }}
            />
          </Box>

          <Box mt={2} />

          {notEnoughtMoney ? (
            <NotEnoughtMoneyAlert />
          ) : (
            <NextButton disabled={!budgetValid} />
          )}
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

          <Box display='flex' alignItems='center'>
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

          {creatingError && <Error error={creatingError} />}

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
      </SwipeableViews>
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
