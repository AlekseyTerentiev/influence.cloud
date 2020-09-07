import React, { FC, HTMLAttributes, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  MenuItem,
  Select,
} from '@material-ui/core';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Language: FC<Props> = ({ ...otherProps }) => {
  const c = useStyles();
  const { i18n } = useTranslation();

  const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    i18n.changeLanguage(String(e.target.value));
  };

  return (
    <Box {...otherProps}>
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

const useStyles = makeStyles((t: Theme) =>
  createStyles({
    select: {
      opacity: '0.9',
      // color: t.palette.grey[700],
      fontSize: '1.25rem',
    },
  }),
);
