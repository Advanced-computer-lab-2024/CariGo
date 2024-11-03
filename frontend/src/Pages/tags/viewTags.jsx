import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Table } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../Sidebar';
import { Content, Header } from 'antd/es/layout/layout';
import TopBar from '../TopBar';
import { toast, ToastContainer } from "react-toastify";

const ViewTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/Admin/getTags", {
        headers: { authorization: `Bearer ${token}` }
      });
      setTags(response.data);
    } catch (error) {
      toast.error("Error fetching tags.");
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
          <h2>View Tags</h2>
          <Table
            dataSource={tags}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 10 }}
          >
            <Table.Column title="Title" dataIndex="title" key="title" />
          </Table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ViewTags;
