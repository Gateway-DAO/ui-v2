import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useIntersection } from 'react-use';

import { Featured } from '@/components/landing/featured';
import { FeaturedProps } from '@/components/landing/featured/types';
import { Footer } from '@/components/landing/footer';
import { FooterProps } from '@/components/landing/footer/types';
import { Hero } from '@/components/landing/hero';
import { Investors } from '@/components/landing/investors/investors';
import { InvestorProps } from '@/components/landing/investors/types';
import { Menu } from '@/components/landing/menu/menu';
import { MenuListItem, Refs } from '@/components/landing/menu/types';
import { ProductShow } from '@/components/landing/product-show';
import { ProductShowProps } from '@/components/landing/product-show/types';
import { ScheduleDemo } from '@/components/landing/schedule-demo';
import { ScheduleDemoProps } from '@/components/landing/schedule-demo/types';
import { DEFAULT_PADDINGX } from '@/components/landing/styles';
import { useAuth } from '@/providers/auth/context';
import { theme } from '@/theme';

import { Button } from '@mui/material';
import { Box } from '@mui/system';

export default function Index() {
  const [activeArea, setActiveArea] = useState('');
  const { onOpenWalletModal } = useAuth();

  const { t } = useTranslation('index');
  const menuList = t('menu', null, { returnObjects: true }) as MenuListItem[];

  const forUsersContent = t('forUsers', null, {
    returnObjects: true,
  }) as FeaturedProps;
  const forOrganizationsContent = t('forOrganizations', null, {
    returnObjects: true,
  }) as FeaturedProps;
  const theGatewayContent = t('theGatewayContent', null, {
    returnObjects: true,
  }) as ProductShowProps;
  const buildAppsContent = t('buildAppsContent', null, {
    returnObjects: true,
  }) as ProductShowProps;
  const investorsContent = t('investorsContent', null, {
    returnObjects: true,
  }) as InvestorProps;
  const scheduleDemoContent = t('scheduleDemoContent', null, {
    returnObjects: true,
  }) as ScheduleDemoProps;
  const footerContent = t('footerContent', null, {
    returnObjects: true,
  }) as FooterProps;

  const refs: Refs = {
    hero: useRef(null),
    professionals: useRef(null),
    organizations: useRef(null),
    build: useRef(null),
    investors: useRef(null),
  };

  const organizationIntersection = useIntersection(refs.organizations, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  useEffect(() => {
    function scrollPositionCheck() {
      const windowScroll = window.scrollY;

      Object.keys(refs).map((key) => {
        if (
          windowScroll >= refs[key].current?.offsetTop - 100 &&
          windowScroll <
            refs[key].current.offsetTop + refs[key].current.clientHeight
        ) {
          setActiveArea(key);
        }
      });
    }

    organizationIntersection && organizationIntersection?.isIntersecting
      ? (document.body.style.background = theme.palette.background
          .light as string)
      : (document.body.style.background = theme.palette.background.default);
    window.addEventListener('scroll', scrollPositionCheck);
    return () => {
      window.removeEventListener('scroll', scrollPositionCheck);
    };
  }, [organizationIntersection]);

  return (
    <>
      <Menu
        menuList={menuList}
        signUpButton={
          <Button
            variant="contained"
            size="large"
            sx={{ whiteSpace: 'nowrap', height: '56px' }}
            onClick={onOpenWalletModal}
          >
            {t('signUp')}
          </Button>
        }
        connectButton={
          <Link passHref href="/home">
            <Button
              variant="outlined"
              size="large"
              sx={(theme) => ({
                whiteSpace: 'nowrap',
                height: '56px',
                [theme.breakpoints.down('sm')]: {
                  height: '30px',
                  width: 'auto',
                  maxWidth: '95px',
                },
              })}
            >
              {t('openApp')}
            </Button>
          </Link>
        }
        activeMenu={activeArea}
      />
      <Box
        component="main"
        role="main"
        sx={(theme) => ({
          px: DEFAULT_PADDINGX,
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            px: '20px',
          },
        })}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Hero
            title={t('title')}
            enterButton={
              <Button
                variant="contained"
                sx={{ height: '56px', marginTop: '38px' }}
                size="large"
                onClick={onOpenWalletModal}
              >
                {t('enterButtonTitle')}
              </Button>
            }
            subtitle={t('subtitle')}
            titleDescription={t('titleDescription')}
            ref={refs.hero}
          />
          <Featured
            {...forUsersContent}
            id="professionals"
            ref={refs.professionals}
          />
          <Featured
            {...forOrganizationsContent}
            ref={refs.organizations}
            id="organizations"
          />
          <ProductShow {...theGatewayContent} id="build" ref={refs.build} />
          <ProductShow revert={true} {...buildAppsContent} />
          <Investors
            {...investorsContent}
            id="investors"
            ref={refs.investors}
          />
          <ScheduleDemo {...scheduleDemoContent} />
          <Footer {...footerContent} />
        </Box>
      </Box>
    </>
  );
}
