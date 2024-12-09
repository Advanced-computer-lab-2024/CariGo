import React, { useState } from "react";
import "./styles.css";
import SignIn from "../../../Pages/SignUp/SignIn";
import SignInForm from "./SignIn";
import SignUpForm from "../SignUp";
import FormContainer from "./su";
export default function Sign() {
  const [type, setType] = useState("signIn");
  const [signUp,setSignUp] = useState(false)
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const handleSignUp = (data)=>{
    setSignUp(data)
  }
  return (
    <div className="App body">
      <h2 className="h1">Sign in/up Form</h2>
      <div className={containerClass} id="container" style={{marginTop:"50px",marginBottom:"100px"}}>
        {!signUp && <SignUpForm  handleSignUp={handleSignUp}/>}
        {!signUp &&<SignInForm />}
        {signUp && <SignIn role={localStorage.getItem('role')}/>}
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
              <h1 className="h1">Hello, Friend!</h1>
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
