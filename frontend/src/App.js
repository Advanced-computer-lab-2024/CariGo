
import "./styles/App.css";

import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure

import UserViewItineraries from "./pages/UserViewItineraries";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./pages/ItineraryDetails";
import CreateItineraryForm from "./components/CreateItineraryForm";
import AllItineraries from "./pages/AllItineraries";
import UserItinDetails from "./pages/UserItinDetails";
import TourGuideProfile from "./pages/TourGuideProfile";

import './styles/index.css';

import UserViewActivities from './pages/UserViewActivities';
import AdminHome from './pages/Home';
import React, { lazy, Suspense } from 'react'; // Keep this line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Combined imports from react-router-dom
import Loadable from '@loadable/component'; // Keep other necessary imports
import Home from './pages/Home.js';  // Ensure this import is case-sensitive
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './pages/Sidebar';
import TopBar from './pages/TopBar';
import { Layout } from 'antd';
import ManageAccounts from './pages/ManageAccounts.jsx'; // Import your new component
import EditCategory from './pages/EditCategory';
import EditTag from './pages/EditTag';
import ViewCategories from './pages/category/viewCategories';
import UpdateCategories from './pages/category/updateCategory.jsx';
import CreateCategories from './pages/category/createCategory';
import DeleteCategories from './pages/category/deleteCategory';
import ViewTags from './pages/tags/viewTags';
import UpdateTag from './pages/tags/updateTag';
import CreateTag from './pages/tags/createTag';
import DeleteTag from './pages/tags/deleteTag';
import AddAdmin from './pages/accounts/addAdmin';
import AddGovernor from './pages/accounts/addGovernor';
import DeleteUser from './pages/accounts/deleteUser';
import LoginPage from './pages/login.js';
import SignUp from './pages/Signup';
import { jwtDecode } from 'jwt-decode';
import CreateActivityForm from "./pages/CreateActivityForm";
import TouristProfile from "./pages/Tourist/TouristProfile";
import TouristGuestHome from "./pages/Tourist-Guest/TouristGuestHome";
import TouristHome from "./pages/Tourist/TouristHome";
import GuestHome from "./pages/Guest/GuestHome";
import TouristActivities from './pages/Tourist/TouristActivities.js';
import GuestActivities from './pages/Guest/GuestActivities.js';
import NavBar from "./components/NavBar";
import UserViewVintages from "./pages/UserViewVintages";
import VintageDetails from "./pages/VintageDetails";
import TouristViewVintage from "./pages/TouristViewVintage";
import UserVintageDetails from "./pages/UserVintageDetails";
import Dashboard from "./pages/Dashboard";
import ViewProducts from "./pages/products/viewProducts.jsx";
import ManageProducts from "./pages/products/ManageProducts.jsx";
import AddProduct from "./pages/products/AddPrduct.jsx";
import ProductDetails from "./pages/products/productDetails.jsx";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./AuthAdmin.js";

function App() {
  const token = localStorage.getItem("jwt");
 // const navigate = useNavigate();
  // Decode the token safely
  let userId;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Assuming the id is in the decoded token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  else{

    console.log(2)
    // return navigate("/login")
  }
  return (
  //  <AuthProvider>
    <Router>
    <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
      <Route
        path="tour_guide/profile"
        element={<TourGuideProfile userId={localStorage.getItem("id")} />}
      />
      <Route path="tour_guide/itineraries" element={<UserViewItineraries />} />
      <Route path="tour_guide/itineraries/:id" element={<ItineraryDetails />} />
      <Route
        path="tour_guide/itineraries/new"
        element={<CreateItineraryForm />}
      />
      <Route
        path="tour_guid/itineraries/:id/edit"
        element={<ItineraryUpdate />}
      />
      <Route path="/user_itineraries" element={<AllItineraries />} />
      <Route path="/user_itineraries/:id" element={<UserItinDetails />} />
        {<Route path="/activities" element={<UserViewActivities />} /> }
        <Route path="/tourist-activities" element={<TouristActivities/>} />
        <Route path="/guest-activities" element={<GuestActivities/>} />
        <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} /> 
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tourist" element={<TouristProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tgHome" element={<TouristGuestHome/>} />
        <Route path="/touristHome" element={<TouristHome/>} />
        <Route path="/guestHome" element={<GuestHome/>} />
        <Route path="/activities/update/:id" element={<updateActivityForm/>} />
        <Route path="/myVintages" element={<UserViewVintages />} />
        <Route path="/vintage/:id" element={<VintageDetails />} />
        <Route path="/allVintages" element={<TouristViewVintage />} />
        <Route path="/viewingAllvintage/:id" element={<UserVintageDetails />} />
        <Route element={< ProtectedRoute/>}>
        <Route path="/admin" element={<Dashboard/> } />
        <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
              <Route path="/edit-category" element={<EditCategory />} />
              <Route path="/edit-tag" element={<EditTag />} />
              <Route path="/view-categories" element={<ViewCategories />} />
              <Route path="/update-categories" element={<UpdateCategories />} />
              <Route path="/create-categories" element={<CreateCategories />} />
              <Route path="/delete-categories" element={<DeleteCategories />} />
              <Route path="/view-tags" element={<ViewTags />} />
              <Route path="/admin/manage-products" element={<ManageProducts />} />
              <Route path="/admin/manage-products/AddProduct" element={<AddProduct/>} />
              <Route path="/admin/manage-products/product-Details/:id" element={<ProductDetails/>} />
              <Route path="/update-tag" element={<UpdateTag />} />
              <Route path='/admin/view-products' element={<ViewProducts/>}/>
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/delete-tag" element={<DeleteTag />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-governor" element={<AddGovernor />} />
              <Route path="/delete-User" element={<DeleteUser />} /> 
       
        </Route>
        {/* Add more routes as needed */}
      </Routes>
      </Router>
     // </AuthProvider>
  );
}

export default App;
