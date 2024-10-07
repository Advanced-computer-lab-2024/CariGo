import React from "react";
import NavBar from '../components/NavBarTourist';



export default function Home(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  console.log(localStorage.getItem('jwt') +"         d")
    return(
    <NavBar/>
    );
}