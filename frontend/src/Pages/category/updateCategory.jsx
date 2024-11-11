import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Layout, Table, Button, Input, Spin, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Sidebar from "../Sidebar";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/Admin/getCategories", {
        headers: { authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setNewName(category.name);
    setNewDescription(category.description || "");
  };

  const updateCategory = async () => {
    if (!selectedCategory) return;

    try {
      await axios.put(
        `http://localhost:4000/Admin/updateCategory/${selectedCategory._id}`,
        { name: newName, description: newDescription },
        { headers: { authorization: `Bearer ${token}` } }
      );
      toast.success("Category updated successfully!");
      setSelectedCategory(null);
      setNewName("");
      setNewDescription("");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setIsModalVisible(true);
  };

  const deleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await axios.delete(`http://localhost:4000/Admin/deleteCategory/${categoryToDelete._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category");
    } finally {
      setIsModalVisible(false);
      setCategoryToDelete(null);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) =>
        selectedCategory && selectedCategory._id === record._id ? (
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) =>
        selectedCategory && selectedCategory._id === record._id ? (
          <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        ) : (
          text || "No description"
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) =>
        selectedCategory && selectedCategory._id === record._id ? (
          <>
            <Button type="primary" onClick={updateCategory} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={() => setSelectedCategory(null)}>Cancel</Button>
          </>
        ) : (
          <Button type="link" onClick={() => selectCategory(record)}>
            Edit
          </Button>
        ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => confirmDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar />
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <h1>Update Categories</h1>
          {loading ? (
            <Spin tip="Loading categories..." />
          ) : (
            <Table columns={columns} dataSource={categories} rowKey="_id" />
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            title="Confirm Deletion"
            visible={isModalVisible}
            onOk={deleteCategory}
            onCancel={() => setIsModalVisible(false)}
            okText="Yes, Delete"
            okButtonProps={{ danger: true }}
          >
            <p>
              Are you sure you want to delete the category <strong>{categoryToDelete?.name}</strong>?
            </p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateCategory;
