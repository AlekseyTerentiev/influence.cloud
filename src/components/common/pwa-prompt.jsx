import React from 'react';
import { useTranslation } from 'react-i18next';
import IosPwaPrompt from 'react-ios-pwa-prompt';

export const PwaPrompt = () => {
  const { t } = useTranslation();

  return (
    <IosPwaPrompt
      // promptOnVisit={2}
      timesToShow={5}
      permanentlyHideOnDismiss={false}
      copyBody={t(
        'Add this webapp on your home screen to use it in as any other app.',
      )}
      copyClosePrompt={t('Close')}
    />
  );
};
