import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField,Paper} from '@mui/material';
import TouristNB from './components/TouristNavBar';
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
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import Sidebar from "../Sidebar";
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { useEffect } from 'react';
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
  
  export default function ViewProductTourist() {
  const {id} = useParams()
  const navigate=useNavigate()
    const [data, setData] = useState([]); // State to hold fetched tags
    const [loading, setLoading] = useState(false); // Loading state
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    // Fetch tags on component mount
    useEffect(() => {
      fetchTags();
    }, []);
    
    const fetchTags = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:4000/cariGo/products/${id}`); // Fetch from backend
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
  
   
    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          console.log(data)
          await axios.patch(`http://localhost:4000/cariGo/products/updateProduct/${id}`, data); // Call update endpoint
          toast.success("Product updated successfully!"); // Show success message
          fetchTags(); // Refresh the tag list
         
        } catch (error) {
          console.error("Error updating tag:", error);
          const errorMessage = error.response?.data?.message || "Error updating tag"; // Access the message from error response
          toast.error(errorMessage); // Show error message
        }
      
    };
    
    return (
        <Layout style={{ height: '100vh' }}>
      
        
            <Layout>
            <Header style={{ background: '#001529', padding: 0 }}>
                <TouristNB/>{/* Top bar added here */}
              </Header>
              <ToastContainer />
              <Content style={{ padding: '20px', overflowY: 'auto' }}>
      <FormContainer>
        <h2 style={{ marginBottom: '10px' }}>Update Product</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            type="text"
            name="name"
            label="Name"
            value={data.name || ""}
            onChange={handleChange}
            required
            disabled
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
            disabled
            margin="normal"
          />
        
          <TextField
            type="number"
            name="quantity"
            label="Quantity"
            value={data.quantity || ""}
            onChange={handleChange}
            required
            disabled
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
            disabled
            margin="normal"
            multiline
            rows={4}
          />
          
        </form>
        {/* <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> */}
      </FormContainer>
      </Content>
    </Layout>
    </Layout>
    );
  }
  