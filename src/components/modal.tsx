import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Slide,
  Dialog,
  IconButton,
  DialogContent,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from 'img/close.svg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const { t } = useTranslation();
  const c = useStyles();
  const fullScreen = useMediaQuery('(max-width:420px)');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={'xs'}
      className={c.root}
      TransitionComponent={SlideUpTransition}
      keepMounted
    >
      <DialogContent>
        <IconButton aria-label='Close' onClick={onClose} className={c.closeButton}>
          <img style={{ width: 16, height: 16 }} src={CloseIcon} alt={t('Close')} />
        </IconButton>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    closeButton: {
      color: '#bdbdbd',
      position: 'absolute',
      right: theme.spacing(1.25),
      top: theme.spacing(1.5),
    },
  }),
);

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  ),
);
