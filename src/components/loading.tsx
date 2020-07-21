import React from 'react';
import loadingSvg from 'img/loading.svg';

export function Loading() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 80,
        marginTop: 32,
      }}
    >
      <img
        src={loadingSvg}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
