import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Autocomplete } from '@material-ui/lab';

export interface LocationInputProps {
  name: string;
  label: string;
  onChange: (placeId: string | null) => void;
}

export const LocationInput: FC<LocationInputProps> = ({ name, label, onChange }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { ready, suggestions, setValue } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      types: ['(cities)'],
    },
  });

  return (
    <Autocomplete
      fullWidth
      popupIcon={false}
      noOptionsText={t('Type city and select from the list')}
      options={suggestions.data}
      disabled={!ready}
      className={c.autocomplete}
      getOptionLabel={({ description }) => description}
      onChange={(e, value) => onChange(value?.place_id || null)}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          variant='outlined'
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    />
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    autocomplete: {
      '& .MuiSvgIcon-root': {
        fontSize: '1.4rem',
        color: '#8e9194',
      },
    },
  }),
);
