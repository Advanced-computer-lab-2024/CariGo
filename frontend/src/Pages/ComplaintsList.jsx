import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          "http://localhost:4000/Admin/viewAllComplaints",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        ); // Fetch complaints from backend
        console.log(response.data); // Log the response data
        setComplaints(response.data.data.complaints); // Set the complaints state
      } catch (error) {
        console.error("Error fetching complaints:", error);
        // Optionally handle error (e.g., show a notification)
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchComplaints();
  }, [token]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const filteredComplaints = complaints.filter((complaint) => 
    statusFilter ? complaint.status === statusFilter : true
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => <Link to={`/complaints/${record._id}`}>{text}</Link>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Badge color={status === 'Resolved' ? 'green' : 'red'} text={status} />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      defaultSortOrder: 'descend', // Optional: set a default sort order
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Select
          placeholder="Filter by Status"
          style={{ width: 150 }}
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="Pending">Pending</Option>
          <Option value="Resolved">Resolved</Option>
        </Select>
        <Search
          placeholder="Search complaints"
          style={{ width: 200 }}
          onSearch={(value) => console.log(`Searching for: ${value}`)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredComplaints}
        rowKey="_id" // Updated to use the correct key for complaints
        loading={loading}
      />
    </div>
  );
};

export default ComplaintsList;
