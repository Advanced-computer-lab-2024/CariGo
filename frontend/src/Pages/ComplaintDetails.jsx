import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Badge, Card, Input, List, message } from 'antd';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    // Fetch complaint data from the backend
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Admin/viewComplaint/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
        setComplaint(response.data.data.complaint);
        setReplies(response.data.data.complaint.replies || []);
      } catch (error) {
        console.error('Error fetching complaint:', error);
        message.error('Failed to load complaint details.');
      }
    };

    fetchComplaint();
  }, [id]);

  const handleStatusToggle = async () => {
    try {
      const updatedStatus = complaint.status === 'Pending' ? 'Resolved' : 'Pending';
      const response = await axios.patch(`http://localhost:4000/Admin/updateComplaintStatus/${id}`, { status: updatedStatus }, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
      setComplaint(response.data.data.complaint);
      message.success(`Complaint marked as ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update complaint status.');
    }
  };

  const handleReplySubmit = async () => {
    if (reply.trim()) {
      try {
        // Send the reply to the backend
        const response = await axios.post(`http://localhost:4000/Admin/replyToComplaint/${id}`, { reply }, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
        // Update the replies list with the new reply
        setReplies((prev) => [...prev, { content: reply, date: new Date().toISOString().split('T')[0] }]);
        setReply('');
        message.success('Reply submitted successfully.');
      } catch (error) {
        console.error('Error submitting reply:', error);
        message.error('Failed to submit reply.');
      }
    }
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
      
      <div style={{ marginTop: 20 }}>
        <h3>Replies</h3>
        <List
          dataSource={replies}
          renderItem={(reply) => (
            <List.Item key={reply.date}>
              <p><strong>Date:</strong> {reply.date}</p>
              <p>{reply.content}</p>
            </List.Item>
          )}
        />
        
        <Input.TextArea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          placeholder="Write your reply here..."
          style={{ marginTop: 10 }}
        />
        <Button type="primary" onClick={handleReplySubmit} style={{ marginTop: 10 }}>
          Submit Reply
        </Button>
      </div>
    </Card>
  );
};

export default ComplaintDetails;
