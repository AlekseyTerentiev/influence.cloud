import React from 'react'
import { navigate, Location } from '@reach/router'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusSquare, faUser } from '@fortawesome/free-solid-svg-icons'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const NavBot = () => {
  const c = useStyles({})

  return (
    <>
      <div className={c.offset} />
      <Location>
        {({ location }): any => (
          <BottomNavigation
            className={c.root}
            value={'/' + location.pathname.split('/')[1]}
            onChange={(e, route) => navigate(route)}
          >
            <BottomNavigationAction value='/' icon={<FontAwesomeIcon icon={faCheck} />} />
            <BottomNavigationAction disabled value='/create-task' icon={<FontAwesomeIcon icon={faPlusSquare} />} />
            <BottomNavigationAction value='/account' icon={<FontAwesomeIcon icon={faUser} />} />
          </BottomNavigation>
        )}
      </Location>
    </>
  )
}

const height = 50

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    offset: {
      minHeight: height,
    },
    root: {
      zIndex: 1,
      height: height,
      borderTop: '1px solid rgba(0,0,0,0.0975)',
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  })
)
