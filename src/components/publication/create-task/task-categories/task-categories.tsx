import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { ReactComponent as CategoryBlogPicSvg } from './img/category-blog.svg';
import { ReactComponent as CategorySalesPicSvg } from './img/category-sales.svg';
import { ReactComponent as CategoryBrandPicSvg } from './img/category-brand.svg';

import { useStyles } from './task-categories.s';

export interface TASK_CATEGORY {
  title: string;
  subtitles: string[];
  image: any;
  taskTypesIds: number[];
}

export const TASK_CATEGORIES: TASK_CATEGORY[] = [
  {
    title: 'Grow your blog',
    subtitles: ['Attract new followers', 'Increase engagement'],
    image: CategoryBlogPicSvg,
    taskTypesIds: [2, 1, 3],
  },
  {
    title: 'Generate sales',
    subtitles: ['Website traffic', 'Involve in promo'],
    image: CategorySalesPicSvg,
    taskTypesIds: [2, 3],
  },
  {
    title: 'Brand growth',
    subtitles: ['Audience reach', 'Attract new followers'],
    image: CategoryBrandPicSvg,
    taskTypesIds: [2, 3],
  },
];

export interface TaskCategoriesProps {
  onCategoryClick: (category: TASK_CATEGORY) => void;
}

export const TaskCategories: FC<TaskCategoriesProps> = ({ onCategoryClick }) => {
  const c = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant='h6' className={c.header}>
        {t('Choose Your Goal')}
      </Typography>
      <div className={c.categories}>
        {TASK_CATEGORIES.map((category) => (
          <button
            key={category.title}
            className={c.category}
            onClick={() => onCategoryClick(category)}
          >
            {<category.image className={c.categoryImage} />}
            <div>
              <Typography variant='h6' gutterBottom>
                {t(category.title)}
              </Typography>
              {category.subtitles.map((subtitle) => (
                <Typography key={subtitle} variant='subtitle2' color='textSecondary'>
                  {t(subtitle)}
                </Typography>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
