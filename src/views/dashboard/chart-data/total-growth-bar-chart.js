// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
    height: 480,
    type: 'bar',
    options: {
        chart: {
            id: 'month-summary',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: true
        },
        grid: {
            show: true
        }
    }
    // series: [
    //     {
    //         name: 'Jar Sales Qty',
    //         data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75]
    //     },
    //     {
    //         name: 'Per Day Sales',
    //         data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75]
    //     }
    // ]
};
export default chartData;
