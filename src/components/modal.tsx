import React, { FC, ReactNode } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Slide,
  Dialog,
  IconButton,
  DialogContent,
  useTheme,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ReactComponent as CloseIcon } from 'img/close.svg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = 'xs',
}) => {
  const c = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={maxWidth}
      className={c.root}
      TransitionComponent={SlideUpTransition}
      keepMounted
    >
      <DialogContent>
        <IconButton aria-label='Close' onClick={onClose} className={c.closeButton}>
          <CloseIcon style={{ width: 16, height: 16 }} />
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
      right: theme.spacing(1),
      top: theme.spacing(1),
      zIndex: 1,
      [theme.breakpoints.down('xs')]: {
        background: 'white',
      },
    },
  }),
);

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  ),
);
