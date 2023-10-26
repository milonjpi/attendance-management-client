import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import axios from 'axios';
import { calculateDayCount, getDaysInMonth, totalSum } from 'views/utilities/NeedyFunction';
import moment from 'moment';

const allYears = ['2022', '2023', '2024', '2025', '2026'];
const currentDate = new Date();

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(moment().format('YYYY'));
    const [isLoading, setLoading] = useState(false);
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primaryDark, secondaryMain],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`month-summary`, 'updateOptions', newChartData);
        }
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://tbz-vehicle-server.vercel.app/roReport/monthYearDistract')
            .then((res) => {
                setData(res.data?.sell);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    // calculation
    const filterData = data?.filter((item) => item._id?.year === parseInt(year));
    const totalQty = totalSum(filterData, 'qty');

    const findByMonth = (month) => {
        const findMonth = filterData?.find((option) => option._id?.month === month);
        return findMonth ? findMonth.qty : 0;
    };

    const findPerDay = (month) => {
        const findMonth = filterData?.find((option) => option._id?.month === month);
        const daysInMonth =
            findMonth?._id?.month - 1 === currentDate.getMonth() && findMonth?._id?.year === currentDate.getFullYear()
                ? calculateDayCount(`${findMonth?._id?.year}-${findMonth?._id?.month}-1`, moment().format('YYYY-MM-DD'))
                : getDaysInMonth(findMonth?._id?.month - 1, findMonth?._id?.year);
        const perDaySales = Math.round(findMonth?.qty / daysInMonth);
        return perDaySales || 0;
    };

    const series = [
        {
            name: 'Jar Sales Qty',
            data: [
                findByMonth(1),
                findByMonth(2),
                findByMonth(3),
                findByMonth(4),
                findByMonth(5),
                findByMonth(6),
                findByMonth(7),
                findByMonth(8),
                findByMonth(9),
                findByMonth(10),
                findByMonth(11),
                findByMonth(12)
            ]
        },
        {
            name: 'Per Day Sales',
            data: [
                findPerDay(1),
                findPerDay(2),
                findPerDay(3),
                findPerDay(4),
                findPerDay(5),
                findPerDay(6),
                findPerDay(7),
                findPerDay(8),
                findPerDay(9),
                findPerDay(10),
                findPerDay(11),
                findPerDay(12)
            ]
        }
    ];
    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Jar Sales in {year}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">{totalQty}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-select-currency" select value={year} onChange={(e) => setYear(e.target.value)}>
                                        {allYears.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} series={series} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
