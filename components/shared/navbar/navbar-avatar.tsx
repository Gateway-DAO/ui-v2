import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { useSnackbar } from 'notistack';
import { useCopyToClipboard } from 'react-use';
import { useAccount, useNetwork } from 'wagmi';

import { AvatarFile } from '@/components/shared/avatar-file';
import { ROUTES } from '@/constants/routes';
import { useMenu } from '@/hooks/use-menu';
import { useAuth } from '@/providers/auth';

import { ArrowDropDown } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ListItemText } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { icons } from './wallet-icons';

type Props = {
  hideProfile?: boolean;
};

export function NavBarAvatar({ hideProfile }: Props) {
  const { t } = useTranslation('navbar');
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();
  const { chain } = useNetwork();
  const { connector } = useAccount();
  const { onSignOut, me } = useAuth();
  const [_state, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  const wallet = me!.wallet!;

  const copyText = () => {
    copyToClipboard(wallet);
    enqueueSnackbar(t('common:clipboard.wallet'));
  };

  return (
    <>
      <Tooltip title={t('user-menu.tooltip')}>
        <IconButton onClick={onOpen}>
          <Badge
            overlap="circular"
            badgeContent={
              <ArrowDropDown
                sx={{
                  transform: isOpen ? 'rotate(180deg)' : undefined,
                  transition: '.2s ease-in-out',
                  transitionProperty: 'transform',
                }}
              />
            }
            sx={{
              [`.${badgeClasses.badge}`]: {
                borderRadius: '100%',
                backgroundColor: (theme) => theme.palette.common.white,
                color: (theme) => theme.palette.secondary.contrastText,
                width: (theme) => theme.spacing(2.5),
                height: (theme) => theme.spacing(2.5),
                top: 'unset',
                bottom: (theme) => `calc(50% - ${theme.spacing(2.5)})`,
                right: '-10%',
                boxShadow: (theme) => theme.shadows[1],
              },
            }}
          >
            <AvatarFile
              aria-label={me?.name ?? t('user-menu.avatar-aria-label')}
              file={me?.picture}
              fallback={'/logo.png'}
            >
              {me?.name?.[0]}
            </AvatarFile>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: (theme) => theme.spacing(7) }}
        id="menu-appbar"
        anchorEl={element}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={onClose}
      >
        {!hideProfile && (
          <Link passHref href={ROUTES.MY_PROFILE}>
            <MenuItem
              key="view-profile"
              href="#"
              sx={{
                py: '12px',
              }}
            >
              <AccountCircleIcon color="disabled" sx={{ mr: 3.5 }} />
              <Typography textAlign="center">
                {t('user-menu.see-profile')}
              </Typography>
            </MenuItem>
          </Link>
        )}
        <MenuItem
          key="disconnect"
          onClick={withOnClose(onSignOut)}
          divider={true}
          sx={{
            py: '12px',
          }}
        >
          <LogoutIcon color="disabled" sx={{ mr: 3.5 }} />
          <Typography textAlign="center">
            {t('common:actions.disconnect')}
          </Typography>
        </MenuItem>
        <ListItem
          disablePadding
          sx={{
            py: '12px',
          }}
        >
          <IconButton disabled sx={{ mr: 2.5, ml: 1 }}>
            {!!connector?.id && icons[connector.id as keyof typeof icons]}
          </IconButton>

          <ListItemText
            primary={wallet.slice(0, 5) + '...' + wallet.slice(-4)}
            secondary={chain?.name}
          />

          <IconButton
            sx={{ ml: 3, mr: 0.5, background: '#E5E5E529' }}
            onClick={withOnClose(copyText)}
          >
            <ContentCopyIcon
              color="disabled"
              sx={{ height: 20, width: 20, color: '#FFFFFF8F' }}
            />
          </IconButton>

          <IconButton
            sx={{ mr: 1.5, background: '#E5E5E529' }}
            href={`https://etherscan.io/address/${wallet}`}
            target="_blank"
          >
            <OpenInNewIcon sx={{ height: 20, width: 20, color: '#FFFFFF8F' }} />
          </IconButton>
        </ListItem>
      </Menu>
    </>
  );
}
