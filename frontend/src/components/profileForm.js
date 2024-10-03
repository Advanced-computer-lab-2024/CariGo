import React, { useState } from 'react';

const ProfileForm = ({ profile, onSubmit }) => {
  const [formState, setFormState] = useState(profile || { companyName: '', website: '', description: '' });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="companyName" value={formState.companyName} onChange={handleChange} placeholder="Company Name" />
      <input name="website" value={formState.website} onChange={handleChange} placeholder="Website" />
      <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
