import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Box, Paper } from '@mui/material';
import { styled } from '@mui/material';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';

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

export default function AddTourismGovernor() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    about: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem('jwt')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/Admin/addTourismGovernor', formData,{
        headers:{
            authorization :`Bearer ${token}`
    }});
      toast.success(response.data.message); // Show success toast
      setFormData({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        about: '',
      });
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
      <h2 style={{ marginBottom: '10px' }}>Add Tourism Governor</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          type="text"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="about"
          label="About"
          value={formData.about}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Create Tourism Governor
        </Button>
      </form>
      {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> */}
    </FormContainer>
        </Content>
</Layout>
</Layout>
 );
}
