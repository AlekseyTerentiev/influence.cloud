import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { makeStyles, createStyles, Theme, Box } from '@material-ui/core'

export const AssignmentsPage: React.FC<RouteComponentProps> = () => {
  const c = useStyles({})

  return <Box className={c.root}></Box>
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '26vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
)
