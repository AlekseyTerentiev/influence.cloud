import React, { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Gender } from 'gql/types/globalTypes';

export interface GenderSelectProps {
  value: string | string[];
  onChange: (e: ChangeEvent<{ name?: string; value: unknown }>) => void;
  multiple?: boolean;
  label: string;
  name?: string;
}

export const GenderSelect: FC<GenderSelectProps> = ({
  value,
  onChange,
  multiple,
  label,
  name,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl
      fullWidth
      variant='outlined'
      margin='dense'
      style={{ textAlign: 'start' }}
    >
      <InputLabel id='gender-select-label'>{label}</InputLabel>
      <Select
        name={name}
        labelId='gender-select-label'
        multiple={multiple}
        value={value}
        onChange={onChange}
        style={{ textTransform: 'capitalize' }}
      >
        {Object.entries(Gender).map(([k, v]) => (
          <MenuItem key={k} value={v} style={{ textTransform: 'capitalize' }}>
            {t(v)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
