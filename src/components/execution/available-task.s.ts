import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    label: {
      color: 'rgba(193, 194, 208, 1)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '18px',
      letterSpacing: 0.8,
      marginBottom: t.spacing(0.5),
    },
    type: {
      textTransform: 'capitalize',
    },
    status: {
      marginLeft: 'auto',
      textTransform: 'capitalize',
    },
    reward: {
      fontWeight: 500,
    },
    rewardDetailed: {
      fontWeight: 500,
      fontSize: t.typography.body2.fontSize,
      color: 'rgba(154, 155, 180, 1)',
      marginLeft: t.spacing(1),
    },
    payout: {
      color: t.palette.success.main,
    },
    linkContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    link: {
      display: 'block',
      fontWeight: 500,
      fontSize: t.typography.body1.fontSize,
      lineHeight: '26px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    copyButton: {
      fontSize: t.typography.body1.fontSize,
      padding: 0,
      marginLeft: t.spacing(0.75),
      whiteSpace: 'nowrap',
      lineHeight: '26px',
    },
    layoutMedia: {
      display: 'block',
      width: '100%',
      borderRadius: t.shape.borderRadius * 3,
      marginTop: t.spacing(1),
    },
    checkboxControlLabel: {
      alignItems: 'flex-start',
      paddingTop: 3,
      paddingBottom: 2,
    },
    checkbox: {
      padding: '2px 8px 6px 9px',
      '& .MuiSvgIcon-root': {
        width: '0.86em',
        height: '0.86em',
      },
    },
  }),
);
