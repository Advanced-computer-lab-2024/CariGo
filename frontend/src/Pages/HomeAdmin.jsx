import React from 'react';
import './Home.css';  // If you want to add custom styles
import { Link } from 'react-router-dom';
import { UserOutlined, TagOutlined, FolderOutlined, ShoppingOutlined, CalendarOutlined } from '@ant-design/icons'; 
import UserActivityChart from './UserActivityChart';
const HomeAdmin = () => {
    return (
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome To Your Dashboard!</h1>
          <p>Manage your application efficiently and effectively.</p>
        </header>
        
        <section className="features">
          <h2>Features</h2>
          <div className="feature-cards">
            {/* Clickable card for Managing Accounts */}
            <Link to="/admin/manage-accounts" className="card">
              <UserOutlined className="card-icon" />
              <h3>Manage Accounts</h3>
              <p>View and manage user accounts.</p>
            </Link>

            {/* Clickable card for View Product */}
            <Link to="/admin/view-products" className="card">
              <ShoppingOutlined className="card-icon" /> {/* Use ShoppingOutlined for viewing products */}
              <h3>View Products</h3>
              <p>View and manage products.</p>
            </Link>
            {/* Clickable card for Edit Category */}
            <Link to="/edit-category" className="card">
              <FolderOutlined className="card-icon" />
              <h3>Edit Category</h3>
              <p>Organize and manage categories.</p>
            </Link>

            {/* Clickable card for Edit Preference Tags */}
            <Link to="/edit-tag" className="card">
              <TagOutlined className="card-icon" /> {/* Use TagOutlined for preferences */}
              <h3>Edit Preference</h3>
              <p>View and manage user preference tags.</p>
            </Link>

            {/* Clickable card for Edit Preference Tags */}
            <Link to="/admin-view-events" className="card">
              <CalendarOutlined className="card-icon" /> {/* Use TagOutlined for preferences */}
              <h3>View Events</h3>
              <p>View and manage Events on the system.</p>
            </Link>
          </div>
        </section>

        {/* Add the User Activity Chart */}
        <section className="chart-section">
          <UserActivityChart />
        </section>
      </div>
    );
};

export default HomeAdmin;