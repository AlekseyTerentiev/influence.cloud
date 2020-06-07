import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';
import { AddAccount } from 'view/account/add-account';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const ExecutionPage: React.FC<RouteComponentProps> = () => {
  const c = useStyles();

  const account: any = null;
  const accountLoading = false;
  const campaign: any = null;

  function handleCreateCampaign() {}

  if (accountLoading) {
    return null;
  }

  return (
    <>
      {!account && !campaign && (
        <Box className={c.addAccountContainer}>
          <Typography color='textSecondary'>
            Вы находитесь в режиме выполнения заданий.{' '}
            <Hidden xsDown>
              <br />
            </Hidden>
            Для начала работы Вам необходимо добавить аккаунт
          </Typography>
          <Box mt={3}>
            <AddAccount />
          </Box>
        </Box>
      )}

      {account && !campaign && (
        <Box className={c.createCampaignContainer}>
          <Typography align='center'>Активация режима выполнения заданий</Typography>
          <Typography align='center' color='textSecondary'>
            Предлагать для выполнения <br /> все типы задач:
          </Typography>
          <Typography>
            <FontAwesomeIcon icon={faCheckCircle} size='sm' /> повышение активности
          </Typography>
          <Typography>
            <FontAwesomeIcon icon={faCheckCircle} size='sm' /> подписка на спонсоров
          </Typography>
          <Typography>
            <FontAwesomeIcon icon={faCheckCircle} size='sm' /> реклама в сторис
          </Typography>

          <Button
            style={{ marginTop: 20 }}
            size='large'
            variant='contained'
            color='primary'
            onClick={handleCreateCampaign}
            disabled={true}
          >
            Получить задание
          </Button>
        </Box>
      )}
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    addAccountContainer: {
      textAlign: 'center',
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    createCampaignContainer: {
      textAlign: 'center',
      paddingTop: '14vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& p': {
        marginBottom: theme.spacing(2.7),
      },
    },
  }),
);
