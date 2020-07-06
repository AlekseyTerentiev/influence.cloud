import React from 'react';
import loadingSvg from 'img/loading.svg';

export function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img src={loadingSvg} />
    </div>
  );
}
