//import { useState } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//import { forgotPassword } from "../../../../../backend/controllers/authController";
function OTP(message,finished) {
    
  const [reset,setReset] = useState(false)
  const [m,setM] = useState("Your Password has been reset Successfully")
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  localStorage.clear();
  // console.log(localStorage.getItem('jwt') +"         d")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email:"",
    passwordConfirm:""
  });
 // console.log(finished)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const location = useLocation();
  const handleSubmitLogin = async (event) => {
    //formData.email=formData.username
    const queryParams = new URLSearchParams(location.search);
    event.preventDefault();
    if(!reset){
        const param1 = queryParams.get("resetPasswordUrl");
      console.log(param1)
      try{
        if(param1){
        const response = await fetch(`${param1}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
          console.log(response)
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Incorrect username or password");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
    
        const data = await response.json();
        //message(m)
        setReset(true)
        //console.log(localStorage.getItem('url'))
        //setSign(true)
        formData.email=""
        formData.username=""
        formData.password=""
       // alert("reset password Successfully")
        formData.passwordConfirm=""
      }} catch (error) {
        console.error("Error:", error.message);
        alert("Password Mismatch Or Invalid Password");
      }
    }
    
    
    

 
  };

  const [passwordForgotten,setPasswordForgotten] = useState(false);
  // const handleChange = evt => {
  //   const value = evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value
  //   });
  // };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };
  const handleForgetPass = () =>{
    setPasswordForgotten(true)
    //setSign(false)
  }
  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={handleSubmitLogin}>
        <h1 className="h1" style={{marginBottom:"50px"}}>{!reset?"OTP":"Your Password has been reset Successfully"}</h1>
        
        
       
        {(!finished || !reset) &&<input className="input"
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />}
            {(!finished ||  !reset) &&<input className="input"
          type="password"
          placeholder="password Confirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />}
        
        
        {(!reset || !finished) && <button className="button" onClick={handleSubmitLogin} style={{marginTop:"20px"}}>{"Reset Password"}</button>}
      </form>
    </div>
  );
}

export default OTP;
