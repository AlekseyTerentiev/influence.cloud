import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createStyles,
  makeStyles,
  Theme,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import 'react-phone-number-input/style.css';
import ReactPhoneInput from 'react-phone-number-input';

export interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneInput: FC<PhoneInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const c = useStyles();

  return (
    <FormControl fullWidth variant='outlined' margin='normal'>
      <InputLabel shrink>{t('Phone')}</InputLabel>
      <OutlinedInput value='' disabled />
      <ReactPhoneInput
        placeholder={t('Phone number')}
        className={c.phoneInput}
        defaultCountry='US'
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    phoneInput: {
      position: 'absolute',
      width: '100%',
      top: '70%',
      transform: 'translateY(-50%)',
      padding: theme.spacing(0, 2),
      '& input': {
        padding: 0,
        paddingLeft: 4,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize + 1,
        fontWeight: theme.typography.fontWeightMedium,
        background: 'transparent',
        border: 'none',
        '&::placeholder': {
          color: 'rgba(52, 55, 76, 0.7)',
          fontWeight: theme.typography.fontWeightRegular,
        },
        '&:focus': {
          outline: 'none',
        },
      },
      '& .PhoneInputCountry': {
        '--PhoneInputCountryFlag-height': '0.8em',
      },
      '& .PhoneInputCountrySelectArrow': {
        borderStyle: 'solid',
        borderTopWidth: '0',
        borderBottomWidth: 'var(--PhoneInputCountrySelectArrow-borderWidth)',
        borderLeftWidth: '0',
        borderRightWidth: 'var(--PhoneInputCountrySelectArrow-borderWidth)',
      },
    },
  }),
);
