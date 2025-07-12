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
import { IconDeviceMobileShare } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { useUpdateUserMutation } from 'store/api/user/userApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const UserInfo = () => {
  const { data } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState(false);

  const dispatch = useDispatch();

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async () => {
    setDevice(true);
    try {
      const res = await updateUser({
        id: data?.id,
        body: { deviceId: null },
      }).unwrap();
      if (res.success) {
        setDevice(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Device ID Released',
          })
        );
      }
    } catch (err) {
      setDevice(false);
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        })
      );
    }
  };

  return (
    <Box>
      {/* popup Items */}
      <ChangePassword
        open={open}
        handleClose={() => setOpen(false)}
        uId={data?.id}
      />
      <ConfirmDialog
        open={device}
        setOpen={setDevice}
        content="Release Device ID"
        handleDelete={onSubmit}
      />
      {/* end popup Items */}
      <Box
        sx={{
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
        {data?.deviceId ? (
          <Button
            variant="contained"
            startIcon={<IconDeviceMobileShare size={15} />}
            size="small"
            color="primary"
            sx={{ ml: 2, fontSize: 11 }}
            onClick={() => setDevice(true)}
          >
            Release Device
          </Button>
        ) : null}
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
