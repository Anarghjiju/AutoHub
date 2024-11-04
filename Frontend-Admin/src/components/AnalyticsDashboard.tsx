import React, { useEffect, useState } from 'react';
import '../styles/AnalyticsDashboard.css';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const AnalyticsDashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState({
        carsSold: 0,
        incomeGenerated: 0,
        carsYetToSell: 0,
        carsPendingApproval: 0,
        salesByMake: [] as { make: string, count: number }[]
    });

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: { type: 'pie' },
        labels: ['Sold Cars', 'Total listed cars'],
        responsive: [{ breakpoint: 480, options: { chart: { width: 100 }, legend: { position: 'bottom' } } }],
    });

    const [chartSeries, setChartSeries] = useState<number[]>([]);
    
    const [barChartOptions, setBarChartOptions] = useState<ApexOptions>({
        chart: { type: 'bar' },
        xaxis: { categories: [] },
        title: { text: 'Cars Sold by Make' },
    });

    const [barChartSeries, setBarChartSeries] = useState<{ name: string; data: number[] }[]>([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/usedcars/analytics');
                const data = await response.json();

                setAnalyticsData({
                    carsSold: data.totalSoldCars,
                    incomeGenerated: data.totalIncome,
                    carsYetToSell: data.totalUnSoldCars,
                    carsPendingApproval: data.totalPendingApproval,
                    salesByMake: data.salesByMake
                });

                setChartSeries([data.totalSoldCars, (data.totalUnSoldCars+data.totalSoldCars)]);

                // Prepare data for the bar chart
                const makeCategories = data.salesByMake.map((item: { _id: string }) => item._id);
                const makeCounts = data.salesByMake.map((item: { count: number }) => item.count);
                setBarChartOptions((prevOptions) => ({
                    ...prevOptions,
                    xaxis: { categories: makeCategories }
                }));
                setBarChartSeries([{ name: 'Cars Sold', data: makeCounts }]);
            } catch (error) {
                console.log("Error fetching analytics:", error);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="analytics-dashboard">
            <h3>Overview</h3>
            <div className="analytics-cards">
                <div className="analytics-card">
                    <h3>{analyticsData.carsSold}</h3>
                    <p>Cars Sold</p>
                </div>
                <div className="analytics-card">
                    <h3>{analyticsData.carsYetToSell}</h3>
                    <p>Cars Yet to Sell</p>
                </div>
                <div className="analytics-card">
                    <h3>Rs. {analyticsData.incomeGenerated}</h3>
                    <p>Income Generated</p>
                </div>
                <div className="analytics-card">
                    <h3>{analyticsData.carsPendingApproval}</h3>
                    <p>Cars Pending Approval</p>
                </div>
            </div>

            <div className="card widget-card border-light shadow-sm my-4">
                <div className="card-body">
                    <h5 className="card-title widget-card-title">Sales Overview</h5>
                    <Chart options={chartOptions} series={chartSeries} type="pie" width="70%" />
                </div>
            </div>

            <div className="card widget-card border-light shadow-sm my-4">
                <div className="card-body">
                    <h5 className="card-title widget-card-title">Sales by Make</h5>
                    <Chart options={barChartOptions} series={barChartSeries} type="bar" width="70%" />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
