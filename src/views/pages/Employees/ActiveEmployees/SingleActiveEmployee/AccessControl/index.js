import React from 'react';
import { useOutletContext } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';

const AccessControl = () => {
  const { data } = useOutletContext();
  return (
    <MainCard title="Access Control">
      <p>{data?.name}</p>
    </MainCard>
  );
};

export default AccessControl;
