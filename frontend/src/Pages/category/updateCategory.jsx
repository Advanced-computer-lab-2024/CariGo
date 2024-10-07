import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { ToastContainer } from "react-toastify";
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
export default function UpdateCategory() {
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold the selected category for update
  const [newName, setNewName] = useState(""); // State to hold new name input
  const [newDescription, setNewDescription] = useState(""); // State to hold new description input

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getCategories",{
        headers:{
            authorization :`Bearer ${token}`
    }}); // Fetch categories from backend
      setCategories(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to select a category for updating
  const selectCategory = (category) => {
    setSelectedCategory(category); // Set the selected category for updating
    setNewName(category.name); // Pre-fill with current name
    setNewDescription(category.description); // Pre-fill with current description
  };
  const token = localStorage.getItem('jwt')
  // Function to update the selected category
  const updateCategory = async () => {
    if (!selectedCategory) return;

    try {
      await axios.put(`http://localhost:4000/Admin/updateCategory/${selectedCategory._id}`, {
        name: newName, // New name entered
        description: newDescription, // New description entered
      },
      {
        headers:{
            authorization :`Bearer ${token}`
    }});
      toast.success("Category updated successfully!"); // Show success message

      // After update, clear selected category and refresh the category list
      setSelectedCategory(null);
      setNewName("");
      setNewDescription("");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      const errorMessage = error.response?.data?.message || "Error updating category"; // Access the message from error response
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
      <h1>Update Categories</h1>

      {/* Display loading message while fetching categories */}
      {loading && <p>Loading categories...</p>}

      {/* Display list of categories */}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <strong>Name:</strong> {category.name} <br />
            <strong>Description:</strong> {category.description || "No description"} <br />
            <button onClick={() => selectCategory(category)}>Edit</button> {/* Select category for update */}
          </li>
        ))}
      </ul>

      {/* Form to update category */}
      {selectedCategory && (
        <div>
          <h2>Update Category: {selectedCategory.name}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent form submission refresh
              updateCategory(); // Call update function
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)} // Update name in state
                required
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)} // Update description in state
              />
            </label>
            <br />
            <button type="submit">Update Category</button>
          </form>
        </div>
      )}
    </div>
 </Content>
 </Layout>
 </Layout>
  );
}
