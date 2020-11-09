import React, { FC, useState, ChangeEvent } from 'react';
import { GetMe_me_accounts } from 'gql/types/GetMe';
import { useUpdateInstagramAccount } from 'gql/instagram-accounts';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from '@material-ui/core';
import { MediaInput } from 'components/common/input/media-input';
import { Error } from 'components/common/error';
import { Button } from '@material-ui/core';
// import { ReactComponent as CheckIcon } from 'img/check.svg';
// import { Currency } from 'components/billing/currency';

export interface AccountStatsFormProps {
  account: GetMe_me_accounts;
  onSubmit?: () => void;
}

export const AccountStatsForm: FC<AccountStatsFormProps> = ({
  account,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const c = useStyles();

  const [stats, setStats] = useState({
    impressions: account.impressions !== null ? String(account.impressions) : '',
    impressionsStory:
      account.impressionsStory !== null ? String(account.impressionsStory) : '',
    profileVisits:
      account.profileVisits !== null ? String(account.profileVisits) : '',
    statsMediaLinksUrls: account.statsMediaLinksUrls,
  });

  const [expectedStoryCost, setExpectedStoryCost] = useState<string>(
    account.expectedStoryCost ? (account.expectedStoryCost / 100).toFixed(2) : '',
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStats({
      ...stats,
      [e.target.name]: e.target.value,
    });
  };

  const [mediaLoading, setMediaLoading] = useState(false);
  const handleMediaChange = (urls: string[]) => {
    setStats({
      ...stats,
      statsMediaLinksUrls: urls,
    });
  };

  const [
    updateInstagramAccount,
    { loading: submitting, error: updatingError },
  ] = useUpdateInstagramAccount();

  const handleUpdateStatsSubmit = async () => {
    await updateInstagramAccount({
      variables: {
        id: account.id,
        impressions: Number(stats.impressions),
        impressionsStory: Number(stats.impressionsStory),
        profileVisits: Number(stats.profileVisits),
        statsMediaLinksUrls: stats.statsMediaLinksUrls,
        expectedStoryCost: Math.round(Number(expectedStoryCost) * 100),
      },
    });
    (window as any).gtag('event', 'account-stats-upload', {
      impressions: stats.impressions,
      impressionsStory: stats.impressionsStory,
      profileVisits: stats.profileVisits,
      expectedStoryCost,
    });
    if (onSubmit) {
      onSubmit();
    }
  };

  // const handleUpdateCostSubmit = async () => {
  //   await updateInstagramAccount({
  //     variables: {
  //       id: account.id,
  //       expectedStoryCost: Math.round(Number(expectedStoryCost) * 100),
  //     },
  //   });
  //   setSubmitted(true);
  // };

  const updateStatsSubmitDisabled =
    submitting ||
    mediaLoading ||
    stats.statsMediaLinksUrls.length === 0 ||
    stats.impressions === '' ||
    stats.impressionsStory === '' ||
    stats.profileVisits === '' ||
    !expectedStoryCost;

  // const updateCostSubmitDisabled = submitting || expectedStoryCost === '';

  // const [submitted, setSubmitted] = useState(false);

  // const successAlert = (
  //   <Box className={c.successAlert}>
  //     <Box className={c.successAlertIconContainer}>
  //       <CheckIcon className={c.successAlertIcon} />
  //     </Box>
  //     <Typography variant='h5' gutterBottom>
  //       Congratulations!
  //     </Typography>
  //     <Typography className={c.successAlertText}>
  //       Your statistics in review. You will receive confirmation email soon and will
  //       be able to get new type tasks.
  //     </Typography>
  //   </Box>
  // );

  // if (submitted) {
  //   return successAlert;
  // }

  // const statsExists =
  //   account.impressions !== null &&
  //   account.impressionsStory !== null &&
  //   account.profileVisits !== null &&
  //   account.statsMediaLinksUrls.length !== 0;

  return (
    <form className={c.root}>
      {/* {!statsExists && (
        <Box> */}
      <Typography variant='h5' align='center' gutterBottom>
        {t('Account statistics')}
      </Typography>

      <Typography color='textSecondary' align='center'>
        {t(
          'Upload your Instagram statistics and find out the cost of paid story ad on your account',
        )}
      </Typography>

      <Box mt={2} mb={1}>
        <MediaInput
          required
          multiple
          onChange={handleMediaChange}
          onLoading={setMediaLoading}
          label={t('Upload Screenshots or Video') + '*'}
        />
        <Box ml={1} mt={0.75} color='text.secondary'>
          <Typography style={{ fontSize: '0.85rem' }}>
            {'* ' +
              t('Add screen recording of your statistics to being approved sooner')}
          </Typography>
        </Box>
      </Box>

      <TextField
        type='number'
        label={t('Profile impressions (week)')}
        name='impressions'
        value={stats.impressions}
        onChange={handleChange}
        placeholder='0'
        variant='outlined'
        margin='dense'
        fullWidth
      />

      <TextField
        type='number'
        label={t('Profile visits (week)')}
        name='profileVisits'
        value={stats.profileVisits}
        onChange={handleChange}
        placeholder='0'
        variant='outlined'
        margin='dense'
        fullWidth
      />

      <TextField
        type='number'
        label={t('Last 9 stories average impressions')}
        name='impressionsStory'
        value={stats.impressionsStory}
        onChange={handleChange}
        placeholder='0'
        variant='outlined'
        margin='dense'
        fullWidth
      />

      <TextField
        type='number'
        label={t('Expected reward for posted story')}
        name='expectedStoryCost'
        value={expectedStoryCost}
        onChange={(e) => setExpectedStoryCost(e.target.value)}
        helperText={t('*customer will see this cost on “need approve” story tasks')}
        placeholder='0'
        variant='outlined'
        margin='dense'
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position='start'>$</InputAdornment>,
        }}
      />

      {updatingError && <Error error={updatingError} />}

      <Box mt={1} />

      <Button
        type='submit'
        onClick={handleUpdateStatsSubmit}
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        disabled={updateStatsSubmitDisabled}
      >
        {t('Submit')}
      </Button>
      {/* </Box>
      )} */}

      {/* {statsExists && (
        <Box pt={4}>
          <Typography align='center' style={{ fontSize: '2.6rem' }}>
            <Currency value={995} />
          </Typography>
          <Typography variant='h5' align='center' style={{ marginBottom: 4 }}>
            Your promo story cost
          </Typography>
          <Typography color='textSecondary' align='center' gutterBottom>
            (for instant type tasks)
          </Typography>

          <Box mt={4} mb={1}>
            <Typography align='center'>
              Add your expected story cost <br />
              (for need approve type tasks):
            </Typography>
          </Box>

          <TextField
            type='number'
            label={t('Expected story cost')}
            name='expectedStoryCost'
            value={expectedStoryCost}
            onChange={(e) => setExpectedStoryCost(e.target.value)}
            placeholder='0'
            variant='outlined'
            margin='dense'
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
          />

          {updatingError && <Error error={updatingError} />}

          <Box mt={1} />

          <Button
            type='submit'
            onClick={handleUpdateCostSubmit}
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            disabled={updateCostSubmitDisabled}
          >
            {t('Submit')}
          </Button>
        </Box>
      )} */}
    </form>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      maxWidth: 360,
      margin: 'auto',
    },
    // successAlert: {
    //   textAlign: 'center',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   paddingTop: t.spacing(2.5),
    // },
    // successAlertIconContainer: {
    //   marginBottom: t.spacing(1.5),
    //   backgroundColor: t.palette.grey[200],
    //   borderRadius: '50%',
    //   margin: 'auto',
    //   padding: t.spacing(2),
    // },
    // successAlertIcon: {
    //   display: 'block',
    //   color: t.palette.success.main,
    //   width: 28,
    //   height: 28,
    // },
    // successAlertText: {
    //   fontWeight: t.typography.body2.fontWeight,
    //   fontSize: t.typography.body2.fontSize,
    //   color: t.palette.text.secondary,
    // },
  }),
);
