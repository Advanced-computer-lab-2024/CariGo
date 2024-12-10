import React, { useState } from "react";
import "./styles.css";
import SignIn from "../../../Pages/SignUp/SignIn";
import SignInForm from "./SignIn";
import SignUpForm from "../SignUp";
import { useNavigate } from "react-router-dom";
import FormContainer from "./su";
import UserInformation from "../../../Pages/SignUp/components/UserInformation";
export default function Sign() {
  const [type, setType] = useState(localStorage.getItem('s'));
  const [signUp,setSignUp] = useState(false)
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const role = localStorage.getItem('role')
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);
     const [tags,setTags] = useState([])
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
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const handleSignUp1 = (data)=>{
    setSignUp(data)
  }
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
  //localStorage.setItem('role',"Tourist")
  
  //console.log(formData)
           
  const handleDocsSubmit = (data) =>{
    setSelectedFiles(data)
     console.log("From Docs recieved: ",data)
     //setActiveStep(activeStep + 1);
  }
  const handlePreferencesSubmit = (data) => {
    if(role==="Tourist"){
    console.log("Form Preferences Received:", data);
    setFormData((prevFormData) => ({ ...prevFormData, selectedTags: data })); // Use functional update to ensure consistency
    }// setActiveStep(activeStep + 1);
  };
  const handleFormSubmit = (data) => {
    console.log("Form Data Received:", data);
    setFormData(data); // Store or process form data
    //setActiveStep(activeStep + 1);
  };
  const handleImageSubmit = (data) => {
    console.log("Image Data Received:", data);
    setImageData(data); // Store or process form data
    //setActiveStep(activeStep + 1);
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
      
      
      window.location.href = "/SignIn-Up";
    }catch (error) {
      console.error("Error:", error.message); // Log the error in console
      alert("signup failed: " + error.message); // Show alert to the user
    }
    
  };
  const handleUrl = () =>{

  }
  return (
    <div className="App body">
      
      <div className={containerClass} id="container" style={{marginTop:"100px",marginBottom:"100px"}}>
        {!signUp && <SignUpForm  handleSignUp={handleSignUp1}/>}
        {!signUp &&<SignInForm url={handleUrl} />}
        {signUp && <SignIn
            onFormSubmit={handleFormSubmit}
            onImageSubmit={handleImageSubmit}
            onDocsSubmit={handleDocsSubmit}
            onPreferencesSubmit={handlePreferencesSubmit}
            role={role}
            data={formData}
            image={imageData}
          />
     }
         
        {!signUp &&<div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost button"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Guest!</h1>
              <p className="p">Enter your personal details and start journey with us</p>
              <button
                className="ghost  button"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
