import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Table, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";

const FetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "No description available",
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
          <h1>View Categories</h1>
          {loading ? (
            <Spin tip="Loading categories..." />
          ) : (
            <Table columns={columns} dataSource={categories} rowKey="_id" />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default FetchCategories;
