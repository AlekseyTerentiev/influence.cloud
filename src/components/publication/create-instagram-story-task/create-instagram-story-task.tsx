import React, { FC, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './create-instagram-story-task.s';
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
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LeftOutlined } from '@ant-design/icons';
import SwipeableViews from 'react-swipeable-views';
import { TaskBudgetInput } from '../task-budget-input';
import { Error } from 'components/common/error';
import { MediaInput } from 'components/publication/media-input';

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
  // const [needApprove, setNeedApprove] = useState(false);
  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const { me } = useMe();

  const [
    createInstagramStoryTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramStoryTask();

  const handleNextClick = () => {
    setSwipeableViewIndex(swipeableViewIndex + 1);
  };

  const handleBackClick = () => {
    setSwipeableViewIndex(swipeableViewIndex - 1);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const createdTask = await createInstagramStoryTask({
      variables: {
        websiteUrl: websiteUrlEnabled ? websiteUrl : '',
        accountUsername: accountUsernameEnabled ? accountUsername : '',
        needApprove: false,
        description,
        layoutMediaUrls,
        taskTypeId: taskType.id,
        totalBudget: Math.round(Number(totalBudget) * 100),
        bonusRate: Number(bonusRate),
        expiredAt,
      },
    });
    const createdTaskId = createdTask.data?.createInstagramStoryTask?.id;
    if (!createdTaskId) {
      return;
    }
    (window as any).gtag('event', 'create-task', {
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

  const submitDisabled =
    notEnoughtMoney ||
    !destinationValid ||
    !description ||
    !Number(totalBudget) ||
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
      onClick={handleNextClick}
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
    <form
      // onSubmit={handleSubmit}
      className={c.root}
    >
      <Typography className={c.header}>{t(taskType.title)}</Typography>
      <Typography className={c.subheader}>
        {t('Attract new followers and clients to your account or website')}
      </Typography>

      <SwipeableViews
        index={swipeableViewIndex}
        onChangeIndex={(i) => setSwipeableViewIndex(i)}
        className={c.swipeableViews}
        slideClassName={c.swipeableView}
      >
        <div>
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

          {notEnoughtMoney ? (
            <NotEnoughtMoneyAlert />
          ) : (
            <NextButton disabled={!destinationValid} />
          )}
        </div>

        <div>
          <TextField
            label='Description'
            placeholder='Add description of your task, what influencer should tell about in promo story, which hashtags add'
            InputLabelProps={{ shrink: true }}
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            rows={3}
            rowsMax={3}
          />

          <Box mt={1.25} />

          <Typography variant='body2' align='center'>
            Also you can provide the explanatory images or videos:
          </Typography>

          <Box mt={1.5} />

          <MediaInput
            onChange={(urls) => setLayoutMediaUrls(urls)}
            onLoading={(loading) => setMediaLoading(loading)}
          />

          <Box mt={2.5} />

          {notEnoughtMoney ? (
            <NotEnoughtMoneyAlert />
          ) : (
            <Box display='flex' alignItems='center'>
              <BackButton />
              <NextButton disabled={!description || mediaLoading} />
            </Box>
          )}
        </div>

        <div>
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

          <TaskBudgetInput
            averageCost={taskType.averageCost}
            companyCommission={taskType.companyCommission}
            budget={totalBudget}
            bonus={bonusRate}
            onBudgetChange={setTotalBudget}
            onBonusChange={setBonusRate}
          />

          <Box mt={0.75} />

          {creatingError && <Error error={creatingError} />}

          <Box mt={2.5} />

          {notEnoughtMoney ? (
            <NotEnoughtMoneyAlert />
          ) : (
            <Box display='flex'>
              <BackButton />
              <Button
                onClick={handleSubmit}
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
          )}
        </div>
      </SwipeableViews>
    </form>
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
