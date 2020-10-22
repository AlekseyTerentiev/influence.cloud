import React, { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { AccountLanguage } from 'gql/types/globalTypes';
import { Gender } from 'gql/types/globalTypes';
import { CountrySelect } from 'components/common/country-select';

export interface TaskFilters {
  countries: string[];
  languages: AccountLanguage[];
  gender: Gender;
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
  const { t } = useTranslation();

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
        <FormControl fullWidth variant='outlined' margin='dense'>
          <InputLabel id='language-select-label'>Language</InputLabel>
          <Select
            name='languages'
            labelId='languages-select-label'
            id='languages-select'
            multiple
            value={filters.languages}
            onChange={handleChange}
          >
            {Object.entries(AccountLanguage).map(([key, value]) => (
              <MenuItem
                key={key}
                value={value}
                style={{ textTransform: 'capitalize' }}
              >
                {languagesNames[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box ml={1.25} />

        <FormControl fullWidth margin='dense' variant='outlined'>
          <InputLabel id='gender-label'>{t('Gender')}</InputLabel>
          <Select
            name='gender'
            labelId='gender-label'
            id='gender'
            value={filters.gender}
            onChange={handleChange}
          >
            <MenuItem value='male'>{t('Male')}</MenuItem>
            <MenuItem value='female'>{t('Female')}</MenuItem>
            <MenuItem value='unknown'>{t('Other')}</MenuItem>
          </Select>
        </FormControl>
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

export const languagesNames: any = {
  en: 'English',
  zh: 'Chinese',
  cs: 'Czech',
  fr: 'French',
  de: 'German',
  el: 'Greek',
  hi: 'Hindi',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  jv: 'Javanese',
  ko: 'Korean',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  es: 'Spanish',
  te: 'Telugu',
  tr: 'Turkish',
  uk: 'Ukrainian',
  vi: 'Vietnamese',
};
