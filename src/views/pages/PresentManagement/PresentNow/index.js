import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSingleAttendanceQuery } from 'store/api/attendance/attendanceApi';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { selectAuth } from 'store/authSlice';
import MainCard from 'ui-component/cards/MainCard';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import { getMinDistanceFromLocations } from 'views/utilities/NeedyFunction';
import MarkAttendance from './MarkAttendance';
import LeaveNow from './LeaveNow';

const PresentNow = () => {
  const userData = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);

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
    { refetchOnMountOrArgChange: true, pollingInterval: 4000 }
  );

  const todayAttendance = attendanceData?.data;

  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    branch: null,
  });
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employeeData?.location?.lat || !employeeData?.location?.lon) return;
    setLoading(true);

    const officeLocations = [
      ...employeeData?.employeeLocations?.map((el) => ({
        lat: Number(el.location.lat),
        lon: Number(el.location.lon),
        branch: el.location?.label + ', ' + el.location?.area?.label,
      })),
      {
        lat: Number(employeeData.location.lat),
        lon: Number(employeeData.location.lon),
        branch:
          employeeData.location?.label +
          ', ' +
          employeeData.location?.area?.label,
      },
    ];

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

        const distance = getMinDistanceFromLocations(
          userLoc.lat,
          userLoc.lon,
          officeLocations
        );

        setDistance(distance?.distance.toFixed(2));
        setLocation({ ...userLoc, branch: distance?.closest?.branch });
        setLoading(false);
      },
      (err) => {
        setError('Location not fetched yet');
      }
    );
  }, [employeeData]);

  const [att, setAtt] = useState(false);
  const [leave, setLeave] = useState(false);

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
                <Typography sx={{}}>
                  {distance ? (
                    <>
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 700,
                          fontSize: 20,
                          color:
                            Number(distance) && Number(distance) < 50
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {distance + ' meters'}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          marginTop: 20,
                          fontSize: 9,
                          fontWeight: 500,
                        }}
                      >
                        {'BRANCH: ' + location?.branch}
                      </span>
                    </>
                  ) : loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Your Location is Off'
                  )}
                </Typography>
              </Paper>
              {Number(distance) &&
              Number(distance) < 50 &&
              !todayAttendance &&
              moment().hour() < 12 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAtt(true)}
                >
                  Mark Attendance
                </Button>
              ) : null}

              {Number(distance) &&
              Number(distance) < 50 &&
              moment().hour() >= 12 ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setLeave(true)}
                >
                  Leave Now
                </Button>
              ) : null}
            </>
          )}

          {/* pop up items */}
          <MarkAttendance
            open={att}
            handleClose={() => setAtt(false)}
            employeeData={employeeData}
            location={location}
          />
          <LeaveNow
            open={leave}
            handleClose={() => setLeave(false)}
            employeeData={employeeData}
            location={location}
            preData={todayAttendance}
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
              ? moment(todayAttendance?.inTime).format('hh:mm A')
              : 'n/a'}
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 11 }}>
            OUT:{' '}
            {todayAttendance?.outTime
              ? moment(todayAttendance?.outTime).format('hh:mm A')
              : 'n/a'}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default PresentNow;
