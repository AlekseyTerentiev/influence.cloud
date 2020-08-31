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
  useTheme,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ReactComponent as CloseIcon } from 'img/close.svg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = 'xs',
  fullWidth = true,
  fullWidthOnMobile = true,
  className = '',
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullWidthOnMobile && fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      TransitionComponent={SlideUpTransition}
      keepMounted
      scroll='body'
    >
      <IconButton
        aria-label={t('Close')}
        onClick={onClose}
        className={c.closeButton}
      >
        <CloseIcon style={{ width: 16, height: 16 }} />
      </IconButton>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      '&:hover': {
        background: '#eee',
      },
      color: '#bdbdbd',
      position: 'absolute',
      right: 6,
      top: 6,
      zIndex: 999,
      [theme.breakpoints.down('sm')]: {
        background: 'white',
        border: '1px solid #f5f5f5',
      },
    },
  }),
);

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  ),
);
