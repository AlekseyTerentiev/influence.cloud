import React, { FC /*, useState*/, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@material-ui/core';

export interface TaskBudgetInputProps {
  // averageCost: number;
  // companyCommission: number;
  budget: string;
  bonus: string;
  onBudgetChange: (value: string) => void;
  onBonusChange: (value: string) => void;
}

export const TaskBudgetInput: FC<TaskBudgetInputProps> = ({
  // averageCost,
  // companyCommission,
  budget = '',
  bonus = '',
  onBudgetChange,
  onBonusChange,
}) => {
  const { t } = useTranslation();
  // const c = useStyles();

  // const getTaskCost = (bonus: number | string) => {
  //   const costWithComission = averageCost + averageCost * companyCommission * 0.01;
  //   return costWithComission + costWithComission * Number(bonus) * 0.01;
  // };

  // const getBudget = (taskCost: number | string, executions: number | string) =>
  //   Math.ceil(Number(taskCost) * Number(executions));

  // const [executions, setExecutions] = useState(
  //   Math.floor((Number(budget) * 100) / getTaskCost(bonus)).toString(),
  // );

  // const taskCost = getTaskCost(bonus);

  // const handleExecutionsChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const executions = e.target.value.replace(/\D/, '');
  //   setExecutions(executions);
  //   const budget = Math.ceil(Number(taskCost) * Number(executions));
  //   onBudgetChange((budget / 100).toFixed(2));
  // };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBudgetChange(e.target.value);
    // const budget = parseFloat(e.target.value.replace(',', '.')) || 0;
    // setExecutions(Math.floor((Number(budget) * 100) / Number(taskCost)).toString());
  };

  const handleBonusChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBonusChange(e.target.value);
    // onBudgetChange(
    //   (getBudget(getTaskCost(e.target.value), executions) / 100).toFixed(2),
    // );
  };

  return (
    <>
      <Box display='flex'>
        <TextField
          type='number'
          inputProps={{
            step: 0.1,
          }}
          label={t('Budget')}
          name='budget'
          value={budget}
          onChange={handleBudgetChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          style={{ flex: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
          }}
        />
        <Box ml={1.25} />
        <TextField
          select
          label={t('Tips')}
          name='tips'
          value={bonus}
          onChange={handleBonusChange}
          placeholder='0'
          variant='outlined'
          margin='dense'
          fullWidth
          style={{ flex: 0.65 }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
          }}
          SelectProps={{
            native: true,
          }}
        >
          {Array.from(Array(21).keys()).map((i) => (
            <option key={i} value={i * 5}>
              {i * 5}
            </option>
          ))}
        </TextField>

        {/* <TextField
          type='number'
          label={t('Executions')}
          placeholder='0'
          name='executions'
          value={executions}
          onChange={handleExecutionsChange}
          variant='outlined'
          margin='dense'
          fullWidth
          style={{ marginLeft: 10 }}
          InputProps={{
            startAdornment: <InputAdornment position='start'>~</InputAdornment>,
          }}
        /> */}
      </Box>

      <Box ml={1} mb={1} color='text.hint'>
        <Typography style={{ fontSize: '0.85rem' }}>
          {t(
            'Tips make your assignment stand out and allows you to attract better performers',
          )}
        </Typography>
      </Box>
    </>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
  }),
);
