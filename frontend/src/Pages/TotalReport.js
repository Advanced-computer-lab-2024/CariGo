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
  TextField,
  IconButton,
  Drawer,
  InputLabel, 
  FormControl,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material"; // Icon for filter button
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ToastContainer } from "react-toastify";
import { Content, Header } from "antd/es/layout/layout";
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DatePicker } from "@mui/lab";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { startOfMonth, endOfMonth } from 'date-fns';  // Importing date-fns functions

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // You can also use Day.js or Moment.js for the adapter
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
import { Line, Bar, Pie } from "react-chartjs-2";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  const [totalItineraryRevenue, setTotalItineraryRevenue] = useState(0);
  const [totalEventRevenue, setTotalEventRevenue] = useState(0);
  const appCommission = totalRevenue * 0.1;
  const [selectedProduct, setSelectedProduct] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  
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
        // Calculate total itinerary and event revenue
        const itinerarySum = data.itineraryRevenueM.reduce(
          (sum, value) => sum + value,
          0
        );
        const eventSum = data.eventRevenueM.reduce(
          (sum, value) => sum + value,
          0
        );

        setTotalItineraryRevenue(itinerarySum);
        setTotalEventRevenue(eventSum);
      } catch (error) {
        console.error("Error fetching revenue report:", error);
      }
    };

    fetchRevenueReport();
  }, []);

  const handleDatesChange = (date) => {
    setStartDate(date.startDate);
    setEndDate(date.endDate);
  };

  
  const filterDataByDate = async () => {
    const params = {};
    
    if (selectedProduct) {
      params.product = selectedProduct;
    }
    if (startDate) {
      params.startDate = startDate.toISOString();
    }
    if (endDate) {
      params.endDate = endDate.toISOString();
    }
  
    try {
      const response = await axios.get("http://localhost:4000/Admin/report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        params, // Pass query parameters here
      });
  
      const data = response.data.data;
      // Update your state with the filtered data
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
      console.error("Error fetching filtered report:", error);
    }
  };
  
  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cariGo/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const productOptions = response.data.map(product => ({
          id: product._id,       // Extract the product ID
          name: product.name,    // Extract the product name
        }));
  
        setProductOptions(productOptions);
      } catch (error) {
        console.error("Error fetching product options:", error);
        setProductOptions([]);
      }
    };
  
    fetchProductOptions();
  }, []);
  
    const [expanded, setExpanded] = useState("datesAccordion"); // State to manage which accordion is open
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
  
    const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false); // Toggle accordion open/close
    };
  

  
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDownloadReport = () => {
    const input = document.getElementById('report-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape'); // Set orientation to landscape
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('report.pdf');
    });
  };

  const lineChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: Array.from(
          { length: 5 },
          (_, i) =>
            itineraryRevenueM.slice(-5)[i] +
            eventRevenueM.slice(-5)[i] +
            productRevenueM.slice(-5)[i]
        ),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const itineraryChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: Array.from(
          { length: 5 },
          (_, i) => itineraryRevenueM.slice(-5)[i]
        ),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const eventChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: Array.from({ length: 5 }, (_, i) => eventRevenueM.slice(-5)[i]),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
    ],
  };

  const giftChartData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Revenue",
        data: Array.from({ length: 5 }, (_, i) => productRevenueM.slice(-5)[i]),
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

  const pieChartData = {
    labels: ["Event Bookings", "Other Revenue"],
    datasets: [
      {
        data: [
          (totalEventRevenue / totalRevenue) * 100,
          ((totalRevenue - totalEventRevenue) / totalRevenue) * 100,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieChartData_itinerary = {
    labels: ["Itinerary Bookings", "Other Revenue"],
    datasets: [
      {
        data: [
          (totalItineraryRevenue / totalRevenue) * 100,
          ((totalRevenue - totalItineraryRevenue) / totalRevenue) * 100,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieChartData_gift = {
    labels: ["Gift Shop", "Other Revenue"],
    datasets: [
      {
        data: [
          (totalProductRevenue / totalRevenue) * 100,
          ((totalRevenue - totalProductRevenue) / totalRevenue) * 100,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
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
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => setDrawerOpen(true)}
                  >
                    <FilterListIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadReport}
                    sx={{ ml: 2 }}
                  >
                    Download Report
                  </Button>
                </Box>
              </Box>

              {/* Drawer for Filters */}
              <Drawer
  anchor="right"
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  PaperProps={{
    sx: {
      width: 400, // Adjust the width
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(240, 248, 255, 0.1), rgba(224, 255, 255, 0.1))', // Softer gradient with transparency
      backdropFilter: "blur(15px)", // Adds a blur effect to the background
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)', // Subtle layered shadows
      },
  }}
>
  <Box
    sx={{
      p: 4,
      display: "flex",
      flexDirection: "column",
      gap: 3, // Spacing between components
      overflowY: "auto", // Allow scroll if content overflows
      maxHeight: "100vh", // Ensure it fits in the viewport
      "&::-webkit-scrollbar": {
        width: "8px", // Thin scrollbar
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888", // Gray thumb
        borderRadius: "8px", // Rounded thumb
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555", // Darker thumb on hover
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent", // Invisible track
      },
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
      Filters
    </Typography>
                    {/* Product ID Filter */}
                    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  }}
>
  
<FormControl fullWidth>
        <InputLabel
          id="product-label"
          sx={{
            fontWeight: "bold", // Ensure font weight is bold
            typography: "body1", // Use body1 typography
            color: "black", // Optionally ensure the color is black
          }}
        >
          Product
        </InputLabel>
        <Select
          labelId="product-label"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
 
          sx={{
            borderRadius: '20px', // Round the dropdown itself
            '& .MuiSelect-select': {
              borderRadius: '20px', // Round the inside field
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '20px', // Round the dropdown menu
            },
          },
        }}
      >
  {productOptions.map((product) => (
    <MenuItem key={product.id} value={product.id}>
      {product.name}
    </MenuItem>
  ))}
</Select>
</FormControl>


<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ClearIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => setSelectedProduct("")}
            />
            <Typography
              variant="body2"
              sx={{
                color: "blue",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => setSelectedProduct("")}
            >
              Clear
            </Typography>
          </Box>
        </Box>

      {/* Dates Accordion */}
      <Accordion
          expanded={expanded === "datesAccordion"}
          onChange={handleAccordionChange("datesAccordion")}
          sx={{
            width: "100%", // Ensure the accordion takes up the entire width
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(240, 248, 255, 0.1), rgba(224, 255, 255, 0.1))', // Softer gradient with transparency
            boxShadow: "none", // Remove default box shadow
            borderRadius: "16px",
            }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="dates-content"
            id="dates-header"
            sx={{
              padding: "0 16px", // Adjust padding
              borderTop: "1px solid #ddd", // Divider line at the top of the accordion
              borderRadius: "20px", // Rounded corners for the accordion summary
              '&:hover': {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
             }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Dates
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{
           borderRadius: "16px",
          overflow: "hidden", 
        }}>
            {/* Start Date Filter */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1">Start Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  PopperProps={{
                    sx: {
                      "& .MuiPaper-root": {
                        backdropFilter: "blur(15px)", // Frosted-glass effect
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
                      },
                    },
                  }}
                  sx={{
                    "& .MuiPickersCalendarHeader-root": {
                      backdropFilter: "blur(10px)", // Applying the blur effect
                      borderRadius: "20px", // Ensure header also has rounded corners
                    },
                    "& .MuiDayPicker-root": {
                      borderRadius: "20px", // Ensure the day picker itself is rounded
                    },
                    marginLeft: "-11px",
                  }}
                />
              </LocalizationProvider>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ClearIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => setSelectedProduct("")}
            />
             <Typography
              variant="body2"
              sx={{
                color: "blue",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => setStartDate(null)}

              >
              Clear
            </Typography>
            </Box>
              {/* End Date Filter */}
              <Typography variant="body1">End Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  PopperProps={{
                    sx: {
                      "& .MuiPaper-root": {
                        backdropFilter: "blur(15px)", // Frosted-glass effect
                        borderRadius: "20px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
                      },
                    },
                  }}
                  sx={{
                    "& .MuiPickersCalendarHeader-root": {
                      backdropFilter: "blur(10px)", // Applying the blur effect
                      borderRadius: "20px", // Ensure header also has rounded corners
                    },
                    "& .MuiDayPicker-root": {
                      borderRadius: "20px", // Ensure the day picker itself is rounded
                    },
                    marginLeft: "-11px",
                  }}
                />
              </LocalizationProvider>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ClearIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => setSelectedProduct("")}
            />
            <Typography
              variant="body2"
              sx={{
                color: "blue",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() =>setEndDate(null)}

              >
              Clear
            </Typography>
            </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

                  {/* Apply Filters Button */}
                  <Button
      variant="contained"
      color="primary"
      onClick={() => {
        filterDataByDate();
        setDrawerOpen(false);
      }}
      sx={{
        borderRadius: '20px',
        padding: '10px 20px',
      }}
    >
      Apply Filters
    </Button>
  </Box>
</Drawer>

              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Overview" />
                <Tab label="Events" />
                <Tab label="Itineraries" />
                <Tab label="Gift Shop" />
              </Tabs>
              <div id="report-content">
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
                        <CardHeader title="App Commission " />
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
                          <Typography variant="h5">
                            +{totalProductSales}
                          </Typography>
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
              {tabValue === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardHeader title="Revenue Overview" />
                      <CardContent>
                        <Box sx={{ height: 300 }}>
                          <Line data={eventChartData} options={chartOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardHeader title="Events Distribution" />
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Total Bookings: {totalEventBookings}
                        </Typography>
                        <Box sx={{ height: 200 }}>
                          <Pie data={pieChartData} options={pieOptions} />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, textAlign: "center" }}
                        >
                          Events make up{" "}
                          {((totalEventBookings / totalBookings) * 100).toFixed(
                            1
                          )}
                          % of total bookings
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              {tabValue === 2 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardHeader title="Revenue Overview" />
                      <CardContent>
                        <Box sx={{ height: 300 }}>
                          <Line
                            data={itineraryChartData}
                            options={chartOptions}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardHeader title="Itineraries Distribution" />
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Total Bookings: {totalItineraryBookings}
                        </Typography>
                        <Box sx={{ height: 200 }}>
                          <Pie
                            data={pieChartData_itinerary}
                            options={pieOptions}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, textAlign: "center" }}
                        >
                          Itineraries make up{" "}
                          {(
                            (totalItineraryBookings / totalBookings) *
                            100
                          ).toFixed(1)}
                          % of total bookings
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              {tabValue === 3 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <CardHeader title="Revenue Overview" />
                      <CardContent>
                        <Box sx={{ height: 300 }}>
                          <Line data={giftChartData} options={chartOptions} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardHeader title="Gift Shop Distribution" />
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Total Sales: {totalProductSales}
                        </Typography>
                        <Box sx={{ height: 200 }}>
                          <Pie data={pieChartData_gift} options={pieOptions} />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: 2, textAlign: "center" }}
                        >
                          Gift shop sales make up{" "}
                          {((totalProductRevenue / totalRevenue) * 100).toFixed(
                            1
                          )}
                          % of total Revenue
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              </div>
            </Box>
          </ThemeProvider>
        </Content>
      </Layout>
    </Layout>
  );
}
