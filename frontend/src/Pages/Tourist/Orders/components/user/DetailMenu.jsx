import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Title from "../common/Title";
import vedio from "../../orders.mp4";
import blackD from "../../black.mp4";
import { useState } from "react";
import vedio2 from "../../orderD.mp4";
import { BaseLinkGreen } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

import { Fab } from "@mui/material";
import { IconChevronLeft } from '@tabler/icons-react'
const NavMenuWrapper = styled.nav`
  margin-top: 32px;
  
  .nav-menu-list {
    row-gap: 8px;

    @media (max-width: ${breakpoints.md}) {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
  }

  .nav-menu-item {
    border-radius: 4px;

    @media (max-width: ${breakpoints.sm}) {
      flex: 1 1 0;
    }
  }

  .nav-menu-link {
    padding-left: 36px;
    width: 100%;
    height: 40px;
    column-gap: 12px;
    border: 1px solid transparent;

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }

    .nav-link-text {
      color: ${defaultTheme.color_gray};
    }

    &.active {
      border-left: 2px solid ${defaultTheme.color_gray};
      background-color: ${defaultTheme.color_whitesmoke};

      @media (max-width: ${breakpoints.md}) {
        border-bottom: 2px solid ${defaultTheme.color_gray};
        border-left: 0;
        background-color: transparent;
      }
    }

    @media (max-width: ${breakpoints.md}) {
      padding-left: 16px;
      padding-right: 16px;
    }

    @media (max-width: ${breakpoints.sm}) {
      padding-left: 8px;
      padding-right: 8px;
      column-gap: 8px;
    }
  }
`;

const DetailMenu = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const location = useLocation();
  const handleCancel = ()=>{

  }
  return (
    <div style={{marginLeft:"30px"}}>
       
      {/* <p className="text-base font-light italic" style={{marginLeft:"35px"}}>Buy Now Or Cry Later.</p> */}
      <div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
  <video 
    controls 
    autoPlay
    muted
    loop
    disableRemotePlayback
    disablePictureInPicture
    controlsList="nodownload nofullscreen noremoteplayback"
    onPause={(e) => e.target.play()} 
    width="100%" 
    style={{ borderRadius: "1px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
  >
    <source src={vedio} type="video/mp4" />
    
    Your browser does not support the video tag.
  </video>
</div>
<div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
  <video 
    controls 
    autoPlay
    muted
    loop
    disableRemotePlayback
    disablePictureInPicture
    onPause={(e) => e.target.play()} 
    controlsList="nodownload nofullscreen noremoteplayback"
    width="100%" 
    style={{ borderRadius: "1px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
  >
    <source src={vedio2} type="video/mp4" />
    
    Your browser does not support the video tag.
  </video>
</div>
<div style={{ width: "200px", margin: "0 auto", textAlign: "center" }}>
  <video 
    controls 
    autoPlay
    muted
    loop
    disableRemotePlayback
    disablePictureInPicture
    onPause={(e) => e.target.play()} 
    controlsList="nodownload nofullscreen noremoteplayback"
    width="100%" 
    style={{ borderRadius: "1px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
  >
    <source src={blackD} type="video/mp4" />
    
    Your browser does not support the video tag.
  </video>
</div>
    </div>
  );
};

export default DetailMenu;
