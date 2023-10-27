import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { BASE_ADDRESS } from 'api/client';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadPhoto = ({
  title,
  required = false,
  register,
  reset,
  name,
  defaultPhoto,
  width = 85,
  height = 95,
  sx = {},
}) => {
  const [photo, setPhoto] = useState(
    defaultPhoto ? `${BASE_ADDRESS}/uploads/employees/${defaultPhoto}` : null
  );

  const handlePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (x) => {
        setPhoto(x.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPhoto(null);
    }
  };
  const handleRemove = (id) => {
    reset({ [id]: null });
    setPhoto(null);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        background: '#00000017',
        backgroundImage: `url('${photo}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        border: '1px solid #00000025',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        borderRadius: 1,
        ...sx,
      }}
    >
      {photo ? (
        <Button
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            minWidth: 0,
            p: 0,
            background: '#000000b2',
            '&:hover': {
              background: '#000000b2',
            },
          }}
          onClick={() => handleRemove(name)}
        >
          <ClearIcon color="error" sx={{ fontSize: 16 }} />
        </Button>
      ) : (
        <IconButton component="label" color="primary" size="small">
          <CloudUploadIcon fontSize="small" />
          <VisuallyHiddenInput
            type="file"
            {...register(name, { onChange: (e) => handlePreview(e) })}
          />
        </IconButton>
      )}

      <Typography
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 11,
          background: '#00000052',
          py: 0.3,
          color: '#fff',
        }}
      >
        {title}
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </Typography>
    </Box>
  );
};

export default UploadPhoto;
