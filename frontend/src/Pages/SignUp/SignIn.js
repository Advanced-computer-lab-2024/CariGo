import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/UserInformation";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import PaymentForm from "./components/Preferences";
import Review from "./components/Review";
import { useState } from "react";
import SitemarkIcon from "./components/SitemarkIcon";
import AppTheme from "./Theme/AppTheme";
import TermsAndConditions from "./components/Review";
import axios from "axios";
import ColorModeIconDropdown from "./Theme/ColorModeIconDropdown";
import UploadDocumentsPage from "./components/UploadDocuments";
import { useEffect } from "react";
import Preferences from "./components/Preferences";
import UserInformation from "./components/UserInformation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
// import avatar from "../../../public/profile.png"
const steps = ["User Information", "Upload Documents", "Terms & Conditions"];
function SignIn({role,  preferences }) {
  //console.log(role);
  role = localStorage.getItem('role');
  if(role==="Tourist")
    steps[1] = "Select Your Preferences"
  const [formData, setFormData] = useState({username:"", // Change from 'email' to 'username'
    password:"",
    email:"",
    passwordConfirm: "",
    role: "", // Default value for the select
    mobile_number:"",
    nationality: "",
    DOB: "",              ////////////////////
    job:"",
//    tourGuideExperience:"", ////////////////////////
    website_link:"",
    hotline:"",             /////////////////////
    about:"",
    sellerName:"",
    description:"",
    selectedTags:""
  });
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [checked , setChecked] = useState(false);
  localStorage.setItem('role',"Tourist")
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const formResponse = await fetch(
        "http://localhost:4000/cariGo/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
    
      //console.log(response.json().username+"  res")
      // Check if the response is okay
      if (!formResponse.ok) {
        if (formResponse.status === 401) {
          throw new Error("Unauthorized: Incorrect Data");
        }
        throw new Error(`HTTP error! Status: ${formResponse.status}`);
      }
      console.log("checked");
      // Parse the JSON response
      const data = await formResponse.json();
      console.log("signup successful", data); // Log success

      // Extract the token from the response
      const token = data.token;

      // Store the token in local storage
      //localStorage.setItem("jwt", token); // Use sessionStorage if you prefer

      // Optionally redirect the user or perform another action
      // For example, using react-router:
      // history.push('/dashboard');
      
      console.log(token);
      if(imageData.file){
        const image = new FormData();
        image.append("photo", imageData.file);
        //FormData image = new FormData(imageData.file);
        //const token1 = localStorage.getItem('jwt')
        console.log(formData);
        const imageResponse = await fetch(
          "http://localhost:4000/cariGo/users/photo",
          
          {
            method: "POST",
            body: image,
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
                // "Content-Type": "application/json",
              }
       } );
        console.log(imageResponse);
        //window.location.href = '/login';
        //console.log(response.json().username+"  res")
        // Check if the response is okay
        if (!imageResponse.ok) {
          if (imageResponse.status === 401) {
            throw new Error("Unauthorized: Incorrect Data");
          }
          throw new Error(`HTTP error! Status: ${imageResponse.status}`);
        }
        console.log("checked");
        // Parse the JSON response
        const bin = await imageResponse.json();
        console.log("photo added successfully", bin); // Log success
      }
      if(selectedFiles){
        console.log(selectedFiles.certificates)
        const docsData = new FormData()
        docsData.append('id',selectedFiles.id)
        if(role==="Tour_Guide")
          selectedFiles.certificates.forEach((file) => {
            docsData.append("certificates", file); // Add each certificate file individually
            console.log(file);
      });
    
      else
      docsData.append('taxationRegistryCard',selectedFiles.taxationRegistryCard)
           console.log(docsData.get('certificates'))
        const docsResponse = await fetch("http://localhost:4000/cariGo/users/upload-documents", {
          method: "POST",
          body:docsData,
          headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
              // "Content-Type": "application/json",
            }
  
  
        });
        console.log("Response status:", docsResponse.status); // Logs the HTTP status
  
        if (!docsResponse.ok) throw new Error(`HTTP error! Status: ${docsResponse.status}`);
        const Docs = await docsResponse.json();
        console.log("Upload successful:", Docs);
       
      }
      
      // -----------------------------DOCS-----------------------------------------
      
      
      window.location.href = "/login";
    }catch (error) {
      console.error("Error:", error.message); // Log the error in console
      alert("signup failed: " + error.message); // Show alert to the user
    }
    
  };
  //console.log(formData)
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        //  console.log("rrrr");
        return (
          <UserInformation
            onFormSubmit={handleFormSubmit}
            onImageSubmit={handleImageSubmit}
            role={role}
            data={formData}
            image={imageData}
          />
        );
      case 1:
        // console.log(formData.myFile);
        if(role==="Tourist"){
          console.log(role)
        return (
          <Preferences
            onPreferencesSubmit={handlePreferencesSubmit}
            preferences={preferences}
          />
        );
      }
      //return <Review/>
        return <UploadDocumentsPage onDocsSubmit={handleDocsSubmit}/>
      case 2:
        //handleSignUp();
        //break;
        return <TermsAndConditions />;
      default:
        throw new Error("Unknown step");
    }
  };
  const handleDocsSubmit = (data) =>{
    setSelectedFiles(data)
     console.log("From Docs recieved: ",data)
     setActiveStep(activeStep + 1);
  }
  const handlePreferencesSubmit = (data) => {
    console.log("Form Preferences Received:", data);
    setFormData((prevFormData) => ({ ...prevFormData, selectedTags: data })); // Use functional update to ensure consistency
    setActiveStep(activeStep + 1);
  };
  
  //Using useEffect to log the updated formData
  // useEffect(() => {
  //   //console.log("Updated selectedTags:", formData);
  // }, [formData.selectedTags]);

  const handleFormSubmit = (data) => {
    console.log("Form Data Received:", data);
    setFormData(data); // Store or process form data
    setActiveStep(activeStep + 1);
  };
  const handleImageSubmit = (data) => {
    console.log("Image Data Received:", data);
    setImageData(data); // Store or process form data
    //setActiveStep(activeStep + 1);
  };
  return (
    <>
      {/* <CssBaseline enableColorScheme /> */}
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 14,
            px: 10,
            gap: 4,
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
           <Button  style={{marginTop:"-50px"}}
                    variant="contained"
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={()=>navigate("/")}
                    fullWidth
                    
                    sx={{ width: { xs: "flex", sm: "fit-content" } }}
                  >
                    Return
                  </Button>

          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: "100%", height: 40,marginTop:"-80px" }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-of-type": { pl: 0 },
                      ":last-of-type": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "$144.97" : "$134.98"}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-of-type": { pl: 0 },
                    ":last-of-type": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    { label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                { activeStep===0 &&(<FormControlLabel style={{marginTop:"-90px"}}
            control={<Checkbox name="saveCard" required  checked={checked} onChange={()=>setChecked(!checked)} />}
            label="Accept Terms & Conditions"
          />)}
                <Box
                  sx={[
                    {
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 2,
                      pb: { xs: 1, sm: 0 },
                      mt: { xs:0, sm: -6 },
                      mb: "60px",
                    },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      style={{marginTop:"-180px"}}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                    
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep ===0 && checked &&
                   (<Button type="submit" style={{marginTop:"-100px",marginBottom:"50px"}}
                    variant="contained"
                    endIcon={(activeStep === steps.length - 2) && <ChevronRightRoundedIcon />}
                    onClick={handleSignUp}
                    fullWidth
                    
                    sx={{ width: { xs: "flex", sm: "fit-content" } }}
                  >
                    Register
                  </Button>
                )}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default SignIn;
