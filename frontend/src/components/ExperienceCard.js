import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExperienceCard = ({ experienceId }) => {
  // State to hold experience data
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch experience data based on experienceId
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`/api/experiences/${experienceId}`); // Adjust API endpoint as needed
        setExperience(response.data.data); // Assuming the API returns data in this structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [experienceId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching experience: {error}</p>;
  if (!experience) return <p>No experience found.</p>;

  return (
    <div className="experience-card">
      <img src={experience.image || "https://via.placeholder.com/200x200"} alt={experience.title} />
      <h3>{experience.title || 'Experience Title'}</h3>
      <p>{experience.work_description || 'No description available.'}</p>
      <p><strong>Company:</strong> {experience.company || 'N/A'}</p>
      <p><strong>Start Date:</strong> {new Date(experience.start_date).toLocaleDateString() || 'N/A'}</p>
      <p><strong>End Date:</strong> {new Date(experience.end_date).toLocaleDateString() || 'N/A'}</p>
    </div>
  );
};

export default ExperienceCard;
