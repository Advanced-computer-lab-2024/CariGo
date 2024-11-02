import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Layout, Table, Spin, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import Sidebar from "../Sidebar";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { toast, ToastContainer } from "react-toastify";

const UpdateTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/Admin/getTags", {
        headers: { authorization: `Bearer ${token}` },
      });
      setTags(response.data);
    } catch (error) {
      toast.error("Error fetching tags.");
    } finally {
      setLoading(false);
    }
  };

  const selectTag = (tag) => {
    setSelectedTag(tag);
    setNewTitle(tag.title);
  };

  const updateTag = async () => {
    if (!selectedTag) return;

    try {
      await axios.put(
        `http://localhost:4000/Admin/updateTag/${selectedTag._id}`,
        { title: newTitle },
        { headers: { authorization: `Bearer ${token}` } }
      );
      toast.success("Tag updated successfully!");
      setSelectedTag(null);
      setNewTitle("");
      fetchTags();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating tag");
    }
  };

  const confirmDelete = (tag) => {
    setTagToDelete(tag);
    setIsModalVisible(true);
  };

  const deleteTag = async () => {
    if (!tagToDelete) return;
    try {
      await axios.delete(`http://localhost:4000/Admin/deleteTag/${tagToDelete._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      toast.success("Tag deleted successfully!");
      fetchTags();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting tag");
    } finally {
      setIsModalVisible(false);
      setTagToDelete(null);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) =>
        selectedTag && selectedTag._id === record._id ? (
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) =>
        selectedTag && selectedTag._id === record._id ? (
          <>
            <Button type="primary" onClick={updateTag} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={() => setSelectedTag(null)}>Cancel</Button>
          </>
        ) : (
          <Button type="link" onClick={() => selectTag(record)}>
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
          <h1>Update Tags</h1>
          {loading ? (
            <Spin tip="Loading tags..." />
          ) : (
            <Table columns={columns} dataSource={tags} rowKey="_id" />
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            title="Confirm Deletion"
            visible={isModalVisible}
            onOk={deleteTag}
            onCancel={() => setIsModalVisible(false)}
            okText="Yes, Delete"
            okButtonProps={{ danger: true }}
          >
            <p>
              Are you sure you want to delete the tag <strong>{tagToDelete?.title}</strong>?
            </p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateTags;
