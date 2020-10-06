import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    label: {
      color: 'rgba(193, 194, 208, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
      marginBottom: t.spacing(0.5),
    },
    taskInfoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    type: {
      textTransform: 'capitalize',
    },
    cancelButton: {
      paddingLeft: 0,
      paddingTop: 2,
      paddingBottom: 2,
      color: t.palette.error.main,
    },
    spent: {
      fontWeight: 500,
    },
    budget: {
      fontWeight: 500,
      color: 'rgba(154, 155, 180, 1)',
      marginLeft: t.spacing(1.5),
    },
    tip: {
      fontWeight: 500,
      color: 'rgba(154, 155, 180, 1)',
      marginLeft: t.spacing(1),
    },
    layoutMedia: {
      display: 'block',
      width: '100%',
      borderRadius: t.shape.borderRadius * 3,
      marginTop: t.spacing(1),
    },
    link: {
      display: 'block',
      fontWeight: 500,
      fontSize: t.typography.body1.fontSize,
      textOverflow: 'ellipsis',
      lineHeight: '26px',
      whiteSpace: 'nowrap',
    },
    hint: {
      color: t.palette.text.hint,
    },
  }),
);
