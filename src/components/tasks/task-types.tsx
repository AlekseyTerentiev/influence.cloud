import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { ReactComponent as DiscussionIcon } from 'img/discussion.svg';
import { ReactComponent as StoryIcon } from 'img/story.svg';
import { ReactComponent as LinkIcon } from 'img/link.svg';
// import { Currency } from 'components/billing/currency';

export interface TaskTypesProps {
  onCreateTaskClick: (taskType: GetTaskTypes_taskTypes) => void;
  types: GetTaskTypes_taskTypes[];
}

export const TaskTypes: FC<TaskTypesProps> = ({ onCreateTaskClick, types }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState<
    GetTaskTypes_taskTypes | undefined
  >(types[0]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = types.find((t) => t.id === Number(e.target.value));
    console.log(type);
    setSelectedType(type);
  };

  const handleTaskCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      onCreateTaskClick(selectedType);
    }
  };

  if (!types.length) {
    return (
      <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
        <Typography>{t('No task types')}</Typography>
      </Box>
    );
  }

  const typeReady = selectedType?.name === 'discussion';

  return (
    <form className={c.root} onSubmit={handleTaskCreate}>
      <Box className={c.types}>
        {types.map((type) => (
          <Box className={c.type} key={type.id}>
            <input
              type='radio'
              name='task-type'
              value={type.id}
              className={c.input}
              checked={selectedType?.id === type.id}
              onChange={handleTypeChange}
              id={'type-' + type.id}
            />
            <label htmlFor={'type-' + type.id}>
              {type.name === 'discussion' ? (
                <DiscussionIcon className={clsx(c.icon, c.discussionIcon)} />
              ) : type.name === 'story' ? (
                <StoryIcon className={clsx(c.icon)} />
              ) : (
                <LinkIcon className={clsx(c.icon, c.linkIcon)} />
              )}
              {t(type.title)}
            </label>
          </Box>
        ))}
      </Box>

      {selectedType && (
        <>
          <Typography className={c.description}>
            {t(selectedType.description)}
          </Typography>

          {/* <Currency
            value={
              selectedType.averageCost +
              selectedType.averageCost * selectedType.companyCommission * 0.01
            }
          /> */}

          <Button
            type='submit'
            color='primary'
            className={c.submitButton}
            variant='contained'
            fullWidth
            disabled={!typeReady}
          >
            {typeReady ? t('Create task') : t('Coming soon')}
          </Button>
        </>
      )}
    </form>
  );
};

const color = 'rgb(251, 111, 120)';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 470,
      paddingBottom: theme.spacing(3),
      borderBottom: `1px solid ${theme.palette.divider}`,
      '@media(min-width:400px)': {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(4),
      },
    },
    types: {
      display: 'flex',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(1.5),
      border: `1px solid ${color}`,
      [theme.breakpoints.up('md')]: {
        borderRadius: theme.shape.borderRadius * 2,
        marginBottom: theme.spacing(2),
        borderWidth: 2,
      },
    },
    type: {
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-block',
      flex: 1,
      '&:not(:last-child)': {
        borderRight: `1px solid ${color}`,
        [theme.breakpoints.up('md')]: {
          borderWidth: 2,
        },
      },
    },
    input: {
      outline: 'none',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      appearance: 'none',
      borderRadius: 0,
      border: 'none',
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      zIndex: -1,
      color: color,
      transition: 'background .2s',
      '&:hover': {
        background: '#ffe5e7',
      },
      '& + label': {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        color: color,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
        fontSize: 15,
        fontWeight: theme.typography.fontWeightMedium,
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(1.25, 2),
          fontSize: 16,
        },
      },
      '&:checked + label': {
        outline: 'none',
        background: color,
        color: 'white',
      },
    },
    icon: {
      height: 44,
      width: 44,
    },
    discussionIcon: {
      padding: '4px 0',
    },
    linkIcon: {
      padding: '5px 0',
    },
    description: {
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1.5),
    },
    submitButton: {
      background: 'rgb(24, 40, 78)',
    },
  }),
);
