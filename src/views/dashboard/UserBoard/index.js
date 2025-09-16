// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project imports

import { gridSpacing } from 'store/constant';
import { IconInfoSquareRounded } from '@tabler/icons-react';
import MainDashCard from './MainDashCard';
import moment from 'moment';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const UserBoard = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Total Present"
            value={0}
            variant="secondary"
            base={`in this year ${moment().format('YYYY')}`}
            icon={IconInfoSquareRounded}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Total Weekend"
            value={0}
            variant="secondary"
            base={`in this year ${moment().format('YYYY')}`}
            icon={IconInfoSquareRounded}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Public Holiday"
            value={0}
            variant="secondary"
            base={`in this year ${moment().format('YYYY')}`}
            icon={IconInfoSquareRounded}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MainDashCard
            title="Total Leave"
            value={0}
            variant="secondary"
            base={`in this year ${moment().format('YYYY')}`}
            icon={IconInfoSquareRounded}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserBoard;
