import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    // Fetch complaints data from an API or server
    // Mock data used for now
    setLoading(true);
    setComplaints([
      { id: 1, title: 'Booking Issue', status: 'Pending', date: '2024-10-01' },
      { id: 2, title: 'Payment Issue', status: 'Resolved', date: '2024-09-15' },
      // Add more mock data
    ]);
    setLoading(false);
  }, []);

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
      render: (text, record) => <Link to={`/complaints/${record.id}`}>{text}</Link>,
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
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default ComplaintsList;
