import React from 'react';
import IosPwaPrompt from 'react-ios-pwa-prompt';

export const PwaPrompt = () => (
  <IosPwaPrompt
    // promptOnVisit={2}
    timesToShow={5}
    permanentlyHideOnDismiss={false}
    copyBody='Add this webapp on your home screen to use it in as any other app.'
    copyClosePrompt='Close'
  />
);
