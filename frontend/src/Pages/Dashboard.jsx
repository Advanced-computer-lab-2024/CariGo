import React, { lazy, Suspense } from "react"; // Keep this line
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Combined imports from react-router-dom
import Loadable from "@loadable/component"; // Keep other necessary imports
import Home from "./HomeAdmin.jsx"; // Ensure this import is case-sensitive
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import { Layout } from "antd";
import ManageAccounts from "./ManageAccounts.jsx"; // Import your new component
import EditCategory from "./EditCategory.jsx";
import EditTag from "./EditTag.jsx";
import ViewCategories from "./category/viewCategories.jsx";
import UpdateCategories from "./category/updateCategory.jsx";
import CreateCategories from "./category/createCategory.jsx";
import DeleteCategories from "./category/deleteCategory.jsx";
import ViewTags from "./tags/viewTags.jsx";
import UpdateTag from "./tags/updateTag.jsx";
import CreateTag from "./tags/createTag.jsx";
import DeleteTag from "./tags/deleteTag.jsx";
import AddAdmin from "./accounts/addAdmin.jsx";
import AddGovernor from "./accounts/addGovernor.jsx";
import DeleteUser from "./accounts/deleteUser.jsx";
import ViewProducts from "./products/viewProducts.jsx";
import AdminViewEvents from "./AdminViewEvents.js";
const { Header, Sider, Content } = Layout;
const Dashboard = () => {
  const token = localStorage.getItem("jwt");
  console.log(token + " sas");

  return (
    // <Router>
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar /> {/* Top bar added here */}
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
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
            <Route path="/admin-view-events" element={<AdminViewEvents />} />
            {/* /* Add more routes as needed   */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
    //   </Router>
  );
};

export default Dashboard;
