import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LoaderGif from 'img/preloader.gif'

export const Preloader: React.FC = () => {
  const c = useStyles({})

  return <img alt='Loader' className={c.root} src={LoaderGif} />
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
