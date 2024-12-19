import React from "react";
import { Avatar } from "@mui/material";
import adv from "../../assets/adv.png";
import seller from "../../assets/seller.png";
import tourg from "../../assets/Tour.png";
//import Tooltip from "@mui/material";
import tourist from "../../assets/tourist.png";
import Tooltip from "@mui/material/Tooltip";
function SignUpForm({handleSignUp}) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { name, email, password } = state;
    alert(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };
 const handle = (data) =>{
  localStorage.setItem("role",data)
  console.log(data)
        handleSignUp(true)
 }
  return (
    <div className="form-container sign-up-container">
      <form className="form" onSubmit={handleOnSubmit}>
        <h1 className="h1">Create Account</h1>
        <h1 className="h1" style={{marginTop:"10px"}}>AS </h1>
        <div className="social-container" style={{gap:2}}> 
          
          <button onClick={()=>{localStorage.setItem("role","Advertiser");handleSignUp(true)}} id="Advertiser" className="social a" style={{marginRight:"40px"}}>
          <Tooltip title="Advertiser">
          <Avatar alt="A" sx={{ width: 56, height: 56 }} src={adv} />
          </Tooltip>
          </button>
         
          <button onClick={()=>handle("Seller")} id="Seller" className="social a" style={{marginRight:"40px"}}>
          <Tooltip title="Seller">
          <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={seller} />
          </Tooltip>
          </button>
          
          
          <button onClick={()=>handle("Tour_Guide")} id="Tour_Guide" className="social a" style={{marginRight:"40px"}}>
          <Tooltip title="Tour Guide">
          <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={tourg} />
          </Tooltip>
          </button>
          
          <button onClick={()=>handle("Tourist")}  className="social a" style={{marginRight:"40px"}}>
          <Tooltip title="Tourist">
          <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56,border:"2px",borderColor:"black" }} src={tourist} />
          </Tooltip>
          </button>
        </div>
        {/* <span className="span">or use your email for registration</span>
        <input className="input"
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input className="input"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        /> 
        <input className="input"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="button">Sign Up</button> */}
      </form>
    </div>
  );
}

export default SignUpForm;
