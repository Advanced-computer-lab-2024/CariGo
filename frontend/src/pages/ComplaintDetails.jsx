import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Badge, Card } from 'antd';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    // Fetch complaint data based on ID
    // Mock data used for now
    setComplaint({
      id: id,
      title: 'Booking Issue',
      body: 'There was a problem with my booking.',
      status: 'Pending',
      date: '2024-10-01',
    });
  }, [id]);

  const handleStatusToggle = () => {
    // Toggle status and save to the server
    setComplaint((prev) => ({
      ...prev,
      status: prev.status === 'Pending' ? 'Resolved' : 'Pending',
    }));
  };

  if (!complaint) return <div>Loading...</div>;

  return (
    <Card title={`Complaint Details - ${complaint.title}`}>
      <p><strong>Date:</strong> {complaint.date}</p>
      <p><strong>Status:</strong> <Badge color={complaint.status === 'Resolved' ? 'green' : 'red'} text={complaint.status} /></p>
      <p><strong>Details:</strong> {complaint.body}</p>
      <Button type="primary" onClick={handleStatusToggle}>
        Mark as {complaint.status === 'Pending' ? 'Resolved' : 'Pending'}
      </Button>
      <Button type="default" onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
        Back
      </Button>
    </Card>
  );
};

export default ComplaintDetails;
