import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ellipse1Img from './img/ellipse1.svg';
import ellipse2Img from './img/ellipse2.svg';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      padding: t.spacing(7, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [t.breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingTop: '10%',
      },
    },
    appealBlock: {
      // width: 510,
      maxWidth: '100%',
      textAlign: 'center',
      [t.breakpoints.up('md')]: {
        textAlign: 'left',
      },
    },
    congratulationIcon: {
      fontSize: '2.3rem',
      [t.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
      display: 'inline-block',
      marginBottom: 2,
    },
    title: {
      // fontWeight: t.typography.fontWeightBold,
      marginBottom: t.spacing(0.75),
      [t.breakpoints.up('md')]: {
        display: 'inline',
        marginLeft: t.spacing(2),
      },
    },
    subtitle: {
      color: t.palette.text.secondary,
      marginBottom: t.spacing(2.25),
    },
    buttons: {
      margin: t.spacing(0.5, 0, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [t.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
    button: {
      minWidth: 240,
      margin: t.spacing(1, 1, 0, 0),
      [t.breakpoints.up('md')]: {
        minWidth: 'auto',
      },
    },
    buttonIcon: {
      fontSize: '1.2rem',
      display: 'inline-block',
      marginRight: t.spacing(1),
    },
    instructionBlock: {
      display: 'flex',
      alignItems: 'center',
      height: 370,
      position: 'relative',
      marginTop: t.spacing(5.5),
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
      [t.breakpoints.up('md')]: {
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
