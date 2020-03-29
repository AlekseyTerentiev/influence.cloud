import React, { useState } from 'react'
import { useTranslation } from 'i18n'
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Box,
  Dialog,
  IconButton,
  Typography,
  Divider,
  TextField,
  DialogContent,
  Button,
  Link,
  Tooltip,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core'
import instagramImg from 'img/instagram.svg'
import CloseIcon from 'img/close.svg'
import InstagramLogoImg from 'img/instagram_logo.png'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

export const AddAccount = () => {
  const { t } = useTranslation()
  const c = useStyles({})
  const [open, setOpen] = useState(false)
  const fullScreen = useMediaQuery('(max-width:420px)')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim()
    setUsername(value.startsWith('@') ? value.substr(1) : value)
  }
  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value.trim())
  }
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    // setLoading(true)
    handleClose()
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
        {t('Add account')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'xs'}
        className={c.modal}
      >
        <DialogContent>
          <IconButton aria-label='Close' onClick={handleClose} className={c.closeButton}>
            <img style={{ width: 15, height: 15 }} src={CloseIcon} />
          </IconButton>

          <img src={InstagramLogoImg} className={c.instagramLogo} alt='Instagram logo' />

          <Box pt={2} pb={3}>
            <Divider />
          </Box>

          <Typography variant='h6' style={{ fontSize: '1.4rem' }}>
            {t('Instagram authentication')}
          </Typography>

          <form onSubmit={handleSubmit} className={c.form}>
            <TextField
              placeholder={t('Username')}
              autoFocus
              value={username}
              onChange={handleChangeUsername}
              fullWidth
              variant='filled'
              // margin={fullScreen ? 'normal' : 'dense'}
            />

            <TextField
              placeholder={t('Password')}
              value={password}
              onChange={handleChangePassword}
              fullWidth
              variant='filled'
              margin={fullScreen ? 'normal' : 'dense'}
              style={{ marginTop: 16 }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                autoComplete: 'new-password',
                endAdornment: password && (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      aria-label='Toggle password visibility'
                      onClick={handleClickShowPassword}
                    >
                      {/* {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} */}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth={fullScreen}
              disabled={!username || !password || loading}
              style={{ marginTop: 16, minWidth: 200 }}
            >
              {loading ? (
                <CircularProgress style={{ width: 24, height: 24 }} />
              ) : (
                t('Log In')
              )}
            </Button>

            {error && (
              <Typography color='error' style={{ marginTop: 10 }}>
                {error}
              </Typography>
            )}
          </form>

          <Box pt={4} pb={2}>
            <Divider />
          </Box>

          <Typography className={c.attention}>
            ✨
            {t(
              'Two factor authetification should be disabled while you add account to servise.'
            )}
            <br />
            {t('After it can be turned on again.')}
          </Typography>

          <Tooltip
            title={t(
              'Open Instagram app – Settings – Privacy & security – Two-factor authentication.'
            )}
            disableFocusListener
            disableTouchListener
          >
            <Link style={{ margin: '20px 0', cursor: 'pointer', display: 'block' }}>
              {t('How to disable?')}
            </Link>
          </Tooltip>
          <Box pt={2} />
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
      marginTop: theme.spacing(2),
      width: 117,
      height: 41,
    },
    form: {
      marginTop: theme.spacing(2),
    },
    attention: {
      fontSize: '14px !important',
      paddingTop: theme.spacing(2.2),
      color: '#717382',
    },
    attentionIcon: {
      marginRight: theme.spacing(0.6),
    },
  })
)
