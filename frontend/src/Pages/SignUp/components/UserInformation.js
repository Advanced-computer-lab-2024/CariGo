import Sheet from "@mui/joy/Sheet";
import "../../../components/L&S/signUp/styles.css"
import * as React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
//import styles from "../../../components/L&S/signUp/styles.css"
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
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
//let filteredData
export default function UserInformation({ onFormSubmit,step,role,data,onImageSubmit,image,onDocsSubmit,onPreferencesSubmit,hStep }) {
    const x = null;let left = 350
   const [token,setToken] = useState(null)
     let mt = -600
     if(role==="Seller"){
      mt = -550
     left =320 
    }
    else
    if(role==="Tour_Guide")
      mt=-420;
    // else
    //  if(role==="Advertiser")
    //    left =320
    const [checked , setChecked] = useState(false);
  const [postImage, setPostImage] = useState({ myFile:image && image.myFile?image.myFile:"" ,
    file:image && image.file?image.file:""});
  const [formData, setFormData] = useState({
    username: data && data.username?data.username:"", // Change from 'email' to 'username'
    password: data && data.password?data.password:"",
    email: data && data.email?data.email:"",
    passwordConfirm: data && data.passwordConfirm?data.passwordConfirm:"",
    role: role, // Default value for the select
    mobile_number: data && data.mobile_number?data.mobile_number:"",
    nationality: data && data.nationality?data.nationality:"",
    DOB: data && data.DOB?data.DOB:"",              ////////////////////
    job:data && data.job?data.job:"",
//    tourGuideExperience:"", ////////////////////////
    website_link:data && data.website_link?data.website_link:role!=="Advertiser"?"http://guc.edu.eg":"",
    hotline:data && data.hotline?data.hotline:"",             /////////////////////
    about:data && data.about?data.about:"",
    sellerName:data && data.sellerName?data.sellerName:"",
    description:data && data.description?data.description:"",
    selectedTags:[],
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
  
const handlePrefs = async (event) => {
  event.preventDefault();
  console.log("baki "+selectedTags)
  //onPreferencesSubmit(selectedTags)
};
const [imageData, setImageData] = useState(null);
const [state,setState] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    console.log(role)
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
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    
      );
  
    // Update formData with the selected option
    setFormData((prevData) => ({
      ...prevData,
      selectedTags: prevData.selectedTags.includes(option)
        ? prevData.selectedTags // If already included, no change
        : [...prevData.selectedTags, option], // Add new option to selectedTags
    }));
    hStep(state)
  };
  const [selectedFiles, setSelectedFiles] = useState({
    id: null,
    certificates: [],
    taxationRegistryCard: null,
  });
const userRole=localStorage.getItem('role');
console.log(userRole);
  // Handle file selection changes
  const handleFileChange = (e) => {
    hStep(1)
    const { name, files } = e.target;
    console.log(name)
    console.log(files)
    setSelectedFiles({
      ...selectedFiles,
      [name]: name === "certificates" ? Array.from(files) : files[0],
    // [name]: files[0], // Allow only single file for certificate
    });
  };
  
  const handleRemoveTag = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
    console.log(selectedOptions)
  };
  let filteredData = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    passwordConfirm: formData.passwordConfirm,
    role: role,
    //myFile:formData.myFile
  };
  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
      console.log("inside handle");
      console.log("seew"+formData.myFile)
      console.log(selectedOptions)
    
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
        selectedTags:getTagIdsFromTitles()
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
    if (selectedFiles.id) formData.append('id', selectedFiles.id);
    if (role === "Tour_Guide" && selectedFiles.certificates.length > 0) {
    
        //   formData.append("certificates", selectedFiles.certificate); // Only one certificate allowed
    
        selectedFiles.certificates.forEach((file) => {
            formData.append("certificates", file); // Add each certificate file individually
      });
    }
    if ((role === "Advertiser" || role === "Seller") && selectedFiles.taxationRegistryCard) {
      formData.append("taxationRegistryCard", selectedFiles.taxationRegistryCard);
    }
    console.log(filteredData)
    console.log(selectedFiles)
    console.log(postImage)
    onDocsSubmit(selectedFiles)
    onFormSubmit(filteredData);
    onImageSubmit(postImage);
    onPreferencesSubmit(selectedOptions)
  }
  //---------------------------------
  const getTagIdsFromTitles = () => {
    // Map through selectedOptions and find each tag's corresponding _id from the tags array
    const selectedTagIds = selectedOptions.map((optionTitle) => {
      const tag = tags.find((tag) => tag.title === optionTitle);  // Find the tag object by its title
      return tag ? tag._id : null;  // Return the _id, or null if the tag isn't found
    }).filter(id => id !== null);  // Remove any null values in case a tag title doesn't match
  
    return selectedTagIds;
  };
  
  // Example usage:
  //const selectedTagIds = getTagIdsFromTitles();
  //console.log(selectedTagIds);  // This will log the array of _id values for the selected titles
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Prepare data for signup
      formData.selectedTags = getTagIdsFromTitles();
      console.log("FormData for signup:", formData);
  
      // Send signup request
      const formResponse = await fetch("http://localhost:4000/cariGo/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!formResponse.ok) {
        throw new Error(`Signup failed. Status: ${formResponse.status}`);
      }
  
      const data = await formResponse.json();
      setToken(data.token);
      console.log("Signup successful, token:", data.token);
  
      // Upload documents if not a Tourist
      if (role !== "Tourist") {
        const docsData = new FormData();
        docsData.append("id", selectedFiles.id);
  
        if (role === "Tour_Guide") {
          selectedFiles.certificates.forEach((file) => {
            docsData.append("certificates", file);
          });
        } else {
          docsData.append("taxationRegistryCard", selectedFiles.taxationRegistryCard);
        }
  
        const docsResponse = await fetch("http://localhost:4000/cariGo/users/upload-documents", {
          method: "POST",
          headers: { Authorization: `Bearer ${data.token}` },
          body: docsData,
        });
  
        if (!docsResponse.ok) {
          throw new Error(`Documents upload failed. Status: ${docsResponse.status}`);
        }
  
        console.log("Documents uploaded successfully:", await docsResponse.json());
      }
  
      // Upload photo if available
      if (postImage.file) {
        const imageData = new FormData();
        imageData.append("photo", postImage.file);
  
        const imageResponse = await fetch("http://localhost:4000/cariGo/users/photo", {
          method: "POST",
          headers: { Authorization: `Bearer ${data.token}` },
          body: imageData,
        });
  
        if (!imageResponse.ok) {
          throw new Error(`Photo upload failed. Status: ${imageResponse.status}`);
        }
  
        console.log("Photo uploaded successfully:", await imageResponse.json());
      }
      alert("Sign Up is Done Successfully")
      window.location.href = "/SignIn-Up";
    } catch (error) {
      console.error("Error during signup process:", error.message);
      alert("Signup failed: Please Check how to use tutorial" );
    }
  };
   
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
   const base64 = await convertToBase64(file);
  // console.log(base64);
   // setFormData({ ...formData,myFile:base64});
    setPostImage({myFile:base64,file:file})
  };








  
  return (
       
          
          <form onSubmit={handleSignUp} style={{marginTop:"-50px"}}> {/* Wrap in form */}
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
            <FormLabel htmlFor="name" style={{marginLeft:"-120px"}}>Username</FormLabel>
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
            <FormLabel htmlFor="password" style={{marginLeft:"-120px"}}>Password</FormLabel>
            <OutlinedInput
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="************"
              required
              minLength={6}
              size="small"
              onInvalid={(e) => {
                e.target.setCustomValidity("Password must be at least 6 characters long.");
              }}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            
          </FormGrid>
          <FormGrid size={{ xs: 12, md:8 }} style={{marginLeft:"-350px",marginTop:"20px",width:"200px"}}>
          <FormLabel htmlFor="passwordConfirm" style={{marginLeft:"-65px"}}> Confirm Password</FormLabel>
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
            <FormLabel htmlFor="email" style={{marginTop:"10px",marginLeft:"-150px"}}>Email</FormLabel>
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
            {(role==="Advertiser") &&<><FormLabel htmlFor="website_link" style={{marginTop:"10px",marginLeft:"-100px"}}>Website Link</FormLabel>
            <OutlinedInput
                  id="website_link"
                  name="website_link"
                  type="text"
                  placeholder='https://domain.com'
                  required
                  size="small"
                  onChange={handleChange}
                  value={formData.website_link}
                /></>}
                {(role==="Advertiser") &&<><FormLabel htmlFor="hotline" style={{marginTop:"10px",marginLeft:"-140px"}}>Hotline</FormLabel>
                <OutlinedInput
              id="hotline"
              name="hotline"
              
              placeholder="xxxxx"
              size="small"
              onChange={handleChange}
             value={formData.hotline}
            /></>}
            {(role==="Advertiser") &&<><FormLabel htmlFor="about" style={{marginTop:"10px",marginLeft:"-145px"}}>About</FormLabel>
            <textarea
                id='about'
                name="about" // Match with formData key
                placeholder="Type your long text here..."
                onChange={handleChange}
                value={formData.about} // Bind the value
                rows={4} // Set number of visible text rows
                style={{ width: '100%',borderColor:"black" }} // Make it full width
            /></>}
            </FormGrid>
            <FormGrid style={{marginLeft:"-5px",marginTop:"10px",width:"200px"}}>
            {(role==="Tourist") &&<><FormLabel htmlFor="country" style={{marginTop:"10px",marginLeft:"-135px"}}>Country</FormLabel>
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
            {(role==="Tourist") &&<><FormLabel htmlFor="DOB" style={{marginTop:"10px",marginLeft:"-100x"}}>Date of Birth</FormLabel>
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
            <FormGrid style={{marginLeft:"-5px",marginTop:"0px",width:"200px"}}>
            {(role==="Seller") &&(<><FormLabel htmlFor="sellerName" style={{marginTop:"-10px",marginLeft:"-100px"}}>Seller Name</FormLabel>
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
            {(role==="Seller") &&(<><FormLabel htmlFor="description" style={{marginTop:"10px",marginLeft:"-110px"}}>Description</FormLabel>
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
            
            
          </FormGrid>
           <FormGrid size={{ xs: 6 }} style={{marginLeft:"250px",width:"200px",marginTop:"260px"}}>
           
           
      
          </FormGrid>
          
                
        {role==="Tourist" && <div className="multi-select-container" style={{marginTop:"100px",marginLeft:"580px",width:"300px"}}>
      <div className="multi-select-dropdown" onClick={toggleDropdown}style={{marginTop:"-725px",marginLeft:"-500px",width:"300px"}}>
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
          {selectedOptions.length === 0 ? "Select Preferences..." : ""}
        </div>
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <ul className="dropdown-options" style={{marginTop:"0px",marginLeft:"-240px",width:"200px"}}>
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
    </div>}
   {(role === "Advertiser" || role === "Seller" || role==="Tour_Guide")&& <Sheet
        sx={{
          width: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          marginTop:`${mt}px`,
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Typography level="h4" component="h1">
          <b>Upload Documents</b>
        </Typography>
        <Typography level="body-sm">
          Upload your ID and additional documents based on your role.
        </Typography>

        
          {/* ID Document */}
          <FormControl>
            <FormLabel>ID Document</FormLabel>
            <input
              type="file"
              name="id"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
            />
          </FormControl>

          {/* Certificates (Tour Guide only) */}
          {role === "Tour_Guide" && (
          <FormControl>
            <FormLabel>Certificates (Tour Guide only)</FormLabel>
            <input
              type="file"
              name="certificates"
              multiple
              onChange={handleFileChange}
              accept=".pdf"
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
            />
          </FormControl>
          )}
       
          {/* Taxation Registry Card (Advertiser/Seller only) */}
          {(role === "Advertiser" || role === "Seller") && (
           <FormControl>
            <FormLabel>Taxation Registry Card (Advertiser/Seller only)</FormLabel>
            <input
              type="file"
              name="taxationRegistryCard"
              onChange={handleFileChange}
              accept=".pdf"
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
            />
          </FormControl> 
           )}

          {/* <Button sx={{ mt: 2 }} type="submit" color="primary" variant="contained">
            Upload Documents
          </Button> */}
          
        
      </Sheet>}
    <FormGrid size={{ xs: 6 }} style={{marginLeft:"-10px",marginTop:"80px",marginBottom:"-30px",height:"600px"}}>
          <TermsAndConditions/>
          </FormGrid>
          
          <FormControlLabel style={{marginTop:"-85px",marginLeft:"-280px"}}
            control={<Checkbox name="saveCard" required  checked={checked} onChange={()=>{setChecked(!checked);if(!checked)hStep(state+1);if(checked)hStep(state)}} />}
            label="Accept Terms & Conditions"
          />
          {/* Submit button */}
          <FormGrid size={{ xs: 12 }} style={{marginTop:"-10px",marginLeft:`${left}px`}}>
          { checked &&
                   (<Button type="submit" style={{marginTop:"40px",marginBottom:"40px"}}
                    variant="contained"
                    endIcon={(true) && <ChevronRightRoundedIcon />}
                    // onClick={handleSignUp}
                    fullWidth
                  
                    sx={{ width: { xs: "flex", sm: "fit-content" } }}
                  >
                    Register
                  </Button>
                )}
          </FormGrid>
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
  