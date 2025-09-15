import { Grid } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { gridSpacing } from 'store/constant';
import SecondaryBigCard from './Cards/SecondaryBigCard';
import PrimaryBigCard from './Cards/PrimaryBigCard';
import PrimarySmallCard from './Cards/PrimarySmallCard';
import { useGetExpenseSummaryQuery } from 'store/api/report/reportApi';
import { totalSum } from 'views/utilities/NeedyFunction';
import MainLineChart from './Charts/MainLineChart';
import SidebarExpense from './SidebarExpense';
import MonthlyExpenseSummary from './MonthlyExpenseSummary';

const AdminBoard = ({ userData }) => {
  // employee data
  const { data: userEmpData } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const employeeData = userEmpData?.data;

  const [year, setYear] = useState(moment().format('YYYY'));

  // fetching
  const query = {};

  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  const { data, isLoading } = useGetExpenseSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  // calculation
  const totalSalaries = totalSum(allExpenses, 'salaries');
  const totalConveyances = totalSum(allExpenses, 'conveyances');
  const totalBills = totalSum(allExpenses, 'bills');
  const totalExpenses = totalSum(allExpenses, 'totalExpenses');

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <SecondaryBigCard
              isLoading={isLoading}
              title="TOTAL EXPENSES"
              amount={`৳ ${totalExpenses}`}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <PrimaryBigCard
              isLoading={isLoading}
              title="TOTAL SALARIES"
              amount={`৳ ${totalSalaries}`}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <PrimarySmallCard
                  isLoading={isLoading}
                  title="TOTAL CONVEYANCES"
                  amount={`৳ ${totalConveyances || 0}`}
                />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <PrimarySmallCard
                  isLoading={isLoading}
                  title="TOTAL BILLS"
                  amount={`৳ ${totalBills || 0}`}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <MainLineChart
              year={year}
              setYear={setYear}
              userData={userData}
              employeeData={employeeData}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SidebarExpense
              userData={userData}
              employeeData={employeeData}
              year={year}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MonthlyExpenseSummary
          userData={userData}
          employeeData={employeeData}
          year={year}
        />
      </Grid>
    </Grid>
  );
};

export default AdminBoard;
