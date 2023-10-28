import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { BASE_ADDRESS } from 'api/client';
import loadingImage from 'assets/images/load.png';
import { useState } from 'react';
import ViewImage from './ViewImage';

const ImageShower = ({ url, width = 50, height = 50, sx = {} }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          width: width,
          height: height,
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius: '50%',
          ...sx,
        }}
        onClick={() => setOpen(url ? true : false)}
      >
        {(loading || !url) && (
          <img
            src={loadingImage}
            alt="Loading"
            style={{ display: 'inline-block', width: '100%' }}
          />
        )}
        <Fade in={!loading} timeout={500} sx={{ outline: 'none' }}>
          <img
            src={`${BASE_ADDRESS}/uploads/employees/${url}`}
            alt="Biker"
            style={{
              display: loading || !url ? 'none' : 'inline-block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onLoad={() => setLoading(false)}
          />
        </Fade>

        {/* popup item */}
      </Box>
      <ViewImage
        open={open}
        handleClose={() => setOpen(false)}
        url={`${BASE_ADDRESS}/uploads/employees/${url}`}
      />
    </>
  );
};

export default ImageShower;
