import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from './components/PageContainer';
import NavBar from "../../NavBarTourGuide"
// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';


const Report = () => {
  let TG;let ADV; let mt= 20;
  const role = localStorage.getItem("role");
  console.log(role);
  
  if(role==="Tour_Guide")
    TG= true
  else
     if(role==="Advertiser"){
      ADV=true;
      mt=0;
     }
  
  const [revenue,setRevenue] = useState(null);
  const [tourists,setTourists] = useState(null);
  const [events,setEvents] = useState(null)
  const handleRevenue = (revenue) => {
    console.log("Form Data Received:", revenue);
    setRevenue(revenue); // Store or process form data
    //setActiveStep(activeStep + 1);
  };
  
  const handleTourists = (tourists) => {
    console.log("Tourist Received:", tourists);
    setTourists(tourists); // Store or process form data
    //setActiveStep(activeStep + 1);
  };
  const handleEvents = (events) => {
    console.log("Form Data Received:", events);
    setEvents(events); // Store or process form data
    //setActiveStep(activeStep + 1);
  };
  function handle(){

  }
  return (
    <PageContainer  description="this is Dashboard">
      {TG &&<NavBar />}
      <div style={{marginTop:`${mt}px`}}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview onHandleRev={handleRevenue} onHandleTour={handleTourists} onH={handleEvents}/>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup revenue={revenue}  />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings tourists={tourists}/>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          <Grid item xs={12} lg={8}>
            <ProductPerformance  events={events} />
          </Grid>
          {/* <Grid item xs={12}>
            
          </Grid> */}
        </Grid>
      </Box>
      </div>
    </PageContainer>
  );
};

export default Report;
