import React, { FC } from 'react';
import loadingSvg from 'img/loading.svg';

export interface LoadingProps {
  dense?: boolean;
}

export const Loading: FC<LoadingProps> = ({ dense = false }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 80,
        marginTop: dense ? 0 : 32,
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
};
