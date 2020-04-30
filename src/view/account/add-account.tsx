import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'store'
import { useTranslation } from 'i18n'
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Box,
  Slide,
  Dialog,
  IconButton,
  Typography,
  Divider,
  TextField,
  DialogContent,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import instagramImg from 'img/instagram.svg'
import CloseIcon from 'img/close.svg'
import InstagramLogoImg from 'img/instagram_logo.png'

export const AddAccount = () => {
  const { t } = useTranslation()
  const c = useStyles()
  const [open, setOpen] = useState(false)
  const fullScreen = useMediaQuery('(max-width:420px)')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const { addAccount } = useStoreActions(actions => actions.instagram)
  const { accountLoading } = useStoreState(state => state.instagram)

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value.trim())
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    addAccount({ username: username.startsWith('@') ? username.substr(1) : username })
      .then(() => handleClose())
      .catch((error: any) => setError(t('An error has occurred. Please try again.')))
  }

  return (
    <>
      <Button
        className={c.addAccountButton}
        size='large'
        variant='contained'
        color='primary'
        onClick={handleOpen}
      >
        <img alt='Instagram' src={instagramImg} />
        {t('Add')} {t('account')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'xs'}
        className={c.modal}
        TransitionComponent={SlideUpTransition}
        keepMounted
      >
        <DialogContent>
          <IconButton aria-label='Close' onClick={handleClose} className={c.closeButton}>
            <img style={{ width: 15, height: 15 }} src={CloseIcon} alt='Close' />
          </IconButton>

          <img src={InstagramLogoImg} className={c.instagramLogo} alt='Instagram logo' />

          <Box pt={4} pb={5}>
            <Divider />
          </Box>

          <Typography variant='h6' style={{ fontSize: '1.4rem' }}>
            {t('Instagram Account')}
          </Typography>

          <form onSubmit={handleSubmit} className={c.form}>
            <TextField
              placeholder={t('Instagram username')}
              autoFocus
              value={username}
              onChange={handleChangeUsername}
              fullWidth
              variant='filled'
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              size='large'
              fullWidth={fullScreen}
              disabled={!username || accountLoading}
              style={{ marginTop: 20, minWidth: 200 }}
            >
              {accountLoading ? (
                <CircularProgress style={{ width: 24, height: 24 }} />
              ) : (
                t('Add')
              )}
            </Button>

            {error && (
              <Typography color='error' style={{ marginTop: 10 }}>
                {error}
              </Typography>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addAccountButton: {
      display: 'flex',
      alignItems: 'center',
    },
    modal: {
      textAlign: 'center',
    },
    closeButton: {
      color: '#bdbdbd',
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    instagramIcon: {
      width: '2rem',
      height: '2rem',
      verticalAlign: 'middle',
    },
    instagramLogo: {
      marginTop: theme.spacing(4),
      width: 117,
      height: 41,
    },
    form: {
      marginTop: theme.spacing(3),
    },
  })
)

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  )
)
