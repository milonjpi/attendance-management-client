import { Grid, MenuItem, TextField } from '@mui/material';
import { salaryYear } from 'assets/data';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useGetExpenseSummaryYearQuery } from 'store/api/report/reportApi';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { totalSum } from 'views/utilities/NeedyFunction';

const MainLineChart = ({ year, setYear, userData, employeeData }) => {
  // filtering and pagination
  const query = {};
  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (year) {
    query['year'] = year;
  }

  const { data, isLoading } = useGetExpenseSummaryYearQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  const optionsLine = (title) => {
    return {
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        dropShadow: {
          enabled: true,
          top: 3,
          left: 2,
          blur: 4,
          opacity: 1,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: title,
        align: 'left',
        offsetY: 16,
      },
      colors: ['#ba68c8', '#42a5f5', '#4caf50'],
      markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
          size: 9,
        },
      },
      grid: {
        show: true,
        strokeDashArray: 3,
        padding: {
          bottom: 0,
        },
      },
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      xaxis: {
        tooltip: {
          enabled: false,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20,
      },
    };
  };

  if (isLoading) {
    return <SkeletonTotalGrowthBarChart />;
  }
  return (
    <MainCard
      title={
        <TextField
          id="standard-select-currency"
          select
          value={year}
          size="small"
          sx={{ height: 20 }}
          onChange={(e) => setYear(e.target.value)}
        >
          {salaryYear.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      }
      secondary={
        <span
          style={{
            display: 'flex',
            fontSize: 16,
            fontWeight: 700,
            paddingTop: '10px',
          }}
        >
          {totalSum(allExpenses, 'totalExpenses')}
        </span>
      }
      headerX={{ px: 2 }}
      contentSX={{ px: 2 }}
      sx={{ height: '100%' }}
    >
      <Grid container>
        <Grid item xs={12}>
          <ReactApexChart
            options={optionsLine(`Expense Summary ${year}`)}
            series={[
              {
                name: 'Conveyance',
                data: allExpenses?.map((el) => el.conveyances),
              },
              {
                name: 'Bill',
                data: allExpenses?.map((el) => el.bills),
              },
              {
                name: 'Salary',
                data: allExpenses?.map((el) => el.salaries),
              },
            ]}
            type="line"
            height={350}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default MainLineChart;
