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

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
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
let flag = false
  export default function AddProductSeller() {
    const handle = () =>{
      navigate('/Seller')
 
    }
    const navigate = useNavigate()
    const [formData, setFormData] = useState({     
    name: '',
      description: '',
      price: '',
      quantity: '',
      author: `${localStorage.getItem('id')}`
    });
    const [postImage, setPostImage] = useState({ myFile:"" ,
      mainImage:""});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      flag = true
      //console.log(file);
     const base64 = await convertToBase64(file);
     console.log(base64);
      //setFormData({ ...formData,mainImage:file});
      setPostImage({myFile:base64,mainImage:file})
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('jwt')
        //const id = localStorage.getItem('id')
        console.log(formData)
        const response = await axios.post('http://localhost:4000/cariGo/products/createProduct', formData,{
            headers:{
                authorization :`Bearer ${token}`
        }});
        const id = response.data.data.product._id
        console.log(id)
        console.log(flag)
        if(flag){
        console.log(id)
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
      toast.success("Product Added Successfully"); // Show success toast
         setFormData({
          name: '',
          price: '',
          description: '',
          quantity: '',
          
        });
        setPostImage({
          myFile:'',mainImage:''
        })
       // navigate("/Seller")
  //  }
      } catch (err) {
        const errors = err.response?.data?.errors || [err.response?.data?.error || 'An error occurred'];
        errors.forEach((msg) => toast.error(msg)); // Show error toasts
      }
    };
  
    return (
        <Layout style={{ height: '100vh' }}>
      
       
            <Layout>
            <Header style={{ background: '#001529', padding: 0 }}>
               {/* Top bar added here */}
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
        <Button type="submit" variant="contained" onClick={handle} color="primary" style={{ marginTop: '16px' }}>
            Back
          </Button>
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