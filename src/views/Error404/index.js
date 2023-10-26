// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Error404 = () => (
    <MainCard title="404 | Not Found">
        <Typography variant="h5" sx={{ textAlign: 'center', color: 'red' }}>
            This page could not be found.
        </Typography>
    </MainCard>
);

export default Error404;
