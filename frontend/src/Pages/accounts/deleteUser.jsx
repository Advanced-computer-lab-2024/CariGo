import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';

export default function DeleteAccount() {
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('jwt')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/Admin/deleteUser',{username},{
        headers:{
            authorization :`Bearer ${token}`
    }});
      toast.success(response.data.message); // Show success toast
    } catch (err) {
      toast.error(err.response?.data?.error || 'An error occurred'); // Show error toast
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
    <Sider width={256} style={{ background: '#001529' }}>
          <Sidebar />
        </Sider>
        <Layout>
        <Header style={{ background: '#001529', padding: 0 }}>
            <TopBar/> {/* Top bar added here */}
            
          </Header>
          <ToastContainer />
          <Content style={{ padding: '20px', overflowY: 'auto' }}>
    <div style={styles.container}>
      <h1 style={styles.title}>Delete Account</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formField}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Delete Account</button>
      </form>
      {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> */}
    </div>
    </Content>
    </Layout>
    </Layout>
  );
}

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '40px 20px',
    backgroundColor: '#f4f4f4',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  formField: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#ff5733',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

