import React, { useState } from 'react';

const ProfileForm = ({ profile, onSubmit }) => {
  const [formState, setFormState] = useState(profile || { companyName: '', website: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.companyName) newErrors.companyName = 'Company Name is required';
    if (!formState.website) {
      newErrors.website = 'Website is required';
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formState.website)) {
      newErrors.website = 'Enter a valid URL';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(formState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="companyName"
          value={formState.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        />
        {errors.companyName && <span>{errors.companyName}</span>}
      </div>

      <div>
        <input
          type="url"
          name="website"
          value={formState.website}
          onChange={handleChange}
          placeholder="Website"
        />
        {errors.website && <span>{errors.website}</span>}
      </div>

      <div>
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <button type="submit" disabled={!formState.companyName || !formState.website}>Submit</button>
    </form>
  );
};

export default ProfileForm;
