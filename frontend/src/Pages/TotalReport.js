import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ToastContainer } from "react-toastify";
import { Content, Header } from "antd/es/layout/layout";
import { CalendarToday as CalendarIcon } from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import {useEffect} from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data
const monthlyData = [
  { name: "Jan", events: 4000, itineraries: 2400, giftShop: 2400, total: 8800 },
  { name: "Feb", events: 3000, itineraries: 1398, giftShop: 2210, total: 6608 },
  {
    name: "Mar",
    events: 2000,
    itineraries: 9800,
    giftShop: 2290,
    total: 14090,
  },
  { name: "Apr", events: 2780, itineraries: 3908, giftShop: 2000, total: 8688 },
  { name: "May", events: 1890, itineraries: 4800, giftShop: 2181, total: 8871 },
  { name: "Jun", events: 2390, itineraries: 3800, giftShop: 2500, total: 8690 },
];

// Custom theme with blue and orange
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#ff9800", // orange
    },
  },
});

export default function SalesReportMUI() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [tabValue, setTabValue] = useState(0);
  const totalRevenue = monthlyData.reduce((acc, curr) => acc + curr.total, 0);
  const appCommission = totalRevenue * 0.1;

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const lineChartData = {
    labels: monthlyData.map((d) => d.name),
    datasets: [
      {
        label: "Total Revenue",
        data: monthlyData.map((d) => d.total),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const barChartData = {
    labels: monthlyData.map((d) => d.name),
    datasets: [
      {
        label: "Events",
        data: monthlyData.map((d) => d.events),
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: "Itineraries",
        data: monthlyData.map((d) => d.itineraries),
        backgroundColor: theme.palette.secondary.main,
      },
      {
        label: "Gift Shop",
        data: monthlyData.map((d) => d.giftShop),
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
        },
      },
    },
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar /> {/* Top bar added here */}
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  Sales Report
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Select
                    value={timeframe}
                    onChange={handleTimeframeChange}
                    sx={{ mr: 2 }}
                    startAdornment={<CalendarIcon />}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                  <Button variant="contained" color="primary">
                    Download Report
                  </Button>
                </Box>
              </Box>

              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Overview" />
                <Tab label="Events" />
                <Tab label="Itineraries" />
                <Tab label="Gift Shop" />
              </Tabs>

              {tabValue === 0 && (
                <>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardHeader title="Total Revenue" />
                        <CardContent>
                          <Typography variant="h5">
                            ${totalRevenue.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            +20.1% from last month
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardHeader title="App Commission (10%)" />
                        <CardContent>
                          <Typography variant="h5">
                            ${appCommission.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            From online bookings
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardHeader title="Total Bookings" />
                        <CardContent>
                          <Typography variant="h5">+573</Typography>
                          <Typography variant="body2" color="text.secondary">
                            +201 since last month
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card>
                        <CardHeader title="Active Sales" />
                        <CardContent>
                          <Typography variant="h5">+89</Typography>
                          <Typography variant="body2" color="text.secondary">
                            +20.1% from last month
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Card>
                        <CardHeader title="Revenue Overview" />
                        <CardContent>
                          <Box sx={{ height: 300 }}>
                            <Line data={lineChartData} options={chartOptions} />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card>
                        <CardHeader title="Revenue by Category" />
                        <CardContent>
                          <Box sx={{ height: 300 }}>
                            <Bar data={barChartData} options={chartOptions} />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </ThemeProvider>
        </Content>
      </Layout>
    </Layout>
  );
}
