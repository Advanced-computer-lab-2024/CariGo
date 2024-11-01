import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Badge, Card, Input, List } from 'antd';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [reply, setReply] = useState(''); // State for new reply
  const [replies, setReplies] = useState([]); // State to hold all replies

  useEffect(() => {
    // Fetch complaint data based on ID
    setComplaint({
      id: id,
      title: 'Booking Issue',
      body: 'There was a problem with my booking.',
      status: 'Pending',
      date: '2024-10-01',
    });
    
    // Mock existing replies (replace with fetch request if needed)
    setReplies([
    ]);
  }, [id]);

  const handleStatusToggle = () => {
    // Toggle status and save to the server
    setComplaint((prev) => ({
      ...prev,
      status: prev.status === 'Pending' ? 'Resolved' : 'Pending',
    }));
  };

  const handleReplySubmit = () => {
    if (reply.trim()) {
      // Update the replies list
      const newReply = { id: Date.now(), content: reply, date: new Date().toISOString().split('T')[0] };
      setReplies((prev) => [...prev, newReply]);
      
      // Clear the reply input
      setReply('');
      
      // Here you would typically send the reply to the server
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
            <List.Item key={reply.id}>
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
