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
import { useEffect } from "react";
import axios from "axios";

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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalProductRevenue, setTotalProductRevenue] = useState(0);
  const [totalItineraryBookings, setTotalItineraryBookings] = useState(0);
  const [totalEventBookings, setTotalEventBookings] = useState(0);
  const [totalProductSales, setTotalProductSales] = useState(0);
  const [itineraryRevenueM, setItineraryRevenueM] = useState(Array(12).fill(0));
  const [eventRevenueM, setEventRevenueM] = useState(Array(12).fill(0));
  const [productRevenueM, setProductRevenueM] = useState(Array(12).fill(0));
  const [timeframe, setTimeframe] = useState("monthly");
  const [tabValue, setTabValue] = useState(0);
  const appCommission = totalRevenue * 0.1;

  useEffect(() => {
    const fetchRevenueReport = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Admin/report", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const data = response.data.data;
        console.log("hii" + data);
        setTotalRevenue(data.totalRevenue);
        setTotalBookings(data.totalBookings);
        setTotalProductRevenue(data.totalProductRevenue);
        setTotalItineraryBookings(data.totalItineraryBookings);
        setTotalEventBookings(data.totalEventBookings);
        setTotalProductSales(data.totalProductSales);
        setItineraryRevenueM(data.itineraryRevenueM);
        setEventRevenueM(data.eventRevenueM);
        setProductRevenueM(data.productRevenueM);
      } catch (error) {
        console.error("Error fetching revenue report:", error);
      }
    };

    fetchRevenueReport();
  }, []);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const lineChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: Array.from({length: 5}, (_, i) => 
          itineraryRevenueM.slice(-5)[i] + eventRevenueM.slice(-5)[i] + productRevenueM.slice(-5)[i]
        ),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const barChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Events",
        data: eventRevenueM.slice(-5),
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: "Itineraries",
        data: itineraryRevenueM.slice(-5),
        backgroundColor: theme.palette.secondary.main,
      },
      {
        label: "Gift Shop",
        data: productRevenueM.slice(-5),
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
                          <Typography variant="h5">{totalBookings}</Typography>
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
                          <Typography variant="h5">+{totalProductSales}</Typography>
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
