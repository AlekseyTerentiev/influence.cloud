import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { AccountLanguage } from 'gql/types/globalTypes';

export interface LanguageSelectProps {
  value: AccountLanguage | AccountLanguage[];
  onChange: (value: AccountLanguage | AccountLanguage[]) => void;
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
  const c = useStyles();
  const { t } = useTranslation();

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    onChange(event.target.value as AccountLanguage);
  };

  const handleSelectAllClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(Object.values(AccountLanguage));
  };

  const handleDeselectAllClick = (e: MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

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
        onChange={handleChange}
        style={{ textTransform: 'capitalize' }}
      >
        {multiple && (
          <div className={c.innerMenu}>
            <Button
              fullWidth
              size='large'
              onClick={handleSelectAllClick}
              className={c.innerMenuButton}
            >
              {t('Select All')}
            </Button>
            <Button
              fullWidth
              size='large'
              onClick={handleDeselectAllClick}
              className={c.innerMenuButton}
            >
              {t('Deselect All')}
            </Button>
          </div>
        )}

        {Object.entries(AccountLanguage).map(([k, v]) => (
          <MenuItem key={k} value={v} style={{ textTransform: 'capitalize' }}>
            {t(languagesNames[k])}
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
      background: 'white',
      zIndex: 1,
      borderBottom: `1px solid ${t.palette.divider}`,
    },
    innerMenuButton: {
      justifyContent: 'flex-start',
      padingLeft: t.spacing(2),
    },
  }),
);

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
