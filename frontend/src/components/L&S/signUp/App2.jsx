import React, { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import SignIn from "../../../Pages/SignUp/SignIn";
import SignInForm from "./SignIn";
import SignUpForm from "../SignUp";
import OTP from "./OTP";
import { useNavigate } from "react-router-dom";
import FormContainer from "./su";
import UserInformation from "../../../Pages/SignUp/components/UserInformation";
export default function Temp() {
  const [type, setType] = useState("signUp");
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
  
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [checked , setChecked] = useState(false);
  const [mess, setMess] = useState("To keep connected with us please provide us with your new password");
  //localStorage.setItem('role',"Tourist")
  
  //console.log(formData)
         // Set initial timer value (10 minutes in seconds)
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [finished,setFinished] = useState(false)
  useEffect(() => {
    // Stop the timer if timeLeft is 0
    if (timeLeft <= 0){
        setFinished(true)
        setMess("This Session is not Valid Anymore")
        return;
    }
    // Set up the interval to count down every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time in mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };   
  const handleMessage = (message)=>{
     
  }
  return (
    <div className="App body">
      
      <div className={containerClass} id="container" style={{marginTop:"50px",marginBottom:"100px"}}>
        { <OTP  message={handleMessage} finished={finished}/>}
        
         
        {!signUp &&<div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                {mess}
              </p>
              <div style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
      <p className="h1">Valid For: {formatTime(timeLeft)}</p>
    </div>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Guest!</h1>
              <p className="p">Enter your personal details and start journey with us</p>

              
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
