import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      maxWidth: 420,
    },
    types: {
      display: 'flex',
      marginBottom: t.spacing(1.5),
      [t.breakpoints.up('md')]: {
        marginBottom: t.spacing(2),
      },
    },
    type: {
      cursor: 'pointer',
      display: 'inline-block',
      position: 'relative',
      '&:not(:first-child)::before': {
        content: '""',
        width: 1,
        position: 'absolute',
        height: '75%',
        background: t.palette.divider,
        left: 0,
        top: '15%',
        zIndex: -1,
      },
    },
    input: {
      position: 'absolute',
      opacity: 0,
      height: 0,
      width: 0,
      '&:checked + label': {
        border: `1px solid ${t.palette.primary.main}`,
        color: t.palette.primary.main,
      },
    },
    label: {
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: t.spacing(1.5, 1.5, 1),
      fontSize: 14,
      fontWeight: t.typography.fontWeightMedium,
      border: `1px solid transparent`,
      borderRadius: t.shape.borderRadius * 3,
      [t.breakpoints.up('md')]: {
        padding: t.spacing(2, 1.5, 1.5),
        fontSize: 16,
      },
    },
    typeIcon: {
      height: 20,
      marginBottom: t.spacing(0.5),
    },
    illustration: {
      width: '100%',
      margin: 'auto',
      display: 'block',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: t.spacing(1, 0, 0.75),
    },
    title: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: t.typography.fontWeightBold,
      letterSpacing: -0.7,
    },
    price: {
      fontSize: 16,
      lineHeight: '28px',
      fontWeight: t.typography.fontWeightBold,
      letterSpacing: -0.5,
      color: '#9B9DB1',
    },
    description: {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: -0.2,
      marginBottom: t.spacing(2),
    },
    submitButton: {
      borderRadius: t.shape.borderRadius * 3,
    },
  }),
);
