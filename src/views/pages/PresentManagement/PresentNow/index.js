import { Button, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCreateGeoAttendanceMutation,
  useCreateGeoLeaveMutation,
  useGetSingleAttendanceQuery,
} from 'store/api/attendance/attendanceApi';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { selectAuth } from 'store/authSlice';
import { setToast } from 'store/toastSlice';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import {
  getDeviceId,
  getDistanceFromLatLonInMeters,
} from 'views/utilities/NeedyFunction';

const PresentNow = () => {
  const userData = useSelector(selectAuth);

  // employee data
  const { data: userEmpData, isLoading } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );
  const employeeData = userEmpData?.data;

  // attendance fetching
  const { data: attendanceData } = useGetSingleAttendanceQuery(
    {
      officeId: employeeData?.officeId || '123',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    },
    { refetchOnMountOrArgChange: true, pollingInterval: 10000 }
  );

  const todayAttendance = attendanceData?.data;

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employeeData?.location?.lat || !employeeData?.location?.lon) return;

    const officeLocation = {
      lat: Number(employeeData.location.lat),
      lon: Number(employeeData.location.lon),
    };
    if (!navigator.geolocation) {
      setError('Geolocation not supported by browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLoc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(userLoc);

        const distance = getDistanceFromLatLonInMeters(
          userLoc.lat,
          userLoc.lon,
          officeLocation.lat,
          officeLocation.lon
        );
        setDistance(distance.toFixed(2));
      },
      (err) => {
        setError('Location not fetched yet');
      }
    );
  }, [employeeData]);

  const [att, setAtt] = useState(false);
  const [leave, setLeave] = useState(false);

  const dispatch = useDispatch();
  const [createGeoAttendance] = useCreateGeoAttendanceMutation();
  const [createGeoLeave] = useCreateGeoLeaveMutation();

  const handleAttendance = async () => {
    setAtt(false);
    const deviceId = getDeviceId();
    const newData = {
      officeId: employeeData?.officeId,
      date: moment().add(6, 'hours'),
      inTime: moment().add(6, 'hours'),
      deviceId: deviceId,
      location: location?.lat + ', ' + location?.lon,
      realPunch: true,
    };
    try {
      const res = await createGeoAttendance({ ...newData }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Attendance Successfully',
          })
        );
      }
    } catch (err) {
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
  const handleLeave = async () => {
    setLeave(false);
    const deviceId = getDeviceId();
    const newData = {
      officeId: employeeData?.officeId,
      date: moment().add(6, 'hours'),
      outTime: moment().add(6, 'hours'),
      deviceId: deviceId,
      location: location?.lat + ', ' + location?.lon,
      realPunch: true,
    };
    try {
      const res = await createGeoLeave({ ...newData }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Leave Successfully',
          })
        );
      }
    } catch (err) {
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

  if (isLoading && !employeeData) {
    return <LoadingPage />;
  }

  if (!employeeData && !isLoading) {
    return <NotFoundEmployee />;
  }

  if (error) {
    return (
      <MainCard title="Geo Attendance">
        <Typography sx={{ color: 'red' }}>{error}</Typography>
      </MainCard>
    );
  }
  return (
    <MainCard title="Geo Attendance">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          {!employeeData?.location?.lat || !employeeData?.location?.lon ? (
            <Typography sx={{ color: 'red' }}>
              Your Office Location Not Found
            </Typography>
          ) : (
            <>
              <Paper sx={{ p: 1, mb: 1.5 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  Your Distance From Office
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: Number(distance) < 50 ? 'green' : 'red',
                  }}
                >
                  {distance + ' meters'}
                </Typography>
              </Paper>
              {Number(distance) < 50 &&
              !todayAttendance &&
              moment().hour() < 12 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAttendance}
                >
                  Mark Attendance
                </Button>
              ) : null}

              {Number(distance) < 50 && moment().hour() >= 12 ? (
                <Button variant="contained" color="error" onClick={handleLeave}>
                  Leave Now
                </Button>
              ) : null}
            </>
          )}

          {/* pop up items */}
          <ConfirmDialog
            open={att}
            setOpen={setAtt}
            content="Confirm Attendance"
            handleDelete={handleAttendance}
          />
          <ConfirmDialog
            open={leave}
            setOpen={setLeave}
            content="Confirm Leave"
            handleDelete={handleLeave}
          />
          {/* pop up items */}
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 1 }}>
          <Typography
            sx={{ fontWeight: 700, textDecoration: 'underline', mb: 0.5 }}
          >
            {moment().format('DD/MM/YYYY')}
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 11, mb: 0.5 }}>
            IN:{' '}
            {todayAttendance?.inTime
              ? moment(todayAttendance?.inTime).utc(0).format('hh:mm A')
              : 'n/a'}
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 11 }}>
            OUT:{' '}
            {todayAttendance?.outTime
              ? moment(todayAttendance?.outTime).utc(0).format('hh:mm A')
              : 'n/a'}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default PresentNow;
