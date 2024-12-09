# Carigo
A virtual trip planner to make your travels easier and help you book everything in one place

## Table of Contents
- [Motivation](#Motivation)
- [Build Status](#Build-Status)
- [Code Style](#Code-Style)
- [Frameworks used](#Frameworks-used)
- [Features & Screenshots](#features--screenshots)
- [Code Examples](#Code-Examples)
- [Installation](#Installation)
- [API References](#API-References)
- [Tests](#Tests)
- [How to Use](#How-to-Use)
- [Contribute](#Contribute)
- [Credits](#Credits)
- [License](#License)
## Motivation
want to plan you next trip without gettign a major headache?
with Carigo you can plan and book everything in your trip from activites near your destination to your plane tickets in one place!!

## Build Status
this project is still under development and not publishable to the public

## Code Style
the project is split among 2 folder
1. **frontned**
    this folder has everything related to the clients side and is split into
    - **components:** folder with most of the website front end componentns
    - **Pages:** folder that has all the .js files that are full pages on the website
        - some folders inside the pages folder have a sub components folder that has components specific to these folders
    - **assets :** this folder is used to hold any images used inside our frontend
2. **backend**
    this is where the server side is handled and it si split into a few main folders
    - **controllers :** this has the controllers for all the main elements of our project and where all the code for the API functions is written
    - **routes :** the folder that handles creating routes for all API functions created inside controllers
    - **models :** contains the database models for all pur database elements 
    - **middleware:** used to hold the code for anu authentication procees required
    - **public/img :** a folder used to hold all the uploaded images / documents for admin approval
    - **utils :**  contains functions that help controllers in things such as error checking and sending emails
    3. **We use [Prettier](https://prettier.io/)** to enforce a consistent code style.

<details>
<summary>Useful Commands</summary>

### Useful Commands

- Check formatting using Prettier

```bash
npm run format
```

- And then fix formatting using Prettier

```bash
npm run format:fix
```
</details>
## Screenshots

## Frameworks-used
#### MERN stack
- **MonogDB:** MongoDB is used to host our server.
- **Express:** Express is used to interface our back and front ends. 
- **React:** React.js is used to build our website frontend.
- **Node:** Node.js is used as our backend runtime environment in Javascript. 
- **postman :** postman was used to test our routes before implementing them into frontend

#### Frontend Libraries 
- **Material UI (6.1.9):** we use mui as alot of its built in components are easier to use than HTML
- **joy :** to validate user inputs
- basic HTML components
- **jwt-decode**: to decode user token to get user id when needed
#### Backend Libraries 
- **bcrypt:** was used for hashing and unhashing of passwords and authentication perposes
- **dotenv:** to get data for the .env file to avoid exposing private keys
- **node-schedule**: was used for tasks that need scheduling like checking daily for birhdays and notifications
- **nodemon**: in order to recompile the code each time a modification was made
#### User Communication 
- **nodeMailer**: was used to send emails
#### Payment 
- **stripe**: was used to handle card payments
- **exchangerate-api.com**: was user for currency conversion
#### HTTP client 
- **Axios**: to handle communication between frotend and backend


## Features & Screenshots
##### filter through and scroll into endless choices of activites to add to oyur next trip!!

![Screenshot 2024-12-09 035654](https://hackmd.io/_uploads/B1JgXR7Nyx.png)


##### manage and edit everything smoothly with our easy to use admin home layout !

![Screenshot (2645)](https://hackmd.io/_uploads/rJRRD0mNJg.png)


## Code Examples
<details>
<summary>Routes Example</summary>

```js
const adminRouter= require("./routes/adminRouter.js");
const productRouter = require("./routes/productRouter.js");
const experienceRouter = require("./routes/experienceRouter");
const amadusRouter = require("./routes/amadusRouter.js");
const transportationRouter = require("./routes/transportationRouter.js");
const purchaseRouter = require("./routes/purchaseRouter.js");
const DeleteRequestRouter = require("./routes/deleteRequestRouter.js");
const notificationRoutes = require('./routes/notificationRouter.js');
const salesReportRouter = require("./routes/salesReportRouter.js");
```

</details>

<details>
<summary>Controller Example</summary>

```js
const Tourist = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.getAllTourists = factory.getAllSpecificUsers("Tourist");

exports.getTourist = factory.getOne(Tourist, {});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Give error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword. 🔑🚫",
        400
      )
    );
  }

  if (req.body.wallet) {
    return next(
      new AppError("You can't change your balance manualy. 🔑🚫", 400)
    );
  }

  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "username", "email");

  // Update user document
  const updatedTourist = await Tourist.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      tourist: updatedTourist,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteTourist = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

```

</details>

<details>
<summary>Create Product Example</summary>

```js

const createProduct = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
  const userType = await userModel.findOne({ _id: userId }); // Project only 'roles' field
  if (!userType) {
    return res.status(404).json({ message: "user not found" });
  }
  const role = userType.role.toLowerCase();
  console.log(role);
  if (role == "seller") {
    console.log("inside seller");
    const authorId = new mongoose.Types.ObjectId(req.body.author); // Convert to ObjectId
    const { name, picture, price, description, ratings, reviews, quantity } =
      req.body;
    try {
      const product = await productModel.create({
        author: authorId, // Use the ObjectId for author,
        name,
        picture,
        price,
        description,
        ratings,
        reviews,
        quantity,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }
};
```

</details>

<details>
<summary>Model Example</summary>

```js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['flagged_content', 'booking_opened', 'upcoming_event', 'out_of_stock',"promo_code"],
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contentModel'
  },
  contentModel: {
    type: String,
    enum: ['Itinerary', 'Activity', 'Product',"PromoCode"],
    required: function() { return this.contentId != null; }
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  scheduledFor: {
    type: Date
  },
  emailSent: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

notificationSchema.index({ userId: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
```

</details>

<details>
<summary>user Validator Example</summary>

```js
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Joi = require("joi");

// Define Joi validation schemas for base user fields and each role
const baseUserValidationSchema = Joi.object({
  username: Joi.string().min(2).max(15).required().messages({
    "string.min": "Username must be at least 2 characters long.👤",
    "string.max": "Username must be at most 15 characters long. 👤",
    "any.required": "Username is a required field. 👤",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address. 📧",
    "any.required": "Email is a required field. 📧",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long. ❌❗",
    "any.required": "Password is a required field.❌❗",
  }),
  passwordConfirm: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.❌❗",
    "any.required": "Password confirmation is a required field.❌❗",
  }),
  role: Joi.string()
    .valid(
      "Admin",
      "Tourist",
      "Tour_Guide",
      "Advertiser",
      "Seller",
      "Tourism_Governer"
    )
    .required()
    .messages({
      "any.only": "Role must be one of the following: Admin, Tourist, Tour Guide, Advertiser, Seller, Tourism Governer. 👤",
      "any.required": "Role is a required field. 👤",
    }),
});
})
```

</details>

<details>
<summary>authentication middelware Example</summary>

```js
import { jwtDecode } from "jwt-decode";



const authenticateToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) return res.sendStatus(401); // If there's no token, respond with 401

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, respond with 403 Forbidden
        req.user = user; // Attach the user information to the request object
        // next(); // Call the next middleware or route handler
    });
};

exports.authenticateToken = authenticateToken;
```

</details>

<details>
<summary>list of all itineraries react example</summary>

```js
import React from "react";
// import ReactDOM from "react-dom/client";
import "../styles/index.css";
import NavBar from "../components/NavBarTourist";
import { Box } from "@mui/material";
import ItineraryList from "../components/ItirenaryList";
import CreateActivityForm from "../components/CreateActivityForm";
import CreateItineraryForm from "../components/CreateItineraryForm";
import ListOfItineraries from "../components/ListOfItineraries";

const AllItineraries = () => {
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          width: "1150px",
          overflow: "hidden",
          margin: "0 auto",
          padding: "20px",
          height: "80vh", // Set a fixed height for the scrolling area
          overflow: "auto", // Enable scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar for WebKit browsers (Chrome, Safari)
          },
          //backgroundColor : "aquamarine" ,
        }}
      >
        <Box
          sx={{
            height: "100%",
            marginLeft: "100px",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {" "}
          {/* Enable vertical scrolling only */}
          <ListOfItineraries />
        </Box>
      </Box>
    </div>
  );
};

export default AllItineraries;

```

</details>

<details>
<summary>app routing Example in react</summary>

```js

function App() {
 return (
  //  <AuthProvider>
    <Router>
    <Routes>
    <Route path="/Tourist/orders" element={<OrderListScreen />} />
    
    <Route path="Tourist/order_detail/:id" element={<OrderDetailScreen />} />
          
        <Route path="/" element={<HomePageGuest />} /> {/* Default route */}
        <Route path="/tourist/MyBookings" element={<MyBookings />} /> {/* Default route */}
        <Route path="/tourist/MyBookedActivities" element={<MyBookedActivities />} /> {/* Default route */}
        <Route path="/tourist/MyBookedTransportation" element={<MyBookedTransportation />} /> 
        <Route path="/tourist/MyBookedFlights" element={<MyBookedFlights />} /> 
        <Route path="/tourist/MyBookedHotels" element={<MyBookedHotels />} /> 
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </Router>

);
}

```

</details>


## Installation

- Make sure you have [Node](https://nodejs.org/en) and [Git](https://git-scm.com/) installed

- Make a new folder for CariGo Trip Planner

```bash
mkdir CariGo
cd CariGo
```

- Clone this repo

```bash
git clone https://github.com/Advanced-computer-lab-2024/CariGo
```

- Install dependencies for CariGo backend

```bash
cd CariGo
cd backend
npm install
```

- Install dependencies for CariGo frontend

```bash
cd Carigo
cd frontend
npm install
```



## API References
 
### Activities

handles all operations related to activities on the system ans is used by /activities followed by the following :
- **/ :** a GET function that read all activities to be viewed by a tourist/guest and internally handles any filtering
- **/getadvact :** a GET function that reads all activites created by the logged in advertiser
- **/createActivity :** a POST function that allows advertisers to create a new activity
- **/updateActivity/:id :** a PATCH function to update an activity by id
- **/deleteActivity/:id :** a DELETE function to delete an activity by id
- **/getOne/:id :** a GET function to get a single activity by id
- **/sortActivityByPrice :** a GET function used to sort activites by price
- **/getTitles :**
- **/openActivity/:id :** a PATCH function used to set an activity's status to open by its id
- **/shareActivity/:id :** a GET function used to share an activity by its id
- **/BookActivity/:ActivityId :** a POST function used to book a certain activity by its id
- **/MyActivityBookings :** a GET function used to show the logged in tourist all their booked activities
- **/CancelActivityBooking :** a PATCH function used to cancel a booked activity as long as it has not started
- **/readActivitiesByIds :** a GET function used to read multiple itineraries by the string of ids provided in the query

    
### Itineraries
 
handles all operations related to itineraries on the system ans is used by /Event followed by the following :
- **/readAllItineraries :** a GET function that read all itineraries and internally handles any filtering
- **/readSingleItinerary/:itineraryId :** a GET function to get a single itinerary by id
- **/readMyItineraries :** a GET function to read a logged in tour guide's itineraries
- **/createItinerary :** a POST function to create a new itinerary
- **/updateItinerary/:itineraryId :** a PATCH function to update an itinerary by id
- **/itineraries/:id :** a DELETE function to delete an itinerary by id
- **shareItinerary/:id :** a GET function to share an itinerary by its id
- **/openBookings/:id :** a PATCH function used to set an itinerary's status to open by its id
- **/BookItinerary/:ItineraryId :** a POST function used to book a certain itinerary by its id
- **/MyItineraryBookings :** a GET function used to show the logged in tourist all their booked itineraries
- **/CancelItineraryBooking :** a PATCH function used to cancel a booked itinerary as long as it has not started
- **/readItinerariesByIds :** a GET function used to read multiple itineraries by the string of ids provided in the query
    
### Historical places

handles all operations related to historical places on the system ans is used by/Event followed by the following :
- **/viewAllVintage :** a GET function that read all historical places without applying any filters to them
- **/readAllVintages :** a GET function that read all historical places viewable to tourist/guest and internally handles any tag filtering
- **/readSingleVintage/:vintageId :** a GET function to get a single historical place by id
- **/createvintage :** a POST function to create a new historical place post
- **/updateVintage/:vintageId :** a PATCH function to update an historical place by id
- **/deleteVintage/:id :** a DELETE function to delete an historical place by id
- **shareVintage/:id :** a GET function to share an itinerary by its id
   
    
### Products

handles all operations related to products on the system ans is used by /products followed by the following :
- **/ :** a get function that returns all the products available in the market with all it info
- **/:id :** a get function that returns all the data for a single product which is specified by the id in the URL
 - **/getSellersProducts/:id :** a get function that returns all the products for a specific seller using their id
 - **/getTitles/:id :**  a get function that returns all product titles taht belong to a user based on their id
- **/createProduct :** a post function that creates a new product by the seller that is currently logged in
- **/deleteProduct/:id :** a delet function that deletes a product from the system using the specified id
- **/updateProduct/:id :** a patch function that updates the info of the selected product using the id provided in the url
- **/archiveProduct/:id :** a patch function that updates the status of the selected product to be archived using the id provided in the url by seller or admin
- **/unarchiveProduct/:id :** a patch function that updates the status of the selected product to be unarchived using the id provided in the url by seller or admin
- **/getTitles/:id :** a get function that gets the titles of all the products available on the system for a selected seller or admin
- **/tourist-products :** a get function that gets the all products available on the system that matches a specified search or fillter
  
    
### purchases

/purchaseRouter followed by the following :
- **/productPurchases/:id :** a get function that returns a specific product using id 
- **/purchases :** a get function that returns all the data of all product on the system
 - **/userPurchases :** a get function that returns all the purchases for the logged in user
- **/makePurchase :** a post function that handle the logic of purchasing in the data base
- **/deleteProduct/:id :** a delet function that deletes a product from the system using the specified id
- **/updateProduct/:id :** a patch function that updates the info of the selected product using the id provided in the url
    

### Transportations
 
handles all operations related to transportations on the system ans is used by /transportation followed by the following:
- **/ :** a get function that reads all transportations
- **/getadvTrans  :** a get function that reads all transportations created by the logged in advertiser
- **/getOne/:id :** a GET function to get a single transportation by id
- **/createTransportation :** a POST function that allows advertisers to create a new transportation
- **/updateTransportation/:id :** a PATCH function to update a transportation by id
- **/deleteTransportation/:id :** a DELETE function to delete a transportaion by id
- **/BookTransportation/:TransportationId :** a post function to book a transportation using its id
- **/MyBookings :** a get request used to read a tourist's booked transportations
- **/CancelBooking/:bookId :** a patch request used to cancel a transportation booking using its id
    
    
### flights and hotels

both flight and hotels are done using amadeus api and use /flights followed by the following:
- **/cities :** a get request that reads available cities and filters them based don user typing
- **/getFlights :** a get method that reads all available flights based on inputed fields
- **/seatMap :** a get method that reads the seatmap of a specific flight to get extra info about that flight
- **/hotels :** a get method that reads all available hotels based on inputed fields values
- **/hotelDetails :** a get method that reads all of a single hotel's booking details 
- **/BookFlight :** a post method used to book an flight
- **/BookHotel :** a post method used to book an hotel
- **/MyfBookings :** a get request that reads all of a tourist's booked flights 
- - **/MyhBookings :** a get request that reads all of a tourist's booked hotels 
- **/CancelfBooking :** a patch request that cancels a flight booking as long as its date hasnt come yet
- **/CancelhBooking :** a patch request that cancels a hotel booking as long as its start date hasnt come yet
    
    
### tourist
 
handles all operations specific to tourist :
- **/MyAccount :** a get request to get a logged in tourist's account
- **/updateMe :** a patch request to update a logged in tourist's account
- **/deleteMe :** a delete request to delete a logged in tourist's account
- **/fileComplaint :** a post request to allow a tourist to file a complaint
- **/myComplaints :** a get request that reads all of a tourist's filled complaints
    
    
### advertiser

handles all operations specific to advertiser :
- **/MyAccount :** a get request to get a logged in advertiser's account
- **/updateMe :** a patch request to update a logged in advertiser's account
- **/deleteMe :** a delete request to delete a logged in advertiser's account
   
  
### user

handles general user operations using the url /users followed by the following:
- **/ :** a get request to read all users
- **/signup :** a post request to signup a user
- **/login :** a post request to login a user 
- **/forgotPassword :** a post request to ask the user if they forgot their password in case of wrong credentials
- **/resetPassword/:token :** a patch request used to reset a users password given their token
- **/update/:userId :** a patch request that updates user data given their id
-**/pending-documents :** a get request that allows an admin to view all pending requests
- **/approve-document/:userId :** a patch request that allows an admin to approve documents uploaded by a certain user identified by their id
- **/reject-document :** a patch request that allows an admin to reject documents uploaded by a certain user identified by their id
- **/:id :** a get request that returns all the info of a single user identified bu their id
- **/upload-documents :** a post request for users who are not tourist to upload documents to be reviewed by an admin
- **/changePassword :** a patch request to change a logged in user's password
- **/UpdateWallet :** a patch request to change a user's wallet value
- **/RedeemPoints :** a patch request to handle user reedeming points
   
    
### admin 
to handle admin specific operations using the url /admin followed by:
- **/getTags :** a get request to read all the tags on the system
- **/createTag :** a post request to create a new tag
- **/updateTag/:id :** a put request to pdate a tag using its id
- **/deleteTag/:id :** a delete request to delete a tag
- **/getCategories :** a get request to read all the categories on the system
- **/createCategory :** a post request to create a new category
- **/updateCategory/:id :** a put request to pdate a category using its id
- **/deleteCategory/:id :** a delete request to delete a category
- **/addAdmin :** a post request to add a new admin
- **/deleteUser :** a post request to delete a user
- **/addTourismGovernor :** a post request to adda  tourism governer
- **/viewAllComplaints :** a get request to view all complaints on the system.
- **/viewComplaint/:id :** a get request to view a complaints based on its id
- **/updateComplaintStatus/:id :** a patch request to update a complaint's status by its id
- **/replyToComplaint/:id :** a post request to reply to a complaintusing its id
- **/filterComplaintsByStatus/:status :** get tequest to filter complaints by status
- **/promo-code :** post request to create a promo code
- **/report :** get request to generate a revenue report based on inputed fields
- **/user_report :** a get request that generates a report about users 
    
### experience

/experience followed by the following :
- **/createExperience :** a post function to create experience for the tour guide

    
### notification

/notifications followed by the following :
- **/unreade :** a get function that returns the unread message of the current loggen in use 
- **/ :** a get function that returns all the notification messages of the current loggen in use
- **/:id :** a get function that returns the data of single notification using the id provided
- **/:id :** a delete function that delets the notification with the id provided
- **/mark-all-read :** a patch function that updates the read attribute of a the logged in user to true meaning that they are read.
- **/:id/mark-read :** a patch function that updates the read attribute of single notification to ture meaning that this notification is read by user this attribute is selected using the id provided in the url


### review

this route is used to review activities,itineraries,tour guides and products using the url /review followed by the following :
- **/activity :** a post request to review a activity
- **/itinerary :** a post request to review a itinerary
- **/tourGuide :** a post request to review a tourGuide
- **/product :** a post request to review a product
- **/:id :** a get/delete/patch request that read/deletes/updates a review by its id


### sales report

this route is used to generate sales reports using the url /review followed by the following :
- **/activity :** a post request to review a activity
- **/itinerary :** a post request to review a itinerary
- **/tourGuide :** a post request to review a tourGuide
- **/product :** a post request to review a product
- **/:id :** a get/delete/patch request that read/deletes/updates a review by its id


## Tests

**Tests were done primarily on Postman. To test an API endpoint using Postman, you can follow these general instructions:**
   1. Open Postman. 
   3. Select the HTTP method for the request: GET, POST, PUT, DELETE, etc. 
   4. Enter the endpoint URL in the address bar. 
   5. Optional: If the endpoint requires any query parameters or request body, add them in the corresponding sections. 
   5. Click the "Send" button to send the request. 
   6. Check the response status code and response body to ensure that the endpoint is functioning as expected. 
   7. Repeat the process for any additional endpoints you want to test. 
  
   ###### **Note:** Some endpoints may require authentication or specific headers to be set in the request. Make sure to configure these accordingly in Postman before sending the request. 

## How to Use
##### first use the command
    npm i dotenv
##### then create a .env file in the backend folder with the following code 
    PORT ="<the port number that you will run the backend on>"
    DATABASE ="<Your Mongo Connection String>"
    JWT_SECRET ="<Your Mongo Connection String>"
    JWT_EXPIRES_IN="<the time token will expire after. meaning that the user will auto signout after that time>"
    JWT_COOKIE_EXPIRES_IN="<the time the stored cookies will expire after. should be the same as "JWT_EXPIRES_IN">"
    EMAIL_USERNAME="<the email address you will use in sending notifications and promocodes via mail>"
    EMAIL_PASSWORD="<the app password that you will use to uthinticate your email address refer to google security to know how to create app password>"
    clientSecret = "<amadus key used for hotel and flight bookings >"
    clientId = "<amadus key used for hotel and flight bookings >"
    currencyConversionKey = "<currency conversion key used getting the conversion rate between currencies >"
    STRIPE_SECRET_KEY="<stripe key used for payments >"

    
after following the [installation](##Installation) steps you will need to open 2 terminals
##### on the first terminal run the server using the commands
    cd backend
    nodemon server
##### on the second terminal run the clinet side using the commands
    cd frontend
    npm run start
    
## Contribute
For anyone who would like to contribute in the development of the project just clone the repository using following link: 

[git clone Advanced-computer-lab-2024/CariGo](https://github.com/Advanced-computer-lab-2024/CariGo.git)

## Credits

- [amadeus](https://developers.amadeus.com/)
- [exchangerate-api.com](https://www.exchangerate-api.com/)
- [netNinja mongoDb youtube](https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&ab_channel=NetNinja)
- [netNinja mern stack youtube](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&ab_channel=NetNinja)
- [NetNinja node,express youtube](https://www.youtube.com/watch?v=-foo92lFIto&list=PL4cUxeGkcC9hAJ-ARcYq_z6lDZV7kT1xD&ab_channel=NetNinja)
- [Udemy the-complete-web-development-bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/?couponCode=JUST4U02223)
- [Udemy nodejs-express-mongodb-bootcamp](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
- [ChatGPT](https://chatgpt.com/)
- [v0 by Vercel](https://v0.dev/chat/wofTmuLh0XR)
- [Material ui]( https://mui.com/ )
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Express docs](https://expressjs.com/en/4x/api.html)
- [ReactJs docs](https://reactjs.org/docs/getting-started.html)
- [NodeJs docs](https://nodejs.org/en/docs/)
- [Prettier docs](https://prettier.io/docs/en/index.html)
- [MUI docs](https://mui.com/getting-started/usage/)
- [React Router docs](https://reactrouter.com/en/6.21.0)
- [React Hook Form docs](https://react-hook-form.com/get-started)



## License
