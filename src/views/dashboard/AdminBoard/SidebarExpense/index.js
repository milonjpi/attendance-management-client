// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import { useGetExpenseSummaryQuery } from 'store/api/report/reportApi';
import { totalSum } from 'views/utilities/NeedyFunction';
import SidebarExpenseRow from './SidebarExpenseRow';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const SidebarExpense = ({ userData, employeeData, year }) => {
  // fetching
  const query = {};

  query['year'] = year;
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
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard
          title={
            <span style={{ fontSize: 16 }}>
              {userData?.role === 'super_admin'
                ? `Expense ${year}`
                : employeeData?.location?.label}
            </span>
          }
          secondary={
            <span
              style={{
                display: 'inline-block',
                fontSize: 16,
                fontWeight: 700,
                paddingTop: '8px',
              }}
            >
              {totalExpenses}
            </span>
          }
          sx={{ height: '100%' }}
          headerX={{ px: 2 }}
          contentSX={{ px: 2 }}
        >
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              {userData?.role === 'super_admin' ? (
                allExpenses?.map((item, index) => {
                  return (
                    <SidebarExpenseRow
                      key={index}
                      title={item.location?.label}
                      base={item.location?.area?.label}
                      value={item.totalExpenses}
                      isDivider={
                        index + 1 === allExpenses?.length ? false : true
                      }
                    />
                  );
                })
              ) : (
                <>
                  <SidebarExpenseRow
                    title="TOTAL SALARY"
                    base={year}
                    value={totalSalaries}
                    isDivider={true}
                  />
                  <SidebarExpenseRow
                    title="TOTAL CONVEYANCE"
                    base={year}
                    value={totalConveyances}
                    isDivider={true}
                  />
                  <SidebarExpenseRow
                    title="TOTAL BILLS"
                    base={year}
                    value={totalBills}
                    isDivider={false}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default SidebarExpense;
