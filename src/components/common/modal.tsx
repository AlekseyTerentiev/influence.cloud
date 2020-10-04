import React, { FC, ReactNode, forwardRef, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  useMediaQuery,
  Container,
  Slide,
  Dialog,
  Button,
  IconButton,
  DialogContent,
  useTheme,
  Box,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { ReactComponent as BackIcon } from 'img/back.svg';
import { ReactComponent as CloseIcon } from 'img/close.svg';
import clsx from 'clsx';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
  keepMounted?: boolean;
  mobileSlideLeft?: boolean;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  maxWidth = 'xs',
  fullWidth = true,
  fullWidthOnMobile = true,
  className = '',
  keepMounted = false,
  mobileSlideLeft = false,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullWidthOnMobile && xsDown}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      keepMounted={keepMounted}
      TransitionComponent={
        xsDown && mobileSlideLeft ? SlideLeftTransition : SlideUpTransition
      }
    >
      {xsDown && mobileSlideLeft ? (
        <Container>
          <Button onClick={onClose} className={c.backButton}>
            <BackIcon className={c.backButtonIcon} /> Back
          </Button>
        </Container>
      ) : (
        <IconButton
          aria-label={t('Close')}
          onClick={onClose}
          className={c.closeButton}
        >
          <CloseIcon style={{ width: 16, height: 16 }} />
        </IconButton>
      )}

      <DialogContent style={{ padding: 0 } /* for safari fix */}>
        <Container>
          <Box
            pt={xsDown && mobileSlideLeft ? 0 : 5.5}
            pb={xsDown && fullWidthOnMobile ? 10 : 4}
            className={clsx(c.content, className)}
          >
            {children}
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    backButton: {
      fontSize: 20,
      lineHeight: '28px',
      fontWeight: 500,
      letterSpacing: -0.2,
      margin: t.spacing(2, 0, 1.25),
      paddingLeft: 0,
    },
    backButtonIcon: {
      width: 9,
      height: 18,
      marginRight: t.spacing(1.25),
    },
    closeButton: {
      '&:hover': {
        background: '#eee',
      },
      color: '#bdbdbd',
      position: 'absolute',
      right: 6,
      top: 6,
      zIndex: 999,
      [t.breakpoints.down('sm')]: {
        background: 'white',
        border: '1px solid #f5f5f5',
      },
    },
    content: {
      [t.breakpoints.up('sm')]: {
        paddingTop: t.spacing(4),
        paddingBottom: t.spacing(4),
      },
      [t.breakpoints.up('md')]: {
        paddingTop: t.spacing(6),
        paddingBottom: t.spacing(5),
      },
    },
  }),
);

const SlideUpTransition = forwardRef((props: TransitionProps, ref: Ref<unknown>) => (
  <Slide direction='up' ref={ref} {...props} timeout={350} />
));

const SlideLeftTransition = forwardRef(
  (props: TransitionProps, ref: Ref<unknown>) => (
    <Slide direction='left' ref={ref} {...props} timeout={250} />
  ),
);
