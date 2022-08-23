import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCookie } from 'react-use';

/* Caches preferred user language */
export function usePersistLocale() {
  const { locale, defaultLocale } = useRouter();
  const [_, setCookie] = useCookie('NEXT_LOCALE');

  useEffect(() => {
    if (locale !== defaultLocale) {
      setCookie(locale || defaultLocale!);
    }
  }, [locale, defaultLocale, setCookie]);
}
