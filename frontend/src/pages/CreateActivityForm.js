import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SelectTags from "../components/SelectTags";
import SelectCategory from "../components/SelectCategory";
import { useNavigate } from "react-router-dom";

export default function CreateActivityForm() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    tag: "",
    category: "",
    lon: "",
    lan: "",
    price: 0,
    discount: 0,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const steps = ["Basic Info", "Details", "Confirm & Submit"];

  const handleNext = () => {
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }
    setErrorMessages({});
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleDateChange = (field) => (newDate) => {
    setFormData((prev) => ({ ...prev, [field]: newDate }));
  };

  const validateFields = () => {
    const errors = {};
    if (activeStep === 0) {
      if (!formData.title) errors.title = "Title is required.";
      if (!formData.description) errors.description = "Description is required.";
    } else if (activeStep === 1) {
      if (!formData.startDate) errors.startDate = "Start date is required.";
      if (!formData.endDate) errors.endDate = "End date is required.";
      if (!formData.lon) errors.lon = "Longitude is required.";
      if (!formData.lan) errors.lan = "Latitude is required.";
      if (!formData.tag) errors.tag = "Tag is required.";
      if (!formData.category) errors.category = "Category is required.";
      if (formData.price < 0) errors.price = "Price cannot be negative.";
      if (formData.discount < 0) errors.discount = "Discount cannot be negative.";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setErrorMessages({ general: "No token found. Please log in." });
      return;
    }

    const activity = {
      ...formData,
      start_date: formData.startDate.format("YYYY-MM-DD"),
      end_date: formData.endDate.format("YYYY-MM-DD"),
      price: parseFloat(formData.price),
      discount: parseFloat(formData.discount),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/Carigo/Activity/createActivity",
        {
          method: "POST",
          body: JSON.stringify(activity),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const json = await response.json();
        setErrorMessages({ general: json.error || "An error occurred." });
        return;
      }

      setOpenDialog(true);
    } catch (err) {
      console.error(err);
      setErrorMessages({ general: "Failed to create activity." });
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleInputChange("title")}
              error={!!errorMessages.title}
              helperText={errorMessages.title}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={formData.description}
              onChange={handleInputChange("description")}
              error={!!errorMessages.description}
              helperText={errorMessages.description}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={handleDateChange("startDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    error={!!errorMessages.startDate}
                    helperText={errorMessages.startDate}
                  />
                )}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={handleDateChange("endDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    error={!!errorMessages.endDate}
                    helperText={errorMessages.endDate}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Longitude"
              fullWidth
              margin="normal"
              value={formData.lon}
              onChange={handleInputChange("lon")}
              error={!!errorMessages.lon}
              helperText={errorMessages.lon}
            />
            <TextField
              label="Latitude"
              fullWidth
              margin="normal"
              value={formData.lan}
              onChange={handleInputChange("lan")}
              error={!!errorMessages.lan}
              helperText={errorMessages.lan}
            />
            <SelectTags tags={formData.tag} setTags={(tag) => setFormData((prev) => ({ ...prev, tag }))} />
            <SelectCategory tags={formData.category} setTags={(category) => setFormData((prev) => ({ ...prev, category }))} />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="body1">Review and confirm your details:</Typography>
            <Typography variant="subtitle1">Title: {formData.title}</Typography>
            <Typography variant="subtitle1">Description: {formData.description}</Typography>
            {/* Display other fields as needed */}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{color:"#0d1d25"}}>
        Create New Activity
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label,index) => (
          <Step key={label}>
            <StepLabel  StepIconProps={{
          sx: {
            "& .MuiStepLabel-root .Mui-active": {
              color:"#d59d80" , // active color
            },
            "& .MuiStepIcon-text": {
              fill: "#FFFFFF", // Text color inside the circle
            },
            "&.Mui-completed .MuiStepIcon-root": {
              color: "#d59d80", // Completed step color
            },
          },
        }}
      >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent(activeStep)}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Activity Created Successfully</DialogTitle>
        <DialogContent>Your activity has been successfully created!</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              navigate("/advertiser");
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
