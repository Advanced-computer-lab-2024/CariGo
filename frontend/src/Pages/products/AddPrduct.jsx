import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material';
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
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../Sidebar";
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import avatar from "../../assets/profilePic.png";
const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    maxWidth: 400,
    margin: '0 auto',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  }));
  const FormGrid = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));
  export default function AddProduct() {
    const [postImage, setPostImage] = useState({ myFile:"" ,
      mainImage:""});
    const [formData, setFormData] = useState({     
    name: '',
      description: '',
      price: '',
      quantity: '',
      mainImage:''
    });
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      //console.log(file);
     const base64 = await convertToBase64(file);
     console.log(base64);
      //setFormData({ ...formData,mainImage:file});
      setPostImage({myFile:base64,mainImage:file})
    };
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(formData)
        const token = localStorage.getItem('jwt')
        //formData.append('mainImage',postImage.file)
       // console.log(formData)
        const response = await axios.post('http://localhost:4000/cariGo/products/createProduct',JSON.stringify(formData),
          {
            headers:{
                authorization :`Bearer ${token}`,
                'Content-Type':'application/json'
        }}

      );

      const id = response.data.data.product._id;
      const image = new FormData();
      image.append('mainImage',postImage.mainImage)
      const imageResponse = await axios.patch(`http://localhost:4000/cariGo/products/updateProduct/${id}`, image,{
        headers:{
            authorization :`Bearer ${token}`
    
          }
        });
      //  if(response){
        console.log(response)
         toast.success("Product Added Successfully"); // Show success toast
         setFormData({
          name: '',
          price: '',
          description: '',
          quantity: '',
          //mainImage:''
        });
        setPostImage({
          myFile:'',mainImage:''
        })
      //   const  image = new FormData();
      //   image.append('photo',postImage.file);
      // //FormData image = new FormData(imageData.file);
      // //const token1 = localStorage.getItem('jwt')
      //   console.log(formData)
      //   const imageResponse = await axios.post('http://localhost:4000/cariGo/users/photo', image
      //     ,{
      //       headers:{
      //           authorization :`Bearer ${token}`
        
      //         }
      //       }
      //     );
      // //  if(response){
      //   console.log(imageResponse)

      // //console.log(response.json().username+"  res")
      // // Check if the response is okay
      // if (!imageResponse.ok) {
      //   if (imageResponse.status === 401) {
      //     throw new Error("Unauthorized: Incorrect Data");
      //   }
      //   throw new Error(`HTTP error! Status: ${imageResponse.status}`);
      // }
      // console.log("checked")
      // // Parse the JSON response
      // const bin = await imageResponse.json();
      // console.log("photo added successfully", bin); // Log success
  //  }
      } catch (err) {
        const errors = err.response?.data?.errors || [err.response?.data?.error || 'An error occurred'];
        errors.forEach((msg) => toast.error(msg)); // Show error toasts
      }
    };
  
    return (
        <Layout style={{ height: '100vh' }}>
      
        <Sider width={256} style={{ background: '#001529' }}>
              <Sidebar />
            </Sider>
            <Layout>
            <Header style={{ background: '#001529', padding: 0 }}>
                <TopBar /> {/* Top bar added here */}
              </Header>
              <ToastContainer />
              <Content style={{ padding: '20px', overflowY: 'auto' }}>
      <FormContainer>
        <h2 style={{ marginBottom: '10px' }}>Add Product</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormGrid size={{ xs: 12, md: 12 }} style={{ marginLeft: "130px" }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={ postImage.myFile?postImage.myFile:avatar} alt="Uploaded avatar" />
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
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="number"
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        
          <TextField
            type="number"
            name="quantity"
            label="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Create Product
          </Button>
        </form>
        {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> */}
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