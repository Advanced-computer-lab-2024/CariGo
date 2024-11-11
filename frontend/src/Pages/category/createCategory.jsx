import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Layout, Spin } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem('jwt');

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/Admin/createCategory", {
        name,
        description,
      }, {
        headers: { authorization: `Bearer ${token}` }
      });

      setSuccessMessage("Category created successfully!");
      setName("");
      setDescription("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error creating category";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={256} style={{ background: '#001529' }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: '#001529', padding: 0 }}>
          <TopBar />
        </Header>
        <ToastContainer />
        <Content style={{ padding: '20px', overflowY: 'auto' }}>
          <div style={styles.container}>
            <h2 style={styles.heading}>Create Category</h2>
            <form onSubmit={handleCreateCategory} style={styles.form}>
              <label style={styles.label} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />

              <label style={styles.label} htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
              />

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? <Spin /> : "Create Category"}
              </button>
            </form>

            {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#34495e',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #bdc3c7',
    marginBottom: '20px',
    transition: 'border-color 0.3s',
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #bdc3c7',
    resize: 'vertical',
    height: '100px',
    marginBottom: '20px',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#2980b9',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  successMessage: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#27ae60',
    textAlign: 'center',
  },
};

export default CreateCategory;
