import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    topBar: {
      display: 'flex',
      alignItems: 'center',
      padding: t.spacing(1.75, 0, 1),
      borderBottom: `1px solid ${t.palette.grey[300]}`,
      position: 'sticky',
      top: 0,
      width: '100%',
      background: 'white',
      zIndex: 1,
    },
    topBarContact: {
      marginRight: 'auto',
    },
    topBarLanguage: {
      marginLeft: t.spacing(3),
    },
    // topBarUser: {
    //   marginLeft: t.spacing(1.25),
    // },
    header: {
      maxWidth: t.breakpoints.values.md,
      borderBottom: `1px solid ${t.palette.divider}`,
      padding: t.spacing(4, 0, 3),
      display: 'grid',
      gridTemplateColumns: `${t.spacing(9)}px 1fr`,
      gridTemplateRows: t.spacing(9),
      gridGap: t.spacing(2.5),
      [t.breakpoints.up('md')]: {
        marginLeft: t.spacing(4),
        padding: t.spacing(8, 0, 4),
        gridTemplateColumns: `${t.spacing(14)}px 1fr`,
        gridTemplateRows: t.spacing(14),
        gridGap: t.spacing(6),
      },
    },
    avatarContainer: {
      borderRadius: '50%',
      padding: 2,
      border: `1px solid ${t.palette.grey[200]}`,
      width: '100%',
      height: '100%',
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    userInfo: {
      overflow: 'hidden',
    },
    user: {
      display: 'flex',
      alignItems: 'center',
    },
    nickname: {
      fontSize: t.typography.h5.fontSize,
      fontWeight: t.typography.h5.fontWeight,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    logoutButton: {
      marginLeft: t.spacing(1.5),
      whiteSpace: 'nowrap',
    },
    email: {
      color: t.palette.text.secondary,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [t.breakpoints.up('md')]: {
        fontSize: '1.25rem',
        marginTop: 4,
      },
    },
    userInfoStats: {
      marginTop: t.spacing(1.25),
      display: 'flex',
      [t.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    userInfoStat: {
      marginRight: t.spacing(4),
    },
    stats: {
      borderBottom: `1px solid ${t.palette.divider}`,
      padding: t.spacing(1.75, 0),
      display: 'flex',
      justifyContent: 'space-evenly',
      [t.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    stat: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '1.4rem',
    },
    statLabel: {
      color: t.palette.text.secondary,
      textTransform: 'uppercase',
      fontSize: '0.8rem',
      letterSpacing: 1,
    },
    label: {
      fontSize: '1.2rem',
      marginBottom: t.spacing(0.75),
      [t.breakpoints.up('md')]: {
        fontSize: '1.25rem',
        marginBottom: t.spacing(1),
      },
    },
    additionalInfo: {
      maxWidth: t.breakpoints.values.sm + t.spacing(8),
      padding: t.spacing(3.5, 0),
      [t.breakpoints.up('md')]: {
        padding: t.spacing(5),
      },
    },
    successAlert: {
      background: t.palette.success.main,
    },
    // socialAccount: {
    //   padding: t.spacing(2, 0),
    // },
    // instagramAccount: {
    //   paddingTop: t.spacing(11),
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   textAlign: 'center',
    // },
    // instagramAccountAvatar: {
    //   width: t.spacing(7.5),
    //   height: t.spacing(7.5),
    //   marginBottom: t.spacing(1.25),
    // },
    // instagramAccountUsername: {
    //   position: 'relative',
    //   fontSize: '1.35rem',
    // },
  }),
);
