import React from "react";
import { useNavigate, Link } from "react-router-dom";
import FooterIllustration from "./images/footer-illustration.svg";
import fb from "./images/facebook.png";
import ig from "./images/instagram.png";
import gmail from "./images/gmail.png";

const Footer = () => {
  const footerStyle = {
    position: "relative",
    width: "100%",
    background: "#004c74",
    minHeight: "80px",
    padding: "10px 50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "50px",
  };

  const waveStyle = {
    position: "absolute",
    top: "-50px",
    left: 0,
    width: "100%",
    height: "50px",
    backgroundColor: "#004c74",
  };

  const socialIconStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0",
    flexWrap: "wrap",
  };

  const socialIconItemStyle = {
    listStyle: "none",
  };

  const socialIconLinkStyle = {
    fontSize: "2rem",
    color: "#fff",
    margin: "0 10px",
    display: "inline-block",
    transition: "0.5s",
  };

  const menuStyle = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0",
    flexWrap: "wrap",
  };

  const menuItemStyle = {
    listStyle: "none",
  };

  const menuLinkStyle = {
    fontSize: "1.2rem",
    color: "#fff",
    margin: "0 10px",
    display: "inline-block",
    transition: "0.5s",
    textDecoration: "none",
    opacity: 0.75,
    fontWeight: 300,
  };

  const copyrightStyle = {
    color: "#fff",
    margin: "10px 0 5px 0",
    fontSize: "0.9rem",
    fontWeight: 300,
  };

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/SignUp-In");
  };

  const navigateToItirenaries = () => {
    navigate("/user_itineraries");
  };

  const navigateToActivities = () => {
    navigate("/activities");
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  return (
    <footer style={footerStyle}>
      <div style={waveStyle} />
      <ul style={socialIconStyle}>
        <li style={socialIconItemStyle}>
          <a
            href="https://www.facebook.com/profile.php?id=61570089628999"
            style={socialIconLinkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fb} alt="Facebook" width="32" height="32" />
          </a>
        </li>
        <li style={socialIconItemStyle}>
          <a
            href="https://www.instagram.com/carigo_official?igsh=c3FoZGIzeWh2ejZj"
            style={socialIconLinkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ig} alt="Instagram" width="32" height="32" />
          </a>
        </li>
        <li style={socialIconItemStyle}>
          <a href="mailto:carigo.team@gmail.com" style={socialIconLinkStyle}>
            <img src={gmail} alt="Gmail" width="32" height="32" />
          </a>
        </li>
      </ul>

      <ul style={menuStyle}>
        <li style={menuItemStyle}>
          <Link to="/Home" style={menuLinkStyle}>
            Home
          </Link>
        </li>
        <li style={menuItemStyle}>
          <Link to="/SignIn-Up" style={menuLinkStyle}>
            SignUp
          </Link>
        </li>
        <li style={menuItemStyle}>
          <Link to="/user_itineraries" style={menuLinkStyle}>
            Itineraries
          </Link>
        </li>
        <li style={menuItemStyle}>
          <Link to="/activities" style={menuLinkStyle}>
            Activities
          </Link>
        </li>
        <li style={menuItemStyle}>
          <a href="mailto:carigo.team@gmail.com" style={menuLinkStyle}>
            Contact
          </a>
        </li>
      </ul>
      <p style={copyrightStyle}>&copy;CariGo | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
