'use client'

import React, { useState, useEffect } from 'react'
import { 
  Container, Typography, Paper, Grid, CircularProgress, createTheme, ThemeProvider,
  Box, Card, CardContent, CardHeader, Select, MenuItem, Button
} from '@mui/material'
import { blue, orange } from '@mui/material/colors'
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { CalendarToday as CalendarIcon } from '@mui/icons-material'
import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { ToastContainer } from 'react-toastify'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
})



function UserRolesChart({ userRoles }) {
  const data = {
    labels: Object.keys(userRoles),
    datasets: [
      {
        data: Object.values(userRoles),
        backgroundColor: [
          '#2196f3',
          '#ff9800',
          '#4caf50',
          '#f44336',
          '#9c27b0',
          '#ffeb3b',
          '#795548',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <Card>
      <CardHeader title="User Roles Distribution" />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <Pie data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

function NewUsersChart({ newUsersPerMonth }) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: newUsersPerMonth,
        backgroundColor: '#2196f3',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <Card>
      <CardHeader title="New Users per Month" />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default function AdminReport() {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userIncrease, setUserIncrease] = useState(0)
  const [timeframe, setTimeframe] = useState('monthly')

  function UserCountCard({ userCount }) {
    return (
      <Card>
        <CardHeader title="Total Users" />
        <CardContent>
          <Typography variant="h5">{userCount}</Typography>
          <Typography variant="body2" color="text.secondary">
            
            {
                userIncrease > 0 ? (`+ ${userIncrease|| 0} more users from last month`
                ):(`${userIncrease|| 0} less users from last month`)
            }
          </Typography>
        </CardContent>
      </Card>
    )
  }
  useEffect(() => {
    fetch('http://localhost:4000/admin/user_report', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setReportData(data.data)
          // Calculate the user increase
          const newUsersPerMonth = data.data.newUsersPerMonth;
          const thisMonthUsers = newUsersPerMonth[newUsersPerMonth.length - 1];
          const lastMonthUsers = newUsersPerMonth[newUsersPerMonth.length - 2];
          const userIncrease = thisMonthUsers - lastMonthUsers;
          setUserIncrease(userIncrease);
        } else {
          setError('Failed to fetch report data')
        }
        setLoading(false)
      })
      .catch((err) => {
        setError('An error occurred while fetching the data')
        setLoading(false)
      })
  }, [])

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value)
  }

  const handleDownloadReport = () => {
    const input = document.getElementById('report-content')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape')
      const imgWidth = pdf.internal.pageSize.getWidth()
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('admin-report.pdf')
    })
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !reportData) {
    return (
      <Container>
        <Typography color="error">{error || 'No data available'}</Typography>
      </Container>
    )
  }

return (
    <ThemeProvider theme={theme}>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={256} style={{ background: '#001529' }}>
                <Sidebar />
            </Sider>
            <Layout>
                <Header style={{ background: '#001529', padding: 0 }}>
                    <TopBar />
                </Header>
                <ToastContainer />
                <Content style={{ padding: '20px', overflowY: 'auto' }}>
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Typography variant="h4" component="h1" gutterBottom>
                                Admin Report
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleDownloadReport}
                                >
                                    Download Report
                                </Button>
                            </Box>
                        </Box>
                        <div id="report-content">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <UserCountCard userCount={reportData.userCount} />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <UserRolesChart userRoles={Object.fromEntries(Object.entries(reportData.userRoles).filter(([key, value]) => value !== undefined))} />
                                </Grid>
                                <Grid item xs={12}>
                                    <NewUsersChart newUsersPerMonth={reportData.newUsersPerMonth} />
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Content>
            </Layout>
        </Layout>
    </ThemeProvider>
)
}

