import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    header: {
      paddingTop: t.spacing(2.5),
      paddingBottom: t.spacing(1.5),
      borderBottom: `1px solid ${t.palette.divider}`,
      [t.breakpoints.up('md')]: {
        borderWidth: 2,
      },
    },
    categories: {
      display: 'flex',
      flexDirection: 'column',
      gap: t.spacing(1.25),
      marginTop: t.spacing(1.5),
    },
    category: {
      display: 'grid',
      gridGap: t.spacing(2.5),
      gridTemplateColumns: '0.5fr 1fr',
      border: `1px solid ${t.palette.divider}`,
      borderRadius: t.shape.borderRadius * 3,
      background: t.palette.background.paper,
      padding: t.spacing(2),
      textAlign: 'start',
      cursor: 'pointer',
      '&:hover': {
        background: t.palette.grey[100],
      },
    },
    categoryImage: {
      width: '100%',
      height: 'auto',
      alignSelf: 'center',
    },
  }),
);
