import React, { FC, ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';
import Countries from 'country-list';

export interface CountrySelectProps {
  value: string[];
  onChange: (countries: string[]) => void;
  name: string;
  label: string;
}

export const CountrySelect: FC<CountrySelectProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<any>) => {
    onChange(e.target.value);
  };

  const handleSelectAllClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(Countries.getCodes());
  };

  const handleDeselectAllClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <FormControl fullWidth variant='outlined' margin='dense'>
      <InputLabel id='country-select-label'>{label}</InputLabel>
      <Select
        labelId='country-select-label'
        id='country-select'
        multiple
        value={value}
        onChange={handleChange}
        name={name}
      >
        <div className={c.innerMenu}>
          <Button fullWidth size='large' onClick={handleSelectAllClick}>
            {t('Select All')}
          </Button>
          <Button fullWidth size='large' onClick={handleDeselectAllClick}>
            {t('Deselect All')}
          </Button>
        </div>

        {Countries.getNames().map((countryName) => (
          <MenuItem
            key={countryName}
            value={Countries.getCode(countryName)}
            style={{ textTransform: 'capitalize' }}
          >
            {t(countryName)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    innerMenu: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      background: 'white',
      zIndex: 1,
      borderBottom: `1px solid ${t.palette.divider}`,
    },
  }),
);
