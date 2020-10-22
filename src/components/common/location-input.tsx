import React, { FC, ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Autocomplete } from '@material-ui/lab';

export interface LocationInputProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
}

export const LocationInput: FC<LocationInputProps> = ({ name, label, onChange }) => {
  const c = useStyles();

  const {
    ready,
    value,
    suggestions: { data: suggestions },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ['(cities)'],
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Autocomplete
      fullWidth
      options={suggestions}
      disabled={!ready}
      className={c.autocomplete}
      getOptionLabel={({ description }) => description}
      onChange={(e, value) => onChange(value?.description ?? '')}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          variant='outlined'
          // InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          value={value}
        />
      )}
    />
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    autocomplete: {
      '& .MuiAutocomplete-endAdornment': {
        top: 'calc(50% - 13px)',
        right: '14px !important',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '1.4rem',
        color: '#8e9194',
      },
    },
  }),
);
