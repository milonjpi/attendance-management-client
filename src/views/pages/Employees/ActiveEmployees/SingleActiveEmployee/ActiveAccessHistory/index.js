import React from 'react';
import { useOutletContext } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';

const ActiveAccessHistory = () => {
  const { data } = useOutletContext();
  return (
    <MainCard title="Access History">
      <p>{data?.name}</p>
    </MainCard>
  );
};

export default ActiveAccessHistory;
