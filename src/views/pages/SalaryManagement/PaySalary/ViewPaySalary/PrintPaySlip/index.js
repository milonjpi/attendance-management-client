import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import PrintPaySlipRow from './PrintPaySlipRow';

const PrintPaySlip = forwardRef(({ data }, ref) => {
  const monthSalaryDetails = data?.monthSalaryDetails || [];
  return (
    <Box component="div" ref={ref}>
      <Grid container spacing={5}>
        {monthSalaryDetails?.map((el, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              '@media print': {
                breakAfter:
                  (index + 1) % 2 === 0 &&
                  index !== monthSalaryDetails.length - 1
                    ? 'page'
                    : 'auto',
                pageBreakAfter:
                  (index + 1) % 2 === 0 &&
                  index !== monthSalaryDetails.length - 1
                    ? 'always'
                    : 'auto',
              },
            }}
          >
            <PrintPaySlipRow data={el} year={data?.year} month={data?.month} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default PrintPaySlip;
