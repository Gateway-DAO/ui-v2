import { PartialDeep } from 'type-fest';

import { Gates } from '@/types/hasura.generated';

export const badgeProps = (gate: PartialDeep<Gates>) =>
  gate?.image
    ? {
        src: gate.image,
        alt: gate.title!,
      }
    : undefined;
