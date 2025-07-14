import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import PrintPaySlipRow from './PrintPaySlipRow';

const PrintPaySlip = forwardRef(({ data }, ref) => {
  const monthSalaryDetails = data?.monthSalaryDetails || [];
  return (
    <Box component="div" ref={ref}>
      <Grid container spacing={0.5}>
        {monthSalaryDetails?.map((el, index) => (
          <Grid item xs={12} key={index}>
            <PrintPaySlipRow data={el} year={data?.year} month={data?.month} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default PrintPaySlip;
