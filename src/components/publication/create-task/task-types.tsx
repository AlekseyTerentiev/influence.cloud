import React, { FC, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { GetTaskTypes_taskTypes } from 'gql/types/GetTaskTypes';
import { Box, Typography } from '@material-ui/core';
import { ReactComponent as CommentsIcon } from 'img/comments.svg';
import { ReactComponent as StoryIcon } from 'img/story.svg';
import { ReactComponent as LinkIcon } from 'img/link.svg';
// import { ReactComponent as CommentTypePic } from 'img/comment-type.svg';
// import { ReactComponent as StoryTypePic } from 'img/story-type.svg';
// import { ReactComponent as BioLinkTypePic } from 'img/bio-link-type.svg';
// import { Currency } from 'components/billing/currency';

import { useStyles } from './task-types.s';

export interface TaskTypesProps {
  onChange: (taskType: GetTaskTypes_taskTypes) => void;
  types: GetTaskTypes_taskTypes[];
  selectedType?: GetTaskTypes_taskTypes;
}

export const TaskTypes: FC<TaskTypesProps> = ({ onChange, types, selectedType }) => {
  const c = useStyles();
  const { t } = useTranslation();

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = types.find((t) => t.id === Number(e.target.value));
    if (type) {
      onChange(type);
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
    <div className={c.root}>
      <div className={c.types}>
        {types.map((type) => (
          <div className={c.type} key={type.id}>
            <input
              type='radio'
              name='task-type'
              value={type.id}
              className={c.input}
              checked={type?.id === selectedType?.id}
              onChange={handleTypeChange}
              id={'type-' + type.id}
              disabled={!type?.ready}
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
      </div>

      {selectedType && (
        <>
          {/* {selectedType.type === 'instagram_discussion' ? (
            <CommentTypePic className={c.illustration} />
          ) : selectedType.type === 'instagram_story' ? (
            <StoryTypePic className={c.illustration} />
          ) : (
            <BioLinkTypePic className={c.illustration} />
          )} */}

          <Typography className={c.description}>
            {t(selectedType.description)}
          </Typography>
        </>
      )}
    </div>
  );
};
