import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  MenuItem,
  Select,
} from '@material-ui/core';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Language: FC<Props> = ({ ...other }) => {
  const c = useStyles();
  const { i18n } = useTranslation();

  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) {
    i18n.changeLanguage(String(event.target.value));
  }

  return (
    <Box {...other}>
      <Select
        className={c.select}
        value={i18n.language.split('-')[0]}
        onChange={handleChange}
        disableUnderline
      >
        {Object.keys(i18n.services.resourceStore.data).map((language) => (
          <MenuItem key={language} value={language}>
            {language.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      opacity: '0.85',
      fontSize: '1.25rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
      },
    },
  }),
);
