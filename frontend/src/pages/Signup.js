import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox'; // Add Checkbox component
import FormControlLabel from '@mui/material/FormControlLabel'; // Label for the checkbox

import React, { useState } from "react";

function SignUp() {
  //not sure if this should be put outside or not
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
  const [openDialog, setOpenDialog] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    username: "", // Change from 'email' to 'username'
    password: "",
    email: "",
    passwordConfirm: "",
    role: "", // Default value for the select
    mobile_number: "",
    nationality: "",
    DOB: "",              ////////////////////
    job:"",
//    tourGuideExperience:"", ////////////////////////
    website_link:"",
    hotline:"",             /////////////////////
    about:"",
    sellerName:"",
    description:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = (e) => {
    e.preventDefault();
    setOpenDialog(false);
  };
  
  const handleAgree = (e) => {
    e.preventDefault();
    setOpenDialog(false);
    handleSubmitSignUp(); // Call the signup submission function
  };
  

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();

    let filteredData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      role: formData.role,
    };
  
    if (formData.role === "Tourist") {
      filteredData = {
        ...filteredData,
        mobile_number: formData.mobile_number,
        nationality: formData.nationality,
        DOB: formData.DOB,
        job: formData.job,
      };
    } else if (formData.role === "Tour_Guide") {
      filteredData = {
        ...filteredData,
        mobile_number: formData.mobile_number,
        experience:[],
        years_of_experience:0
        // tourGuideExperience: formData.tourGuideExperience,
      };
    } else if (formData.role === "Advertiser") {
      filteredData = {
        ...filteredData,
        website_link: formData.website_link,
        hotline: formData.hotline,
        about: formData.about,
      };
    } else if (formData.role === "Seller") {
      filteredData = {
        ...filteredData,
        sellerName: formData.sellerName,
        description: formData.description,
      };
    }
  

    try {
      console.log(filteredData);
      const response = await fetch("http://localhost:4000/cariGo/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });

      // Check if the response is okay
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Incorrect Data");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("signup successful", data); // Log success

      // Extract the token from the response
      const token = data.token;

      // Store the token in local storage
      //localStorage.setItem("jwt", token); // Use sessionStorage if you prefer

      // Optionally redirect the user or perform another action
      // For example, using react-router:
      // history.push('/dashboard');
     // window.location.href = '/login'; 
      console.log(token);
    } catch (error) {
      console.error("Error:", error.message); // Log the error in console
      alert("signup failed: " + error.message); // Show alert to the user
    }
    
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmitSignUp}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="passwordConfirm"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">select user type</option>
            <option value="Tourist">Tourist</option>
            <option value="Advertiser">Advertiser</option>
            <option value="Tour_Guide">Tour Guide</option>
            <option value="Seller">Seller</option>
          </select>
           {/* Conditionally render additional inputs based on userType */}
           {formData.role === "Tourist" && (
            <>
            <input
              type="number"
              name="mobile_number"
              placeholder="mobile number"
              onChange={handleChange}
            />
            <input
              type="text"
              name="nationality"
              placeholder="nationality"
              onChange={handleChange}
            />
            <input
              type="date"
              name="DOB"
              placeholder="date of birth"
              onChange={handleChange}
            />
            <input
            type="text"
            name="job"
            placeholder="job"
            onChange={handleChange}
          />
          </>
          )}
           {formData.role === "Tour_Guide" && (
            <>
            <input
              type="number"
              name="mobile_number"
              placeholder="mobile number"
              onChange={handleChange}
            />
            {/* <input
              type="text"
              name="tourGuideExperience"
              placeholder="Tour Guide Experience"
              onChange={handleChange}
            /> */}
            </>
          )}
           {formData.role === "Advertiser" && (
            <>
            <input
              type="text"
              name="website_link"
              placeholder="website link"
              onChange={handleChange}
            />
            <input
              type="number"
              name="hotline"
              placeholder="hotline"
              onChange={handleChange}
            />
            <input
              type="text"
              name="about"
              placeholder="about"
              onChange={handleChange}
            />
            </>
          )}
          {formData.role === "Seller" && (
            <>
            <input
              type="text"
              name="sellerName"
              placeholder="seller name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="description"
              onChange={handleChange}
            />
            </>
           
          )}
          <FormControlLabel
            control={<Checkbox checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} />}
            label="I agree to the Terms and Conditions"
          />
          <Button variant="outlined" onClick={handleSubmitSignUp} disabled={!agreeTerms}>register</Button>
        </form>
        

      </div>
    </div>
  );
}

export default SignUp;