import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyIcon from '@mui/icons-material/Key';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useOutletContext } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import ChangePassword from '../ChangePassword';
import { roleValue } from 'assets/data';

const UserInfo = () => {
  const { data } = useOutletContext();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      {/* popup Items */}
      <ChangePassword
        open={open}
        handleClose={() => setOpen(false)}
        uId={data?.id}
      />
      {/* end popup Items */}
      <Box sx={{ py: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="small"
          color="dark"
          component={Link}
          sx={{ color: '#fff' }}
          to="/utils/setting/manage-user"
        >
          Back
        </Button>
      </Box>
      <Box>
        <MainCard
          title="Information"
          secondary={
            <Button
              startIcon={<KeyIcon />}
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Change Password
            </Button>
          }
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <UserItem title="Employee Name" value={data?.fullName} />
              <UserItem title="User Name" value={data?.userName} />
              <UserItem title="Role" value={roleValue[data?.role] || ''} />
            </Grid>
          </Grid>
        </MainCard>
      </Box>
    </Box>
  );
};

export default UserInfo;

const UserItem = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 2,
      }}
    >
      <Typography sx={{ fontSize: 13, color: '#555555', fontWeight: 700 }}>
        {title}:
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#555555' }}>{value}</Typography>
    </Box>
  );
};
