import React, { useState } from "react";
import "./styles.css";
import Alert from '@mui/material/Alert';
import { useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import avatar from "../../../assets/profilePic.png";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import TAmodal from "./modal";
const roles = {
  tourist: ["nationality", "DOB", "job", "wallet", "idDocument"],
  seller: ["sellerName", "description", "taxationRegistryCard"],
  advertiser: ["website_link", "hotline", "about", "taxationRegistryCard"],
  tourguide: ["certificates"],
};
let role ="Tourist"
export default function FormContainer() {
    const FormGrid = styled('div')(() => ({
        display: 'flex',
        flexDirection: 'column',
      }));
    const [postImage, setPostImage] = useState({ myFile:""  ,
        file:""});
      const [formData, setFormData] = useState({
        username: "", // Change from 'email' to 'username'
        password: "",
        email: "",
        passwordConfirm: "",
        role: "", // Default value for the select
        mobile_number: "",
        nationality: "",
        DOB:"",              ////////////////////
        job:"",
    //    tourGuideExperience:"", ////////////////////////
        website_link:"",
        hotline:"",             /////////////////////
        about:"",
        sellerName:"",
        description:"",
        //selectedTags:[]
         //myFile: data && data.myFile?data.myFile:""
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmitSignUp = async (event) => {
        event.preventDefault();
          console.log("inside handle");
          console.log("seew"+formData.myFile)
        let filteredData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          role: role,
          //myFile:formData.myFile
        };
        let filteredImage={
            myFile:postImage.myFile,
            file:postImage.file
        }
      
        if (role === "Tourist") {
          filteredData = {
            ...filteredData,
            mobile_number: formData.mobile_number,
            nationality: formData.nationality,
            DOB: formData.DOB,
            job: formData.job,
          };
        } else if (role === "Tour_Guide") {
          filteredData = {
            ...filteredData,
            mobile_number: formData.mobile_number,
            experience:[],
            years_of_experience:0
            // tourGuideExperience: formData.tourGuideExperience,
          };
        } else if (role === "Advertiser") {
          filteredData = {
            ...filteredData,
            website_link: formData.website_link,
            hotline: formData.hotline,
            about: formData.about,
          };
        } else if (role === "Seller") {
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
       // onFormSubmit(filteredData);
        //onImageSubmit(filteredImage);
      }
      //---------------------------------
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    
        // createPost(postImage) or other submit logic
      };
      function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => resolve(fileReader.result);
          fileReader.onerror = (error) => reject(error);
        });
      }
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        //console.log(file);
       const base64 = await convertToBase64(file);
       console.log(base64);
       // setFormData({ ...formData,myFile:base64});
        setPostImage({myFile:base64,file:file})
      };
  const [role, setRole] = useState("tourist");
  const [modalInput, setModalInput] = useState(null);

  const commonFields = [
    "photo",
    "username",
    "email",
    "password",
    "passwordConfirm",
    "mobile_number",
  ];

  const handleHover = (field) => setModalInput(field);
  const handleBlur = () => setModalInput(null);
  const [open,setOpen] = useState(false)
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tagName, setTagName] = React.useState([]);
  const handleOpen = () =>{
     setOpen(true);
  }
  const colors = [
    "success",
    "warning",
    "danger",
    "info",
    "Primary",
    "Secondary",
  ];
  useEffect(() => {
    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Admin/getTags");
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data);
          // console.log(response.data);
          setSelectedTags([])
          setTagName([]);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const handleRemoveTag = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
    console.log(selectedOptions)
  };
  return (
    <div className="form-container " style={{left: "0",
        width: "100%",zIndex:"2"
        }}>
    <form onSubmit={handleSubmitSignUp}> {/* Wrap in form */}
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 12 }} style={{ marginLeft: "450px", marginTop: "30px" }}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={postImage.myFile || avatar} alt="Uploaded avatar" style={{borderRadius:"50%"}} />
        </label>
        <input
          type="file"
          name="myFile"
          
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          onChange={handleFileUpload}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} style={{marginLeft:"-500px",marginTop:"100px"}}>
        <FormLabel htmlFor="name">Username</FormLabel>
        <input
          id="name"
          name="username"
          placeholder="John"
         className="input"
           onChange={handleChange}
          value={formData.username}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} style={{marginLeft:"-250px",marginTop:"200px"}}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <input
        className="input"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          placeholder="************"
          required
          size="small"
        />
        
      </FormGrid>
      <FormGrid size={{ xs: 12, md:6 }} style={{marginLeft:"-250px",marginTop:"300px"}}>
      <FormLabel htmlFor="passwordConfirm"> Confirm Password</FormLabel>
        <input
        className="input"
          id="passwordConfirm"
          name="passwordConfirm"
        //   style={{width:"400px"}}
          onChange={handleChange}
          value={formData.passwordConfirm}
          type="password"
          placeholder="***********"
          required
          size="small"
        />
        <FormGrid style={{marginRight:"30px"}}>
        <FormLabel htmlFor="email" style={{marginTop:"10px"}}>Email</FormLabel>
        <input
        className="input"
          id="email"
          name="email"
          placeholder="example@domain.com"
          type='Email'
        //   style={{width:""}}
         //style={{marginLeft:"10px"}}
          required
          size="small"
          onChange={handleChange}
          value={formData.email}
        />
        </FormGrid>
      </FormGrid>
      <FormGrid size={{ xs: 12 }} style={{marginTop:"200px",marginLeft:"390px"}} >
        {( <><FormLabel htmlFor="mobile">Mobile Number</FormLabel>
        <input
        className="input"
          id="mobile"
          name="mobile_number"
          
          placeholder="0xxxxxxx"
          size="small"
          onChange={handleChange}
         value={formData.mobile_number}
        /></>)}
        {role==="Advertiser" &&( <><FormLabel htmlFor="hotline">Hotline</FormLabel>
        <OutlinedInput
          id="hotline"
          name="hotline"
          
          placeholder="xxxxx"
          size="small"
          onChange={handleChange}
         value={formData.hotline}
        /></>)}
      </FormGrid>
       <FormGrid size={{ xs: 6 }} style={{marginLeft:"750px",marginTop:"-400px"}}>
       { <> <FormLabel htmlFor="DOB">Date of Birth</FormLabel>
        <input
        className="input"
          id="DOB"
          name="DOB"
          type="date"
          required
          size="small"
          onChange={handleChange}
          value={formData.DOB}
        /></>}
        {
            role==="Advertiser" &&<> <FormLabel htmlFor="website_link">Website Link*</FormLabel>
            <OutlinedInput
              id="website_link"
              name="website_link"
              type="text"
              placeholder='https://domain.com'
              required
              size="small"
              onChange={handleChange}
              value={formData.website_link}
            /></>
        }
        {
            role==="Seller" &&<> <FormLabel htmlFor="sellerName">Seller Name</FormLabel>
            <OutlinedInput
              id="sellerName"
              name="sellerName"
              type="text"
              placeholder='edita'
              required
              size="small"
              onChange={handleChange}
              value={formData.sellerName}
            /></>
        }
      </FormGrid>
      <FormGrid size={{ xs: 6 }} style={{marginLeft:"750px",marginTop:"-250px"}}>
      {<><FormLabel htmlFor="country">Country</FormLabel>
        <input
        className="input"
          id="country"
          name="nationality"
          placeholder="eg. Egypt"
          required
          size="small"
          onChange={handleChange}
          value={formData.nationality}
        /></>}
        {role==="Advertiser" &&<><FormLabel htmlFor="about">About</FormLabel>
            <textarea
            id='about'
            name="about" // Match with formData key
            placeholder="Type your long text here..."
            onChange={handleChange}
            value={formData.about} // Bind the value
            rows={4} // Set number of visible text rows
            style={{ width: '100%' }} // Make it full width
        /></>}
        
      </FormGrid>
      <FormGrid size={{ xs: 6 }} style={{marginLeft:"750px",marginTop:"-200px"}}>  
        {<><FormLabel htmlFor="job">Job</FormLabel>
        <input
        className="input"
          id="job"
          name="job"
          placeholder="eg. Engineer"
          required
          size="small"
          onChange={handleChange}
          value={formData.job}
        /></>}
         {role==="Seller" &&<><FormLabel htmlFor="description">Description</FormLabel>
            <textarea 
            id='description'
            name="description" // Match with formData key
            placeholder="Type your long text here..."
            
            onChange={handleChange}
            value={formData.description} // Bind the value
            rows={4} // Set number of visible text rows
            style={{ width: '100%' }} // Make it full width
        /></>}
      </FormGrid>
      <div className="multi-select-container" style={{marginTop:"-300px",marginLeft:"180px",width:"500px"}}>
      <div className="multi-select-dropdown" onClick={toggleDropdown}style={{marginTop:"-100px",marginLeft:"200px"}}>
        <div className="tags-container">
          {selectedOptions.map((option, index) => (
            <div className="tag" key={index}>
              {option}
              <span className="remove-tag" onClick={() => handleRemoveTag(option)}>
                ×
              </span>
            </div>
          ))}
        </div>
        <div className="placeholder">
          {selectedOptions.length === 0 ? "Select options..." : ""}
        </div>
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <ul className="dropdown-options" style={{marginTop:"-280px",marginLeft:"240px",width:"200px"}}>
          {tags.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                selectedOptions.includes(option.title) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option.title)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
      
      {/* Submit button */}
      <FormGrid size={{ xs: 12 }} style={{marginTop:"-80px",marginLeft:"800px"}}>
        <button className="button" variant="contained" type="submit" fullWidth
                  onClick={handleSubmitSignUp}
        >
          Sign Up
        </button>
      </FormGrid>
    </Grid>
    <TAmodal handle={open}/>
  </form>
  </div>
)
}
