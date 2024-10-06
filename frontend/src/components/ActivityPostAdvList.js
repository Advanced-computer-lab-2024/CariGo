import React from "react";
import ActivityPostAdvertiser from "./ActivityPostAdvertiser";
import { Box } from "@mui/material";

export default function ActivityPostAdvList({advertiserPosts}){



    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
            {activities.map((activity,index) => (
                <Grid size ={4} key={index}>
                    <ActivityPostAdvertiser
                        id={activity._id}
                        start_date={StringDate(activity.start_date)}
                        end_date={StringDate(activity.end_date)}
                        location={activity.location}
                        duration={activity.duration}
                        price= {activity.price}
                        category={activity.category}
                        rating={activity.ratingsAverage}
                        discount={activity.discount}
                        isOpened= {activity.isOpened==true? "open":"closed"}
                        title= {activity.title} 
                        tags={activity.tags}
                        description={activity.description}
                        img={activity.img}
                    />
                </Grid>
            ))}
        </Box>
    )


}