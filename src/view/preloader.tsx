import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import PreloaderGif from 'img/preloader.gif'

export const Preloader: React.FC = () => {
  const c = useStyles()

  return <img alt='Loading' className={c.root} src={PreloaderGif} />
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '65%',
      maxWidth: 300,
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
)
