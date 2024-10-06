import React, { lazy, Suspense } from 'react'; // Keep this line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Combined imports from react-router-dom
import Loadable from '@loadable/component'; // Keep other necessary imports
import Home from './Pages/home';  // Ensure this import is case-sensitive
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Pages/Sidebar';
import TopBar from './Pages/TopBar';
import { Layout } from 'antd';
import ManageAccounts from './Pages/ManageAccounts'; // Import your new component
import EditCategory from './Pages/EditCategory';
import EditTag from './Pages/EditTag';
import ViewCategories from './Pages/category/viewCategories';
import UpdateCategories from './Pages/category/updateCategory';
import CreateCategories from './Pages/category/createCategory';
import DeleteCategories from './Pages/category/deleteCategory';
import ViewTags from './Pages/tags/viewTags';
import UpdateTag from './Pages/tags/updateTag';
import CreateTag from './Pages/tags/createTag';
import DeleteTag from './Pages/tags/deleteTag';
import AddAdmin from './Pages/accounts/addAdmin';
import AddGovernor from './Pages/accounts/addGovernor';
import DeleteUser from './Pages/accounts/deleteUser';

const { Header, Sider, Content } = Layout;
const App = () => {
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Sider width={256} style={{ background: '#001529' }}>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ background: '#001529', padding: 0 }}>
            <TopBar /> {/* Top bar added here */}
          </Header>
          <ToastContainer />
          <Content style={{ padding: '20px', overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage-accounts" element={<ManageAccounts />} />
              <Route path="/edit-category" element={<EditCategory />} />
              <Route path="/edit-tag" element={<EditTag />} />
              <Route path="/view-categories" element={<ViewCategories />} />
              <Route path="/update-categories" element={<UpdateCategories />} />
              <Route path="/create-categories" element={<CreateCategories />} />
              <Route path="/delete-categories" element={<DeleteCategories />} />
              <Route path="/view-tags" element={<ViewTags />} />
              <Route path="/update-tag" element={<UpdateTag />} />
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/delete-tag" element={<DeleteTag />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-governor" element={<AddGovernor />} />
              <Route path="/delete-User" element={<DeleteUser />} />
     {/* Add more routes as needed */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;