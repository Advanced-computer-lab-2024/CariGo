import ActivityPost from "./ActivityPost";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"; 



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

    return(
    <ActivityPost 
    activity={activity}
    />
    )
}