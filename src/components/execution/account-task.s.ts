import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    statusAlert: {
      paddingTop: t.spacing(2),
      paddingBottom: t.spacing(1.5),
      marginBottom: t.spacing(2),
    },
    statusConfirmationAlert: {
      background: 'rgba(229, 243, 255, 1)',
    },
    statusInProgressAlert: {
      background: t.palette.success.light,
      paddingBottom: t.spacing(2.5),
    },
    statusCompletedAlert: {
      background: t.palette.success.light,
    },
    timer: {
      fontWeight: 500,
      fontSize: t.typography.body1.fontSize,
      minWidth: 68,
    },
    verifyInput: {
      padding: '12px !important',
    },
    verifyButton: {
      background: t.palette.success.main,
      '&:hover': {
        background: t.palette.success.dark,
      },
    },
    statusExpiredAlert: {
      background: t.palette.error.light,
    },
    statusNotApprovedAlert: {
      background: t.palette.error.light,
    },
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
      color: t.palette.text.secondary,
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
    checkIcon: {
      marginRight: t.spacing(1),
      color: t.palette.grey[700],
      opacity: 0.8,
    },
  }),
);
