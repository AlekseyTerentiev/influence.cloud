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
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidthOnMobile?: boolean;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = 'xs',
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
      fullWidth={true}
      maxWidth={maxWidth}
      TransitionComponent={SlideUpTransition}
      keepMounted
    >
      <DialogContent className={className}>
        <IconButton
          aria-label={t('Close')}
          onClick={onClose}
          className={c.closeButton}
        >
          <CloseIcon style={{ width: 16, height: 16 }} />
        </IconButton>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      background: 'white',
      '&:hover': {
        background: '#eee',
      },
      boxShadow: '0px 0px 1px 1px #f5f5f5',
      color: '#bdbdbd',
      position: 'absolute',
      right: theme.spacing(1.1),
      top: theme.spacing(1),
      zIndex: 1,
    },
  }),
);

const SlideUpTransition = React.forwardRef(
  (props: TransitionProps, ref: React.Ref<unknown>) => (
    <Slide direction='up' ref={ref} {...props} timeout={350} />
  ),
);
