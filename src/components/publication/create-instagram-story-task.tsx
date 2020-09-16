import React, { FC, useState, FormEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { useCreateInstagramStoryTask } from 'gql/created-tasks';
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
  FormControl,
  InputLabel,
  Switch,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { TaskBudgetInput } from './task-budget-input';
import { Error } from 'components/common/error';

export interface CreateInstagramStoryTaskProps {
  taskType: GetTaskTypes_taskTypes;
  onCreate?: () => void;
}

export const CreateInstagramStoryTask: FC<CreateInstagramStoryTaskProps> = ({
  taskType,
  onCreate,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [websiteUrlEnabled, setWebsiteUrlEnabled] = useState(true);
  const [accountUsernameEnabled, setAccountUsernameEnabled] = useState(false);
  const [accountUsername, setAccountUsername] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [totalBudget, setTotalBudget] = useState('50');
  const [bonusRate, setBonusRate] = useState('10');
  const [description, setDescription] = useState('');
  // const [needApprove, setNeedApprove] = useState(false);
  const [expiredAt, handleExpiredDateChange] = useState<any>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  const { me } = useMe();
  const handleRefillClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(BILLING_ROUTE);
  };

  const [
    createInstagramStoryTask,
    { loading: creating, error: creatingError },
  ] = useCreateInstagramStoryTask();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdTask = await createInstagramStoryTask({
      variables: {
        websiteUrl: websiteUrlEnabled ? websiteUrl : '',
        accountUsername: accountUsernameEnabled ? accountUsername : '',
        needApprove: false,
        description,
        taskTypeId: taskType.id,
        totalBudget: Math.round(Number(totalBudget) * 100),
        bonusRate: Number(bonusRate),
        expiredAt,
      },
    });
    const createdTaskId = createdTask.data?.createInstagramStoryTask?.id;
    if (createdTaskId) {
      navigate(createdTaskRoute(createdTaskId));
    }
    (window as any).gtag('event', 'create-task', {
      type: taskType.type,
      budget: totalBudget,
    });
    if (onCreate) {
      onCreate();
    }
  };

  const notEnoughtMoney = Number(totalBudget) * 100 > (me?.balance?.balance || 0);

  const submitDisabled =
    creating ||
    notEnoughtMoney ||
    !description ||
    !Number(totalBudget) ||
    !expiredAt ||
    (!(websiteUrlEnabled && websiteUrl) &&
      !(accountUsernameEnabled && accountUsername));

  return (
    <form onSubmit={handleSubmit} className={c.root}>
      <Typography className={c.header}>{t(taskType.title)}</Typography>
      <Typography className={c.subheader}>
        {t('Attract new followers and clients to your account or website')}
      </Typography>

      <Box className={c.switchableTextField}>
        <TextField
          type='url'
          label='Destination Link'
          placeholder='https://your-link.com'
          name='websiteUrl'
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          variant='outlined'
          margin='dense'
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

      <Box ml={1} mb={0.5} color='text.secondary'>
        <Typography style={{ fontSize: '0.85rem' }}>
          {t(
            'Only accounts with 10k+ followers can add link, we recommend to add account mention for others.',
          )}
        </Typography>
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
          margin='dense'
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

      <TextField
        label='Description'
        placeholder='Add description of your task, what influencer should tell about in promo story, which hashtags add'
        InputLabelProps={{ shrink: true }}
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant='outlined'
        margin='dense'
        fullWidth
        multiline
        rows={3}
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
    switchableTextField: {
      position: 'relative',
    },
    switch: {
      position: 'absolute',
      right: t.spacing(2),
      top: '53%',
      transform: 'translateY(-50%)',
    },
  }),
);
