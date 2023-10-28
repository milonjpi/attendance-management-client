import React from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';

const NotFoundEmployee = () => {
  return (
    <MainCard title="404 | Not Found">
      <Typography>This Employee could not be found</Typography>
    </MainCard>
  );
};

export default NotFoundEmployee;
