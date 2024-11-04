import React, { useState } from 'react';
import { FaPencilAlt, FaStickyNote, FaCalendarAlt } from 'react-icons/fa'; // Updated import for title icon

const FileComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate form submission
    setSuccessMessage('Your complaint has been successfully submitted!');

    // Clear form fields after submission (optional)
    setTitle('');
    setBody('');
    setDate('');

    // Set a timer to clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>File a Complaint</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label} htmlFor="title">
          <FaPencilAlt style={styles.icon} /> Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="body">
          <FaStickyNote style={styles.icon} /> Description
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={styles.textarea}
          required
        ></textarea>

        <label style={styles.label} htmlFor="date">
          <FaCalendarAlt style={styles.icon} /> Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Submit</button>
      </form>
      
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>} {/* Success message */}
    </div>
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
    display: 'flex', // Use flex to align icon and text
    alignItems: 'center', // Center vertically
  },
  icon: {
    marginRight: '8px', // Space between icon and label text
    color: '#2980b9', // Color for the icons
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
    height: '150px',
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
    color: '#27ae60', // Green color for success message
    textAlign: 'center',
  },
};

export default FileComplaintForm;