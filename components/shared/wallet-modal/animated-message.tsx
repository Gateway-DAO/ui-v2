import { PropsWithChildren } from 'react';

import { MotionBox } from '@/components/shared/motion/motion';

export const AnimatedMessage = ({ children }: PropsWithChildren<unknown>) => (
  <MotionBox
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ ease: 'easeInOut' }}
    sx={{
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
    }}
  >
    {' '}
    {children}
  </MotionBox>
);
