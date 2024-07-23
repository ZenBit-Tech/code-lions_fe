import { useTranslation } from 'react-i18next';

import { Box, IconButton, Typography, Button } from '@mui/material';
import { alpha } from '@mui/system';

import Pen from 'src/assets/icons/addProduct/pen.svg';
import Primary from 'src/assets/icons/addProduct/primary.svg';
import PrimaryTrue from 'src/assets/icons/addProduct/primaryTrue.svg';
import Trash from 'src/assets/icons/addProduct/trash.svg';
import Add from 'src/assets/icons/addProduct/upload.svg';
import theme from 'src/theme';

import useImageCard from './useImageCard';

const transparency = 0.6;

interface ImageCardProps {
  type: 'image' | 'video';
  src?: string;
  isPrimary?: boolean;
}

function ImageCard({ type, src, isPrimary }: ImageCardProps) {
  const { t } = useTranslation();
  const {
    inputRef,
    handleUpload,
    handleClick,
    handleRemove,
    handleSetPrimary,
    handleDragOver,
    handleDrop,
  } = useImageCard(type, src);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '160px',
        height: '160px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: src ? 'none' : 'dashed gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: src
          ? 'transparent'
          : alpha(theme.palette.primary.light, transparency),
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={
          type === 'image' ? 'image/jpeg,image/png,image/heic' : 'video/*'
        }
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleUpload}
      />
      {src ? (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '129px',
            }}
            onClick={handleSetPrimary}
          >
            {isPrimary ? <PrimaryTrue /> : <Primary />}
          </IconButton>
          {isPrimary && (
            <Typography
              sx={{
                lineHeight: '1.1',
                position: 'absolute',
                top: '6px',
                left: '27px',
                padding: '2px 4px',
                fontSize: '12px',
              }}
            >
              {t('addProduct.primary')}
            </Typography>
          )}
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '25px',
            }}
            onClick={handleClick}
          >
            <Pen />
          </IconButton>
          {type === 'image' ? (
            <img
              src={src}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <video src={src} style={{ width: '100%', height: '100%' }} controls>
              <track kind="captions" />
            </video>
          )}
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '1px',
            }}
            onClick={handleRemove}
          >
            <Trash />
          </IconButton>
        </>
      ) : (
        <Button
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform: 'none',
            p: 0,
            m: 0,
            border: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={handleClick}
        >
          <Add />
          <Typography
            variant="h4"
            sx={{
              bgcolor: theme.palette.common.black,
              borderRadius: '4px',
              color: theme.palette.common.white,
              padding: '8px 24px',
              margin: '8px 0px',
              ...theme.typography.h4,
            }}
          >
            Add {type === 'image' ? 'Image' : 'Video'}
          </Typography>
          <Typography color="textSecondary">
            {type === 'image'
              ? t('addProduct.dropImage')
              : t('addProduct.dropVideo')}
          </Typography>
        </Button>
      )}
    </Box>
  );
}

export default ImageCard;
