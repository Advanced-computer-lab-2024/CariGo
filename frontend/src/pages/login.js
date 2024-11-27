import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Box from "@mui/material/Box";
import { Flex } from "antd";
export default function LoginPage() {
  localStorage.clear();
  // console.log(localStorage.getItem('jwt') +"         d")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    event.preventDefault();

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
      alert("Login failed: " + error.message);
    }
  };

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Button
          style={{ marginTop: "50px" }}
          variant="contained"
          startIcon={<ChevronLeftRoundedIcon />}
          onClick={() => navigate("/")}
          fullWidth
          primary
          sx={{ width: { xs: "flex", sm: "fit-content" } }}
        >
          Return
        </Button>
      </Box>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", // margin left & right
          my: 0, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1" sx={{color:'#126782'}}>
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmitLogin}>
          <FormControl>
            <FormLabel sx={{color:'#126782'}}>Username</FormLabel>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#126782', 
                  },},
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel sx={{color:'#126782'}}>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              required
              variant="outlined"
              // sx={{
              //   '& .MuiOutlinedInput-root': {
              //     '&.Mui-focused fieldset': {
              //       borderColor: '#126782', // Focused outline color
              //     },},
              // }}
            />
          </FormControl>
          <Button sx={{ mt: 1 ,backgroundColor:'#ff4d4d'}} type="submit" >
            Log in
          </Button>
        </form>
        <Typography
          endDecorator={"Sign UP Below"}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
        <Typography
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          continue without login <a href="/" onClick={()=> navigate("/")}>here</a>
        </Typography>
        {/* <Typography
          endDecorator={<Link href="/Register-Seller">Seller</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
        <Typography
          endDecorator={<Link href="/Register-Advertiser">Advertiser</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
        <Typography
          endDecorator={<Link href="/Register-TourGuide">Tour Guide</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>  */}
      </Sheet>
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          gap: "100px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "200px",
            height: "180px",
            borderRadius: "15px",
            border: "2px solid #126782",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              scale: "1.1",
              borderColor: "#ff4d4d",
              backgroundColor: "white",

              marginRight: "5px",
              "& .insideIcon": {
                fill: "#ff4d4d",
              },
            },
          }}
          onClick={() => navigate("/Register-Advertiser")}
        >
          <p
            className="insideIcon"
            fontSize="large"
            sx={{ scale: "3", fill: "#126782", margin: "30px" }}
          >
            Advertiser
          </p>
        </Button>

        <Button
          variant="outlined"
          sx={{
            width: "200px",
            height: "180px",
            borderRadius: "15px",
            border: "2px solid #126782",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              scale: "1.1",
              borderColor: "#ff4d4d",
              backgroundColor: "white",
              marginLeft: "5px",
              marginRight: "5px",
              "& .insideIcon": {
                fill: "#ff4d4d",
              },
            },
          }}
          onClick={() => navigate("/Register-Tourist")}
        >
          <p
            className="insideIcon"
            fontSize="large"
            sx={{ scale: "3", fill: "#126782", margin: "30px" }}
          >
            Tourist
          </p>
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "200px",
            height: "180px",
            borderRadius: "15px",
            border: "2px solid #126782",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              scale: "1.1",
              borderColor: "#ff4d4d",
              backgroundColor: "white",
              marginLeft: "5px",

              "& .insideIcon": {
                fill: "#ff4d4d",
              },
            },
          }}
          onClick={() => navigate("/Register-TourGuide")}
        >
          <p
            className="insideIcon"
            fontSize="large"
            sx={{ scale: "3", fill: "#126782", margin: "30px" }}
          >
            Tour Guide
          </p>
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "200px",
            height: "180px",
            borderRadius: "15px",
            border: "2px solid #126782",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              scale: "1.1",
              borderColor: "#ff4d4d",
              backgroundColor: "white",
              marginLeft: "5px",

              "& .insideIcon": {
                fill: "#ff4d4d",
              },
            },
          }}
          onClick={() => navigate("/Register-Seller")}
        >
          <p
            className="insideIcon"
            fontSize="large"
            sx={{ scale: "3", fill: "#126782", margin: "30px" }}
          >
            Seller
          </p>
        </Button>
      </Box>
    </main>
  );
}
