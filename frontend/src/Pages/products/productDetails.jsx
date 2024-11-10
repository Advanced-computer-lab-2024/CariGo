import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Paper } from "@mui/material";
import avatar from "../../assets/profilePic.png";
import { styled } from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  useTheme,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import Sidebar from "../Sidebar";
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { useEffect } from "react";
const folderPics = `http://localhost:4000/public/img/products/`;
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: theme.shadows[5],
  maxWidth: 400,
  margin: "0 auto",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
}));
let pic = avatar
let form = false
let flag = false
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State to hold fetched tags
  const [loading, setLoading] = useState(false); // Loading state
  const [postImage, setPostImage] = useState({ myFile:"" ,
    mainImage:""});
  const handleChange = (e) => {
    form = true
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://localhost:4000/cariGo/products/${id}`
      ,{
        headers:{
            authorization :`Bearer ${localStorage.getItem('token')}`
    
          }
        }); // Fetch from backend
      setData(response.data); // Set the tags state
      
      
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Error fetching tags."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //         // Navigate to the desired page after 5 seconds
  //         navigate('/target-page');  // Replace with your target route
  //     }, 5000); // 5 seconds delay

  //     // Cleanup the timer if the component unmounts before the navigation occurs
  //     return () => clearTimeout(timer);
  // }, [navigate]);
  const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));
  console.log(data.mainImage)
  if(data.mainImage)
    pic = folderPics+data.mainImage
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const userId = localStorage.getItem("id");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
       
      console.log(data);
      if(form){
      await axios.patch(
        `http://localhost:4000/cariGo/products/updateProduct/${id}`,
        data, // Data should be the second argument
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ); // Headers should be the third argument
     
        }
        if(flag){
          const id = data._id;
      const image = new FormData();
      image.append('mainImage',postImage.mainImage)
      const imageResponse = await axios.patch(`http://localhost:4000/cariGo/products/updateProduct/${id}`, image,{
        headers:{
            authorization :`Bearer ${token}`
    
          }
        });
      //  if(response){
        console.log(imageResponse)
        }
        toast.success("Product updated successfully!"); // Show success message
        fetchTags(); // Refresh the tag list
    } catch (error) {
      console.error("Error updating tag:", error);
      const errorMessage =
        error.response?.data?.message || "Error updating tag"; // Access the message from error response
      toast.error(errorMessage); // Show error message
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    //console.log(file);
   const base64 = await convertToBase64(file);
   console.log(base64);
   flag = true
    //setData({ ...data,mainImage:String(file)});
    setPostImage({myFile:base64,mainImage:file})
    //pic = postImage.myFile
    
  };
  if(flag)
  pic = postImage.myFile
  //console.log(data.mainImage)
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar /> {/* Top bar added here */}
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <FormContainer>
            <h2 style={{ marginBottom: "10px" }}>Update Product</h2>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormGrid size={{ xs: 12, md: 12 }} style={{ marginLeft: "130px" }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={ pic} alt="Uploaded avatar" />
            </label>
            <input
              type="file"
              name="myFile"
              
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </FormGrid>
              <TextField
                type="text"
                name="name"
                label="Name"
                value={data.name || ""}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="number"
                name="price"
                label="Price"
                value={data.price || ""}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                type="number"
                name="quantity"
                label="Quantity"
                value={data.quantity || ""}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={data.description || ""}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Update Product
              </Button>
            </form>
            {/* <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> */}
          </FormContainer>
        </Content>
      </Layout>
    </Layout>
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