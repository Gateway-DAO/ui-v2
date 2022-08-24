import { PropsWithChildren } from 'react';

import { MotionBox } from '../../motion/motion';
import { withGradientAfter } from './styles';
import { useNav } from './use-nav';

export function Container({ children }: PropsWithChildren<unknown>) {
  const { isOpen } = useNav();
  return (
    <MotionBox
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        position: 'relative',
        zIndex: 1,
        ':after': withGradientAfter,
      }}
      animate={
        isOpen
          ? { overflowX: 'hidden' }
          : {
              overflowX: 'visible',
              transition: {
                delay: 0.225,
              },
            }
      }
    >
      {children}
    </MotionBox>
  );
}
