import React, { FC, useState, ChangeEvent } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Slider as MuiSlider,
  Typography,
} from '@material-ui/core';

export interface SliderProps {
  defaultValue: number | number[];
  onChangeCommitted: (event: any, newValue: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  valueFormat?: (v: number) => string;
}

export const Slider: FC<SliderProps> = ({
  defaultValue,
  onChangeCommitted,
  min,
  max,
  step,
  valueFormat,
}) => {
  const c = useStyles();

  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<{}>, value: number | number[]) => {
    setValue(value);
  };

  return (
    <Box className={c.root}>
      {typeof value === 'object' && (
        <div className={c.values}>
          <Typography>{valueFormat ? valueFormat(value[0]) : value}</Typography>
          <Typography>{valueFormat ? valueFormat(value[1]) : value}</Typography>
        </div>
      )}
      <Box className={c.sliderContainer}>
        <MuiSlider
          className={c.slider}
          defaultValue={defaultValue}
          onChange={handleChange}
          onChangeCommitted={onChangeCommitted}
          valueLabelDisplay='off'
          min={min}
          max={max}
          step={step}
        />
      </Box>
    </Box>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      paddingTop: t.spacing(0.5),
    },
    sliderContainer: {
      paddingLeft: t.spacing(0.5),
      paddingRight: t.spacing(0.5),
    },
    slider: {
      paddingTop: t.spacing(1.5),
      paddingBottom: t.spacing(2),
    },
    values: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);
