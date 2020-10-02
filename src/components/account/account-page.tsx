import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from './account-page.s';
import { RouteComponentProps } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useMe, useUpdateUser } from 'gql/user';
import {
  Box,
  Hidden,
  Typography,
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { Loading } from 'components/common/loading';
import { Balance } from 'components/billing/balance';
import { Language } from 'components/common/language';
// import { User } from 'components/common/user';
import { Contact } from 'components/common/contact';
import { DatePicker } from '@material-ui/pickers';
import { Error } from 'components/common/error';

export interface AccountPageProps extends RouteComponentProps {}

export const AccountPage: FC<AccountPageProps> = () => {
  const c = useStyles();
  const { t, i18n } = useTranslation();
  const language = i18n.language.split('-')[0];

  const { logout } = useAuth0();

  const { me, loading: loadingMe } = useMe();
  // const accounts = me?.accounts || [];
  // const myInstagramAccount = accounts[0]?.instagramAccount;

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const [
    updateUser,
    { loading: updatingUser, error: updateUserError },
  ] = useUpdateUser();

  const [userData, setUserData] = useState<any>({
    givenName: me?.givenName,
    familyName: me?.familyName,
    gender: me?.gender,
    birthDate: me?.birthDate,
  });

  const handleUserFieldChange = (e: ChangeEvent<any>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser({
      variables: {
        ...userData,
        language,
        locale: i18n.language,
      },
    });
    setOpenUpdateSuccessAlert(true);
  };

  const [openUpdateSuccessAlert, setOpenUpdateSuccessAlert] = useState(false);

  if (loadingMe) {
    return <Loading />;
  }

  return (
    <Box className={c.root}>
      <Hidden smUp>
        <Box className={c.topBar}>
          <Contact className={c.topBarContact} edge='start' />
          <Balance amount={me?.balance?.balance || 0} />
          <Language className={c.topBarLanguage} />
          {/* <User className={c.topBarUser} /> */}
        </Box>
      </Hidden>

      <header className={c.header}>
        <div className={c.avatarContainer}>
          <Avatar src={me?.avatarUrl || undefined} className={c.avatar} />
        </div>
        <div className={c.userInfo}>
          <div className={c.user}>
            <Typography className={c.nickname}>{me?.nickname}</Typography>
            <Button
              className={c.logoutButton}
              variant='text'
              color='secondary'
              size='small'
              onClick={handleLogout}
            >
              {t('Log out')}
            </Button>
          </div>
          <Typography className={c.email}>{me?.email}</Typography>
          <Box className={c.userInfoStats}>
            <Typography className={c.userInfoStat}>
              {t('Completed tasks')}: {me?.completedTasks}
            </Typography>
            <Typography className={c.userInfoStat}>
              {t('Created tasks')}: {me?.createdTasks}
            </Typography>
          </Box>
        </div>
      </header>

      <Box className={c.stats}>
        <Box className={c.stat}>
          <Typography className={c.statNumber}>{me?.completedTasks}</Typography>
          <Typography className={c.statLabel} variant='caption'>
            {t('Completed tasks')}
          </Typography>
        </Box>

        <Box className={c.stat}>
          <Typography className={c.statNumber}>{me?.createdTasks}</Typography>
          <Typography className={c.statLabel} variant='caption'>
            {t('Created tasks')}
          </Typography>
        </Box>
      </Box>

      <form className={c.additionalInfo} onSubmit={handleUserUpdateSubmit}>
        <Typography className={c.label}>{t('Additional info')}:</Typography>
        <TextField
          label={t('Given Name')}
          id='givenName'
          name='givenName'
          value={userData.givenName}
          onChange={handleUserFieldChange}
          variant='outlined'
          margin='dense'
          fullWidth
        />
        <TextField
          label={t('Family Name')}
          id='familyName'
          name='familyName'
          value={userData.familyName}
          onChange={handleUserFieldChange}
          variant='outlined'
          margin='dense'
          fullWidth
        />
        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel id='gender-label'>{t('Gender')}</InputLabel>
          <Select
            labelId='gender-label'
            id='gender'
            name='gender'
            value={userData.gender}
            onChange={handleUserFieldChange}
          >
            <MenuItem value='male'>{t('Male')}</MenuItem>
            <MenuItem value='female'>{t('Female')}</MenuItem>
            <MenuItem value='unknown'>{t('Other')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel shrink={!!userData.birthDate}>{t('Birthday')}</InputLabel>
          <DatePicker
            id='birthDate'
            name='birthDate'
            inputVariant='outlined'
            value={userData.birthDate}
            initialFocusedDate={new Date('1999-01-01')}
            format='MM.DD.YYYY'
            onChange={(birthDate) =>
              setUserData({
                ...userData,
                birthDate,
              })
            }
            variant='inline'
            autoOk={true}
          />
        </FormControl>

        {updateUserError && <Error error={updateUserError} />}

        {(me?.givenName !== userData.givenName ||
          me?.familyName !== userData.familyName ||
          me?.gender !== userData.gender ||
          me?.birthDate !== userData.birthDate) && (
          <Button
            type='submit'
            color='primary'
            // size='large'
            variant='contained'
            fullWidth
            style={{ marginTop: 6 }}
            disabled={updatingUser}
          >
            {updatingUser ? (
              <CircularProgress style={{ width: 28, height: 28 }} />
            ) : (
              t('Submit')
            )}
          </Button>
        )}

        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openUpdateSuccessAlert}
          autoHideDuration={2500}
          onClose={() => setOpenUpdateSuccessAlert(false)}
        >
          <SnackbarContent
            className={c.successAlert}
            message={t('Information updated')}
          />
        </Snackbar>
      </form>

      {/* <Box className={c.socialAccount}>
        <Typography>{t('Instagram account')}:</Typography>

        {myInstagramAccount?.accountType && (
          <Box className={c.instagramAccount}>
            <Avatar
              src={myInstagramAccount.profilePic || undefined}
              className={c.instagramAccountAvatar}
            />
            <Typography className={c.instagramAccountUsername}>
              {myInstagramAccount.username}
            </Typography>
            <Typography color='textSecondary' variant='body2'>
              {t(myInstagramAccount.accountType)}
            </Typography>
          </Box>
        )}
      </Box> */}
    </Box>
  );
};
