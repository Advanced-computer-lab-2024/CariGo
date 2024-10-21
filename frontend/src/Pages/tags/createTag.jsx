import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { ToastContainer } from "react-toastify";
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
export default function CreateTag() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('jwt')
  const handleCreateTag = async () => {
    try {
      const response = await axios.post("http://localhost:4000/Admin/createTag", { title },{
        headers:{
            authorization :`Bearer ${token}`
    }});
      toast.success(response.data.message); // Show success message
      setTitle(""); // Reset input field
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error creating tag"; // Access the message from error response
      toast.error(errorMessage); // Show error message
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
    <div>
      <h1>Create Tag</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tag Title"
        required
      />
      <button onClick={handleCreateTag}>Create</button>
    </div>
</Content>
</Layout>
</Layout>
  );
}
