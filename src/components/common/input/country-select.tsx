import React, { FC, ChangeEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Countries from 'country-list';

export interface CountrySelectProps {
  value: string[];
  onChange: (e: ChangeEvent<any>) => void;
  name: string;
  label: string;
}

export const CountrySelect: FC<CountrySelectProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <FormControl fullWidth variant='outlined' margin='dense'>
      <InputLabel id='country-select-label'>{label}</InputLabel>
      <Select
        labelId='country-select-label'
        id='country-select'
        multiple
        value={value}
        onChange={onChange}
        name={name}
      >
        {Countries.getNames().map((countryName) => (
          <MenuItem
            key={countryName}
            value={Countries.getCode(countryName)}
            style={{ textTransform: 'capitalize' }}
          >
            {countryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
