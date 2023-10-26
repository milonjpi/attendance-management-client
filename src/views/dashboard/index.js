import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://tbz-vehicle-server.vercel.app/roReport/all')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const totalSalesAmount = data?.sale[0]?.amount || 0;
  const totalTransAmount = data?.sale[0]?.transportCost || 0;
  const totalEquipSales = data?.equipSale[0]?.amount || 0;
  const totalEquipRent = data?.equipRent[0]?.amount || 0;

  // total earning
  const totalEarning =
    totalSalesAmount + totalTransAmount + totalEquipSales + totalEquipRent;

  // total received
  const totalReceive = data?.receive[0]?.amount || 0;
  return (
    <Grid container spacing={gridSpacing}>
      {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} title="Total Earning" amount={`৳ ${totalEarning}`} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} title="Total Collection" amount={`৳ ${totalReceive}`} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard
                                    isLoading={isLoading}
                                    title="Total Jar Sales Quantity"
                                    amount={data?.sale[0]?.qty || 0}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard
                                    isLoading={isLoading}
                                    title="Total Jar Sales Amount"
                                    amount={`৳ ${data?.sale[0]?.amount || 0}`}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
    </Grid>
  );
};

export default Dashboard;
