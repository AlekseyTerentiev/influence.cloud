import React, { FC, ChangeEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Countries from 'country-list';

export interface CountrySelectProps {
  value: string[];
  onChange: (e: ChangeEvent<any>) => void;
  name: string;
}

export const CountrySelect: FC<CountrySelectProps> = ({ value, onChange, name }) => {
  return (
    <FormControl fullWidth variant='outlined' margin='dense'>
      <InputLabel id='country-select-label'>Countries</InputLabel>
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
