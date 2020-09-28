import React, { FC } from 'react';
import { useStyles } from './welcome-page.s';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Hidden, Button } from '@material-ui/core';
import { RouteComponentProps, navigate } from '@reach/router';
import { EXECUTION_ROUTE, PUBLICATION_ROUTE } from 'routes';

export interface WelcomePageProps extends RouteComponentProps {}

export const WelcomePage: FC<WelcomePageProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  return (
    <div className={c.root}>
      <Box className={c.appealBlock}>
        <span
          role='img'
          aria-label='congratulation'
          className={c.congratulationIcon}
        >
          🎉
        </span>
        <Typography variant='h6' className={c.title}>
          {t('Welcome to Earnon Social!')}
        </Typography>
        <Typography variant='body2' className={c.subtitle}>
          {t('The fastest growing network')}{' '}
          <Hidden mdUp>
            <br />
          </Hidden>{' '}
          {t('of influencers in the world')}.
        </Typography>

        <Typography>{t('Where do you want to start?')}</Typography>

        <Box className={c.buttons}>
          <Button
            className={c.button}
            onClick={() => navigate(PUBLICATION_ROUTE)}
            variant='contained'
            color='primary'
          >
            <span className={c.buttonIcon} role='img' aria-label='attraction'>
              📈
            </span>{' '}
            {t('I want to grow activity')}
          </Button>

          <Button
            className={c.button}
            onClick={() => navigate(EXECUTION_ROUTE)}
            variant='contained'
            color='secondary'
            style={{ background: '#4BB4EF', opacity: 0.85 }}
          >
            <span className={c.buttonIcon} role='img' aria-label='money'>
              💰
            </span>
            {t('I want to earn money')}
          </Button>
        </Box>

        <Typography variant='body2' style={{ maxWidth: 460 }}>
          {t('We allow you to')} <b>{t('amplify projects')}</b>{' '}
          {t('by publishing ads on the pages and')}{' '}
          <b>{t('earn money by completing tasks')}</b>.
        </Typography>
      </Box>

      <Box className={c.instructionBlock}>
        <iframe
          title='Instruction'
          className={c.iframeVideo}
          src='https://www.youtube.com/embed/RXixv6RLzzk'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          frameBorder='0'
        />
      </Box>
    </div>
  );
};
