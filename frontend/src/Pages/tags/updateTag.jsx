import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { ToastContainer } from "react-toastify";
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
export default function ManageTags() {
  const [tags, setTags] = useState([]); // State to hold fetched tags
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getTags",{
        headers:{
            authorization :`Bearer ${token}`
    }}); // Fetch from backend
      setTags(response.data); // Set the tags state
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Error fetching tags."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const token = localStorage.getItem('jwt')
  const updateTag = async (id) => {
    const newTitle = prompt("Enter new title for the tag:"); // Prompt for new title
    if (newTitle) {
      try {
        console.log(newTitle)
        await axios.put(`http://localhost:4000/Admin/updateTag/${id}`, { title: newTitle },{
          headers:{
              authorization :`Bearer ${token}`
      }}); // Call update endpoint
        toast.success("Tag updated successfully!"); // Show success message
        fetchTags(); // Refresh the tag list
      } catch (error) {
        console.error("Error updating tag:", error);
        const errorMessage = error.response?.data?.message || "Error updating tag"; // Access the message from error response
        toast.error(errorMessage); // Show error message
      }
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
      <h1>Update Tags</h1>
      {loading && <p>Loading tags...</p>}
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            {tag.title}
            <button onClick={() => updateTag(tag._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  </Content>
  </Layout>
  </Layout>
  );
}
