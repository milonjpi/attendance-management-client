import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import ViewPaySlipRow from './ViewPaySlipRow';
import { Grid } from '@mui/material';

const ViewPaySlip = forwardRef(({ data, year, month }, ref) => {
  return (
    <Box component="div" ref={ref}>
      <Grid container spacing={0.5}>
        {data?.map((el, index) => (
          <Grid item xs={12} key={index}>
            <ViewPaySlipRow data={el} year={year} month={month} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default ViewPaySlip;
