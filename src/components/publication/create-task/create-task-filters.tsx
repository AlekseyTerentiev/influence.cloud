import React, { FC, ChangeEvent } from 'react';
import { Box, TextField } from '@material-ui/core';
import { AccountLanguage, Gender } from 'gql/types/globalTypes';
import { CountrySelect } from 'components/common/input/country-select';
import { LanguageSelect } from 'components/common/input/language-select';
import { GenderSelect } from 'components/common/input/gender-select';

export interface TaskFilters {
  countries: string[];
  languages: AccountLanguage[];
  genders: Gender[];
  ageTo: string;
  ageFrom: string;
  followersAmount?: string;
}

export interface CreateTaskFiltersProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

export const CreateTaskFilters: FC<CreateTaskFiltersProps> = ({
  filters,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<any>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box display='flex'>
        <CountrySelect
          name='countries'
          value={filters.countries}
          onChange={handleChange}
        />
        <Box ml={1.25} />
        <LanguageSelect
          value={filters.languages}
          onChange={handleChange}
          label='Languages'
          name='languages'
          multiple
        />
        <Box ml={1.25} />
        <GenderSelect
          value={filters.genders}
          onChange={handleChange}
          label='Genders'
          name='genders'
          multiple
        />
      </Box>

      <Box display='flex'>
        {filters.followersAmount !== undefined && (
          <>
            <TextField
              type='number'
              label='Min Followers'
              name='followersAmount'
              value={filters.followersAmount}
              onChange={handleChange}
              placeholder='0'
              variant='outlined'
              margin='dense'
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Box ml={1.25} />
          </>
        )}
        <TextField
          type='number'
          label='Min Age'
          name='ageFrom'
          value={filters.ageFrom}
          onChange={handleChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Box ml={1.25} />
        <TextField
          type='number'
          label='Max Age'
          name='ageTo'
          value={filters.ageTo}
          onChange={handleChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </>
  );
};
