import React, { FC, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AccountLanguage } from 'gql/types/globalTypes';

export interface LanguageSelectProps {
  value: string | string[];
  onChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
  multiple?: boolean;
  label: string;
  name?: string;
}

export const LanguageSelect: FC<LanguageSelectProps> = ({
  value,
  onChange,
  multiple,
  label,
  name,
}) => {
  return (
    <FormControl
      fullWidth
      variant='outlined'
      margin='dense'
      style={{ textAlign: 'start' }}
    >
      <InputLabel id='language-select-label'>{label}</InputLabel>
      <Select
        name={name}
        labelId='languages-select-label'
        multiple={multiple}
        value={value}
        onChange={onChange}
        style={{ textTransform: 'capitalize' }}
      >
        {Object.entries(AccountLanguage).map(([k, v]) => (
          <MenuItem key={k} value={v} style={{ textTransform: 'capitalize' }}>
            {languagesNames[k]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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
