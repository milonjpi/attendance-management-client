import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  useDeleteAuthLogMutation,
  useGetAuthLogQuery,
} from 'store/features/authLog/authLogApi';
import ImageShower from 'ui-component/ImageShower';
import { useState } from 'react';
import BikeEntry from './BikeEntry';
import BikeLeave from './BikeLeave';

const StartScan = () => {
  const [entry, setEntry] = useState(false);
  const [leave, setLeave] = useState(false);

  // get auth log data
  const { data } = useGetAuthLogQuery('', {
    refetchOnMountOrArgChange: true,
    pollingInterval: 1500,
  });
  const biker = data?.data || null;

  // remove auth log data
  const [deleteAuthLog] = useDeleteAuthLogMutation();

  return (
    <MainCard
      title="Start Scan"
      secondary={
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<RestartAltIcon />}
          sx={{ fontSize: 11, py: 0.3, letterSpacing: 2 }}
          onClick={deleteAuthLog}
        >
          Reset
        </Button>
      }
    >
      <Box sx={{ textAlign: 'center', mb: 2, minHeight: 27 }}>
        {biker ? (
          biker?.inStand ? (
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ fontSize: 11, letterSpacing: 3 }}
              startIcon={<OutputIcon />}
              onClick={() => setLeave(true)}
            >
              Leave
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              sx={{ fontSize: 11, letterSpacing: 3 }}
              startIcon={<InputIcon />}
              onClick={() => setEntry(true)}
            >
              Entry
            </Button>
          )
        ) : null}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SubCard title="Biker Info">
            <Box sx={{ display: 'flex' }}>
              <ImageShower width={210} height={220} url={biker?.bikerPhoto} />
              <Box sx={{ pl: 2 }}>
                <TextElementBig title="Biker ID" value={biker?.bikerId} />
                <TextElementSmall title="Biker Name" value={biker?.name} />
                <TextElementSmall title="Office ID" value={biker?.officeId} />
                <TextElementSmall
                  title="Designation"
                  value={biker?.designation}
                />
                <TextElementSmall
                  title="Department"
                  value={biker?.department}
                />
              </Box>
            </Box>
          </SubCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <SubCard title="Bike Details">
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <ImageShower
                  width={60}
                  height={65}
                  sx={{ mb: 1 }}
                  url={biker?.bikePhoto}
                />
                <ImageShower width={60} height={65} url={biker?.nid} />
              </Box>
              <ImageShower width={150} height={160} url={biker?.bikePaper} />
              <Box sx={{ pl: 2 }}>
                <TextElementBig title="Bike Reg No" value={biker?.regNo} />
                <TextElementSmall title="Brand" value={biker?.brand} />
                <TextElementSmall title="Model" value={biker?.model} />
                <TextElementSmall title="Engine CC" value={biker?.cc} />
              </Box>
            </Box>
          </SubCard>
        </Grid>
      </Grid>
      {/* popup items */}
      <BikeEntry
        open={entry}
        handleClose={() => setEntry(false)}
        bikerId={biker?.id}
      />
      <BikeLeave
        open={leave}
        handleClose={() => setLeave(false)}
        bikerId={biker?.id}
      />
    </MainCard>
  );
};

export default StartScan;

const TextElementBig = ({ title, value }) => {
  return (
    <Box sx={{ minHeight: 45 }}>
      <Typography sx={{ fontSize: 12, lineHeight: 1 }}>{title}:</Typography>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'red' }}>
        {value}
      </Typography>
    </Box>
  );
};
const TextElementSmall = ({ title, value }) => {
  return (
    <Box sx={{ minHeight: 45, lineHeight: 1 }}>
      <Typography sx={{ fontSize: 12 }}>{title}:</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{value}</Typography>
    </Box>
  );
};
