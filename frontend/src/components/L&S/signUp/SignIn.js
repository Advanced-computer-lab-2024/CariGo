//import { useState } from "react";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
//import { forgotPassword } from "../../../../../backend/controllers/authController";
function SignInForm() {
  const [reset,setReset] = useState(false)
  const [sign,setSign] = useState(true)
  const [url,setUrl] = useState("")
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
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (event) => {
    //formData.email=formData.username
    event.preventDefault();
    
     if(passwordForgotten){
      setReset(true)
      setSign(false)
      setPasswordForgotten(false)
     try{
      const response = await fetch("http://localhost:4000/cariGo/users/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Incorrect username or password");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      const parts = data.url.split("/");
      localStorage.setItem("code",parts[6])
      //localStorage.setItem('url',data.url)
      //setUrl(data.url) 
      const url = data.url
      localStorage.setItem("star",url)
      console.log(localStorage.getItem("star"))
      console.log(localStorage.getItem("code"))
      setPasswordForgotten(false)
      setSign(true) 
      // navigate('/admin');
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: " + error.message);
    }
     }

    else{
     
    try {
      const response = await fetch("http://localhost:4000/cariGo/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
        
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Incorrect username or password");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
       
      const data = await response.json();
      if (
        data.data.user.documentApprovalStatus === "Pending" &&(
        data.data.user.role === "Advertiser" ||
        data.data.user.role === "Tour_Guide" ||
        data.data.user.role === "Seller")
      )
        alert("You cannot logged in until your docs are approved");
      else if (data.data.user.documentApprovalStatus === "Rejected")
        alert("You cannot logged in as your docs are rejected");
      else {
        console.log("Login successful", data);

        const token = data.token;
        console.log(token);
        // Store the token in localStorage
        localStorage.setItem("jwt", token);
        localStorage.setItem("id", data.data.user._id);
        // console.log(formData.username)
        localStorage.setItem("username", formData.username);
        localStorage.setItem("role", data.data.user.role);

        const id = localStorage.getItem("id", data.data.user._id);
        console.log(id);
        switch (localStorage.getItem("role").toLocaleLowerCase()) {
          case "admin":
            navigate(`/admin`); // Redirect to "View All" page
            break;
          case "advertiser":
            navigate("/advertiser"); // Redirect to "Update" page
            break;
          case "tourist":
            navigate("/Tourist"); // Redirect to "Update" page
            break;
          case "toursim_governor":
            navigate("/myVintages"); // Redirect to "Update" page
            break;
          case "tour_guide":
            navigate("/tour_guide/itineraries"); // Redirect to "Create" page
            break;
          case "seller":
            navigate("/Seller"); // Redirect to "Delete" page
            break;
          default:
            navigate("/tgHome");
        }
      }
      // navigate('/admin');
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: Invalid Credentials");
    }   }
 
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
    setSign(false)
  }
  return (
    <div className="form-container sign-in-container">
      <form className="form" onSubmit={handleSubmitLogin}>
        <h1 className="h1" style={{marginBottom:"50px"}}>{sign?"Sign in":"OTP"}</h1>
        
        {sign &&<input className="input"
          type="username"
          placeholder= "Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />}
        {passwordForgotten &&<input className="input"
          type="Email"
          placeholder= "Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />}
        {(sign) &&<input className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />}
            
        {!passwordForgotten && <button  onClick={handleForgetPass} className="" style={{marginTop:"-6px",marginLeft:"130px",marginBottom:"40px"}}>
          {sign &&<span className="span" style={{marginLeft:"80px"}}>
          Forgot your password?</span>}</button>}
        {sign && <button className="button" type="submit" style={{marginTop:"20px"}}>{"Sign In"}</button>}
        {passwordForgotten && <button className="button" type="submit" style={{marginTop:"20px"}}>{"Send Email"}</button>}
          
      </form>
    </div>
  );
}

export default SignInForm;
