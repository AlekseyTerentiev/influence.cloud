import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useStyles } from './task-types.s';
import { useTranslation } from 'react-i18next';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Box, Button, Typography } from '@material-ui/core';
import { ReactComponent as CommentsIcon } from 'img/comments.svg';
import { ReactComponent as StoryIcon } from 'img/story.svg';
import { ReactComponent as LinkIcon } from 'img/link.svg';
import { ReactComponent as CommentTypePic } from './img/comment-type.svg';
import { ReactComponent as StoryTypePic } from './img/story-type.svg';
import { ReactComponent as BioLinkTypePic } from './img/bio-link-type.svg';
import { Currency } from 'components/billing/currency';

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
          <div className={c.type} key={type.id}>
            <input
              type='radio'
              name='task-type'
              value={type.id}
              className={c.input}
              checked={selectedType?.id === type.id}
              onChange={handleTypeChange}
              id={'type-' + type.id}
            />
            <label className={c.label} htmlFor={'type-' + type.id}>
              <span className={c.typeIcon}>
                {type.type === 'instagram_discussion' ? (
                  <CommentsIcon />
                ) : type.type === 'instagram_story' ? (
                  <StoryIcon />
                ) : (
                  <LinkIcon />
                )}
              </span>
              {t(type.title)}
            </label>
          </div>
        ))}
      </Box>

      {selectedType && (
        <>
          {selectedType.type === 'instagram_discussion' ? (
            <CommentTypePic className={c.illustration} />
          ) : selectedType.type === 'instagram_story' ? (
            <StoryTypePic className={c.illustration} />
          ) : (
            <BioLinkTypePic className={c.illustration} />
          )}

          <Box className={c.titleContainer}>
            <Typography className={c.title}>
              {selectedType.type === 'instagram_discussion'
                ? 'Get Into the Top, Faster'
                : selectedType.type === 'instagram_story'
                ? 'Get New Unique Stories'
                : 'Get More Traffic, Than Ever'}
            </Typography>
            {!!selectedType.averageCost && (
              <Typography className={c.price}>
                ~<Currency value={selectedType.averageCost} />
              </Typography>
            )}
          </Box>

          <Typography color='textSecondary' className={c.description}>
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
            variant='contained'
            fullWidth
            disabled={!selectedType.ready}
            className={c.submitButton}
          >
            {selectedType.ready ? t('Create task') : t('Coming soon')}
          </Button>
        </>
      )}
    </form>
  );
};
