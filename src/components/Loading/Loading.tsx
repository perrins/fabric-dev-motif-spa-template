import { MotifProgressLoader } from '@ey-xd/motif-react';
import React from 'react';

const Loading = () => (
  <>
    <MotifProgressLoader show fullscreen data-testid="motif-progress-loader" />
  </>
);
export default Loading;