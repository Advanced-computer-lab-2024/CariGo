import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { ToastContainer } from "react-toastify";
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
export default function FetchCategories() {
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('jwt')
  
  // Fetch categories function
  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getCategories",{
        headers:{
            authorization :`Bearer ${token}`
    }}); // Fetch from backend
      console.log(response.data); // Log the response data
      setCategories(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // useEffect to run fetchCategories when component mounts
  useEffect(() => {
    fetchCategories(); // Automatically fetch categories on mount
  }, []); // Empty dependency array means this runs once when the component mounts

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
      {loading && <p>Loading categories...</p>}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <strong>Name:</strong> {category.name} <br />
            <strong>Description:</strong> {category.description || "No description available"} {/* Accessing the description property */}
          </li>
        ))}
      </ul>
    </div>
 </Content>
</Layout>
</Layout>
  );
}