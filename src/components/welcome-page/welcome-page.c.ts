import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ellipse1Img from './img/ellipse1.svg';
import ellipse2Img from './img/ellipse2.svg';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingTop: '12%',
      },
    },
    appealBlock: {
      width: 500,
      maxWidth: '100%',
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
      },
    },
    congratulationIcon: {
      fontSize: '2rem',
      display: 'inline-block',
      marginBottom: 2,
    },
    title: {
      // fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(0.75),
      [theme.breakpoints.up('md')]: {
        display: 'inline',
        marginLeft: theme.spacing(2),
      },
    },
    subtitle: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2.25),
    },
    buttons: {
      margin: theme.spacing(0.5, 0, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
    button: {
      minWidth: 220,
      margin: theme.spacing(1, 1, 0, 0),
      [theme.breakpoints.up('md')]: {
        minWidth: 'auto',
      },
    },
    buttonIcon: {
      fontSize: '1.2rem',
      display: 'inline-block',
      marginRight: theme.spacing(1),
    },
    instructionBlock: {
      display: 'flex',
      alignItems: 'center',
      height: 370,
      position: 'relative',
      marginTop: theme.spacing(5.5),
      '&::before, &::after': {
        transform: 'translate(-50%, -50%)',
        content: '""',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        zIndex: -1,
        mixBlendMode: 'multiply',
      },
      '&::before': {
        backgroundImage: `url(${ellipse1Img})`,
        width: 380,
        height: 362,
        top: '49%',
        left: '27%',
      },
      '&::after': {
        backgroundImage: `url(${ellipse2Img})`,
        width: 258,
        height: 234,
        top: '67%',
        left: '61%',
      },
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        marginRight: 44,
        order: -1,
      },
    },
    iframeVideo: {
      borderRadius: '5px',
      maxWidth: '100%',
      width: 460,
      height: 241,
    },
  }),
);
