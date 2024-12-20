import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { ToastContainer } from "react-toastify";
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
export default function ManageCategories() {
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('jwt')
  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getCategories",{
        headers:{
            authorization :`Bearer ${token}`
    }}); // Fetch from backend
      setCategories(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Admin/deleteCategory/${id}`,{
        headers:{
            authorization :`Bearer ${token}`
    }}); // Call delete endpoint
      toast.success("Category deleted successfully!"); // Show success message
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error deleting category:", error);
      const errorMessage = error.response?.data?.message || "Error deleting category"; // Access the message from error response
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
      <h1>Manage Categories</h1>
      {loading && <p>Loading categories...</p>}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </Content>
  </Layout>
  </Layout>
  );
}
