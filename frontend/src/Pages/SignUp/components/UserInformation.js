import "../../../components/L&S/signUp/styles.css"
import * as React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
//import styles from "../../../components/L&S/signUp/styles.css"
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
import { useEffect } from 'react';
import Button from '@mui/material/Button'; 
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Grid from '@mui/material/Grid2';
import TermsAndConditions from './Review';
const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
  [theme.breakpoints.up('sm')]: {
    height: 600,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function UserInformation({ onFormSubmit,step,role,data,onImageSubmit,image }) {
    const x = null;
      
  const [postImage, setPostImage] = useState({ myFile:image && image.myFile?image.myFile:"" ,
    file:image && image.file?image.file:""});
  const [formData, setFormData] = useState({
    username: data && data.username?data.username:"", // Change from 'email' to 'username'
    password: data && data.password?data.password:"",
    email: data && data.email?data.email:"",
    passwordConfirm: data && data.passwordConfirm?data.passwordConfirm:"",
    role: "", // Default value for the select
    mobile_number: data && data.mobile_number?data.mobile_number:"",
    nationality: data && data.nationality?data.nationality:"",
    DOB: data && data.DOB?data.DOB:"",              ////////////////////
    job:data && data.job?data.job:"",
//    tourGuideExperience:"", ////////////////////////
    website_link:data && data.website_link?data.website_link:"",
    hotline:data && data.hotline?data.hotline:"",             /////////////////////
    about:data && data.about?data.about:"",
    sellerName:data && data.sellerName?data.sellerName:"",
    description:data && data.description?data.description:"",
    //selectedTags:[]
     //myFile: data && data.myFile?data.myFile:""
  });
//  console.log(postImage.myFile)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tagName, setTagName] = React.useState([]);
  
const handleData = (data) =>{
    console.log("DATA"+ data.username);
    setFormData({
        ...formData,
        username: "newUsername",
        email: "newEmail@example.com",
        
        DOB: "2000-01-01",
        // Set other fields as needed
    });

}
const handlePrefs = async (event) => {
  event.preventDefault();
  console.log("baki "+selectedTags)
  //onPreferencesSubmit(selectedTags)
};
  
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
    // try {
    //     console.log(filteredData);
    //     const response = await fetch("http://localhost:4000/cariGo/users/signup", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(filteredData),
    //     });
  
    //     // Check if the response is okay
    //     if (!response.ok) {
    //       if (response.status === 401) {
    //         throw new Error("Unauthorized: Incorrect Data");
    //       }
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
  
    //     // Parse the JSON response
    //     const data = await response.json();
    //     console.log("signup successful", data); // Log success
  
    //     // Extract the token from the response
    //     const token = data.token;
  
    //     // Store the token in local storage
    //     //localStorage.setItem("jwt", token); // Use sessionStorage if you prefer
  
    //     // Optionally redirect the user or perform another action
    //     // For example, using react-router:
    //     // history.push('/dashboard');
    //    // window.location.href = '/login'; 
    //     console.log(token);
    //   } catch (error) {
    //     console.error("Error:", error.message); // Log the error in console
    //     alert("signup failed: " + error.message); // Show alert to the user
    //   }
    onFormSubmit(filteredData);
    onImageSubmit(filteredImage);
  }
  //---------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // createPost(postImage) or other submit logic
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    //console.log(file);
   const base64 = await convertToBase64(file);
   console.log(base64);
   // setFormData({ ...formData,myFile:base64});
    setPostImage({myFile:base64,file:file})
  };
  return (
       
          
          <form onSubmit={handleSubmitSignUp} style={{marginTop:"-50px"}}> {/* Wrap in form */}
        <Grid spacing={3}>
          <FormGrid size={{ xs: 12, md: 12 }} style={{ marginLeft: "-300px", marginTop: "-5px" }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={postImage.myFile || (image && image.myFile) || avatar} alt="Uploaded avatar" style={{borderRadius:"50%"}} />
            </label>
            <input
              type="file"
              name="myFile"
              
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }} style={{marginLeft:"-350px",marginTop:"20px",width:"200px"}}>
            <FormLabel htmlFor="name">Username</FormLabel>
            <OutlinedInput
              id="name"
              name="username"
              placeholder="John"
             
               onChange={handleChange}
              value={formData.username}
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }} style={{marginLeft:"-350px",marginTop:"20px",width:"200px"}}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <OutlinedInput
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
          <FormGrid size={{ xs: 12, md:8 }} style={{marginLeft:"-350px",marginTop:"20px",width:"200px"}}>
          <FormLabel htmlFor="passwordConfirm"> Confirm Password</FormLabel>
            <OutlinedInput
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
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            <FormLabel htmlFor="email" style={{marginTop:"10px",marginLeft:"-60px"}}>Email</FormLabel>
            <OutlinedInput
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
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Tourist" || role==="Tour_Guide") &&<><FormLabel htmlFor="mobile" style={{marginTop:"10px",marginLeft:"-80px"}}>Mobile Number</FormLabel>
            <OutlinedInput
              id="mobile"
              name="mobile_number"
              
              placeholder="0xxxxxxx"
              size="small"
              onChange={handleChange}
             value={formData.mobile_number}
            /></>}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Tourist") &&<><FormLabel htmlFor="country" style={{marginTop:"10px",marginLeft:"-100px"}}>Country</FormLabel>
            <OutlinedInput
              id="country"
              name="nationality"
              placeholder="eg. Egypt"
              required
              size="small"
              onChange={handleChange}
              value={formData.nationality}
            /></>}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Tourist") &&<><FormLabel htmlFor="DOB" style={{marginTop:"10px",marginLeft:"-90px"}}>Date of Birth</FormLabel>
            <OutlinedInput
              id="DOB"
              name="DOB"
              type="date"
              required
              size="small"
              onChange={handleChange}
              value={formData.DOB}
            /></>}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Tourist") &&<><FormLabel htmlFor="job" style={{marginTop:"10px",marginLeft:"-160px"}}>Job</FormLabel>
            <OutlinedInput
              id="job"
              name="job"
              placeholder="eg. Engineer"
              required
              size="small"
              onChange={handleChange}
              value={formData.job}
            /></>}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Seller") &&(<><FormLabel htmlFor="sellerName" style={{marginTop:"10px",marginLeft:"-60px"}}>Seller Name</FormLabel>
            <OutlinedInput
                  id="sellerName"
                  name="sellerName"
                  type="text"
                  placeholder='edita'
                  required
                  size="small"
                  onChange={handleChange}
                  value={formData.sellerName}
                /></>)}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px",marginBottom:"30px"}}>
            {(role==="Seller") &&(<><FormLabel htmlFor="description" style={{marginTop:"10px",marginLeft:"-60px"}}>Description</FormLabel>
              <textarea 
                id='description'
                name="description" // Match with formData key
                placeholder="Type your long text here..."
                
                onChange={handleChange}
                value={formData.description} // Bind the value
                rows={4} // Set number of visible text rows
                style={{ width: '100%' }} // Make it full width
            /></>)}
            </FormGrid>
          </FormGrid>
          <FormGrid size={{ xs: 12 }} style={{marginLeft:"-10px",marginTop:"-450px",width:"200px"}} >
            
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
           <FormGrid size={{ xs: 6 }} style={{marginLeft:"250px",width:"200px",marginTop:"260px"}}>
           
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
      
          </FormGrid>
          <FormGrid size={{ xs: 6 }} style={{marginLeft:"-10px",marginTop:"20px",width:"200px"}}>
          
            {role==="Advertiser" &&<><FormLabel htmlFor="about">About</FormLabel>
         +       <textarea
                id='about'
                name="about" // Match with formData key
                placeholder="Type your long text here..."
                onChange={handleChange}
                value={formData.about} // Bind the value
                rows={4} // Set number of visible text rows
                style={{ width: '100%' }} // Make it full width
            /></>}
            
          </FormGrid>
          {/* <div className="multi-select-container" style={{marginTop:"-600px",marginLeft:"400px",width:"150px"}}>
      <div className="multi-select-dropdown" onClick={toggleDropdown}style={{marginTop:"400px",marginLeft:"-800px",width:"300px"}}>
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
        +
        <div className="placeholder">
          {selectedOptions.length === 0 ? "Select options..." : ""}
        </div>
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <ul className="dropdown-options" style={{marginTop:"50px",marginLeft:"-350px",width:"200px",marginBottom:"30px"}}>
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
    <div></div> */}
          <FormGrid size={{ xs: 6 }} style={{marginLeft:"-10px",marginTop:"-600px",marginBottom:"60px",height:"300px"}}>
          <TermsAndConditions/>
          </FormGrid>
         
          {/* Submit button */}
          {/* <FormGrid size={{ xs: 12 }} style={{marginTop:"-10px",marginLeft:"320px"}}>
            <Button variant="contained" type="submit" fullWidth style={{width:"100px"}}
            endIcon={<ChevronRightRoundedIcon />}
            >
              NEXT
            </Button>

          </FormGrid> */}
        </Grid>
      </form>
         
          
      
   
  );
}
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }
  