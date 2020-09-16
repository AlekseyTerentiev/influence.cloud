import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
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
  >(types[2]);

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = types.find((t) => t.id === Number(e.target.value));
    setSelectedType(type);
  };

  const handleTaskCreate = async (e: FormEvent) => {
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
              {type.type === 'instagram_discussion' ? (
                <DiscussionIcon className={clsx(c.icon, c.discussionIcon)} />
              ) : type.type === 'instagram_story' ? (
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
            disabled={!selectedType.ready}
          >
            {selectedType.ready ? t('Create task') : t('Coming soon')}
          </Button>
        </>
      )}
    </form>
  );
};

const activeTypeColor = 'rgb(251, 111, 120)';

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {
      maxWidth: 470,
      paddingBottom: t.spacing(3),
      borderBottom: `1px solid ${t.palette.divider}`,
      '@media(min-width:400px)': {
        border: `1px solid ${t.palette.divider}`,
        borderRadius: t.shape.borderRadius,
        padding: t.spacing(4),
      },
    },
    types: {
      display: 'flex',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      borderRadius: t.shape.borderRadius,
      marginBottom: t.spacing(1.5),
      border: `1px solid ${activeTypeColor}`,
      [t.breakpoints.up('md')]: {
        borderRadius: t.shape.borderRadius * 2,
        marginBottom: t.spacing(2),
        borderWidth: 2,
      },
    },
    type: {
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-block',
      flex: 1,
      '&:not(:last-child)': {
        borderRight: `1px solid ${activeTypeColor}`,
        [t.breakpoints.up('md')]: {
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
      color: activeTypeColor,
      transition: 'background .2s',
      '&:hover': {
        background: '#ffe5e7',
      },
      '& + label': {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        color: activeTypeColor,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: t.spacing(1.5, 1, 1),
        fontSize: 15,
        fontWeight: t.typography.fontWeightMedium,
        [t.breakpoints.up('md')]: {
          padding: t.spacing(2, 1.5, 1.5),
          fontSize: 16,
        },
      },
      '&:checked + label': {
        outline: 'none',
        background: activeTypeColor,
        color: 'white',
      },
    },
    icon: {
      height: 42,
      width: 42,
      marginBottom: 2,
    },
    discussionIcon: {
      padding: '4px 0',
    },
    linkIcon: {
      padding: '5px 0',
    },
    description: {
      fontSize: t.typography.body2.fontSize,
      color: t.palette.text.secondary,
      marginBottom: t.spacing(1.5),
    },
    submitButton: {
      background: 'rgb(24, 40, 78)',
    },
  }),
);
