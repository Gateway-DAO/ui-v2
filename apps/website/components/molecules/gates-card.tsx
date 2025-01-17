import Link from 'next/link';
import { useMemo } from 'react';

import { colord } from 'colord';
import type { PartialDeep } from 'type-fest';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {
  Avatar,
  CardActionArea,
  CardHeader,
  IconButton,
  Box,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { ROUTES } from '../../constants/routes';
import { Gates } from '../../services/graphql/types.generated';
import { badgeProps } from '../../utils/badge-props';
import { AvatarFile } from '../atoms/avatar-file';
import { CategoriesList } from './categories-list';

/* TODO: Arias and Labels */

export function GatesCard({
  title,
  image,
  description,
  categories,
  dao,
  id,
}: PartialDeep<Gates>) {
  const hasDao = !!dao;
  const url = useMemo(() => ROUTES.GATE_PROFILE.replace('[id]', id), [id]);
  return (
    <MUICard sx={{ position: 'relative' }}>
      <Link passHref href={url}>
        <CardActionArea component="a">
          <CardMedia
            component="img"
            {...badgeProps({ image, title })}
            sx={{ aspectRatio: '1/1' }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: '25px',
              paddingLeft: '16px',
            }}
          >
            <CardHeader
              sx={{
                pt: 2,
                pb: 1,
                '.MuiCardHeader-action': { alignSelf: 'unset' },
                px: 0,
              }}
              avatar={
                hasDao && (
                  <AvatarFile
                    file={dao.logo}
                    fallback={dao?.logo_url || '/logo.png'}
                    sx={{ width: 32, height: 32 }}
                    aria-label={`${dao.name}'s DAO image`}
                  >
                    {dao.name?.[0]}
                  </AvatarFile>
                )
              }
              title={hasDao ? dao.name : title}
            />
            {/* <IconButton
              aria-label="settings"
              sx={{
                color: (theme) =>
                  colord(theme.palette.action.active).alpha(0.56).toRgbString(),
                width: '14px',
                height: '18px',
                zIndex: 1,
                paddingTop: '16px',
              }}
            >
              <BookmarkBorderIcon sx={{ fontSize: '20px' }} />
            </IconButton> */}
          </Box>
          <CardContent sx={{ py: 1 }}>
            {hasDao && (
              <Typography gutterBottom variant="h5">
                {title}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                /* TODO: make line-clamp reusable */
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </CardContent>
          <CategoriesList categories={categories} />
        </CardActionArea>
      </Link>
    </MUICard>
  );
}
