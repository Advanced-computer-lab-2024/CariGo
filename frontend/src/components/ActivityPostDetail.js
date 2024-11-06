import ActivityPost from "./DetailedActivityPost";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom"; 
import NavBar from"../Pages/Tourist/components/TouristNavBar";
import { Button,Box } from "@mui/material";



export default function ActivityDetail(){
    const { id } = useParams({});
    const [activity, setActivities] = useState({});

    useEffect(() => {
        // Fetch activities from the backend API
        const fetchActivities = async () => {
            try {
                const response = await fetch(`http://localhost:4000/cariGo/Activity/getOne/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log("Fetched activities:", json);
                setActivities(json); // Set activities if response is okay
            } catch (error) {
                console.log('Error fetching activities:', error);
            }
        };

        fetchActivities(); // Call the function to fetch activities
    }, []);

    const StringDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
  
    const calculateDuration=(date1,date2)=>{
        const start = new Date(date1);
        const end = new Date(date2);
        
        // Calculate differences
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + (years * 12);
        const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
      
        // Determine the largest unit
        if (years > 0) {
          return `${years} year${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''}`;
        } else if (weeks > 0) {
          return `${weeks} week${weeks > 1 ? 's' : ''}`;
        } else {
          return `${days} day${days > 1 ? 's' : ''}`;
        }
    }
    const navigate = useNavigate();
    return(
        <div>
    <NavBar/>
    <Box sx={{display: "flex", flexDirection :'column', marginLeft:'15%'}}>
    <Button  onClick={() => navigate(`/activities`)}
     sx={{backgroundColor:"#126782" , color:'white', cornerRadius:'8px',width:'80px',margin:'30px',marginBottom:'10px'}}>
        Back</Button>
    <ActivityPost 
        id={activity._id}
        start_date={StringDate(activity.start_date)}
        end_date={StringDate(activity.end_date)}
        location={activity.locations}
        duration={calculateDuration(activity.start_date, activity.end_date)}
        price={activity.price}
        category={activity.Category}
        rating={activity.ratingsAverage}
        discount={activity.discount}
        isOpened={activity.isOpened ? 'open' : 'closed'}
        title={activity.title}
        tag={activity.tag}
        description={activity.description}
        img={activity.img}

        sx={{display:'flex', position: 'relative', justifyContent:'center'}}
    />
    </Box>
    </div>
    )
}