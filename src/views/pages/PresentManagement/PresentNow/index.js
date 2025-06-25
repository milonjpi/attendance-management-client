import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { selectAuth } from 'store/authSlice';
import MainCard from 'ui-component/cards/MainCard';

const PresentNow = () => {
  const userData = useSelector(selectAuth);

  const { data: userEmpData, isLoading } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const employeeData = userEmpData?.data;
  console.log(employeeData);

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  const handleAttendance = () => {
    if (!location.lat || !location.lon) {
      alert('Location not fetched yet');
      return;
    }

    console.log('Attendance marked at:', location);

    // Optional: Send to backend API
    // axios.post("http://localhost:5000/api/attendance", { location, timestamp: new Date() });
  };
  return (
    <MainCard title="Geo Attendance">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lon}</p>
      <button onClick={handleAttendance}>Mark Attendance</button>
    </MainCard>
  );
};

export default PresentNow;
