import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Video from "./videos/yacht.mp4";
import MagazineCover from "./images/magazine1.png";
import MagazinePage from "./images/magazinePage.png";
import Logo from "./images/logo.png";
import HeroBackground from "./images/HeroBg.jpg"; 

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isComicOpen, setIsComicOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComicClick = () => {
    setIsComicOpen(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsComicOpen(false);
    }
  };

  const navigate = useNavigate();

  const navigateToSignUp = () => {

    localStorage.setItem('s',"signUp")
    navigate(
      "/login"
    );
  };  
  
  const navigateToLogIn = () => {
    localStorage.setItem('s',"signIn")
    navigate(
      "/login"
    );
   // navigate("/login");
  };

  const videoContainerStyle = {
    position: "relative",
    width: "200px",
    height: "256px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    transform: "translate(145px, -15px)",
  };

  const buttonContainerStyle = {
    position: "relative",
    width: "142px",
    height: "42px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    transform: "translate(125px, -200px)",
  };

  const logoContainerStyle = {
    position: "relative",
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    overflow: "hidden",
    transform: "translate(86px, -275px)",
  };

  const videoStyle = {
    width: "100%",
    height: "100%",

  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${HeroBackground})`, // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repeating
      }}
    >
      {/* Background text */}
      <div
        className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none pl-20"
        style={{ transform: "translateY(-18px)" }} // Move text up by 5px
      >
        <div className="flex items-start justify-start w-full">
          <h1 className="text-[10vw] font-black leading-none tracking-tighter">
            <span className="relative">
              <span className="absolute inset-0 text-[#f7c59f] opacity-10">
                CARI
              </span>
              <span className="relative text-transparent [-webkit-text-stroke:2px_#f7c59f] [text-stroke:2px_#f7c59f]">
                CARI
              </span>
            </span>
            <span className="text-[#ff6b35]">&</span>
            <span className="relative">
              <span className="absolute inset-0 text-[#f7c59f] opacity-10">
                GO
              </span>
              <span className="relative text-transparent [-webkit-text-stroke:2px_#f7c59f] [text-stroke:2px_#f7c59f]">
                GO
              </span>
            </span>
          </h1>
        </div>
        <div
          className="text-[2.9vw] font-bold text-[#f7e1c6] opacity-40"
          style={{ transform: "translateY(-5px)" }} // Move text up by 5px
        >
          HAT SHANTITAK W EL BA2I 3ALINA
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        &#9660;
      </div>

      {/* Comic book image */}
      <div
        className={`flex justify-center items-center absolute inset-0 transition-all duration-1000 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0 translate-y-full"
        }`}
      >
        <img
          src={MagazineCover}
          alt="Comic Book Cover"
          className="object-cover cursor-pointer"
          width={850}
          height={702}
          onClick={handleComicClick}
        />
      </div>

      {/* Open comic book */}
      {isComicOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="flex justify-center items-center rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={MagazinePage}
              alt="Comic Book Page"
              className="z-10 mb-4"
              width={850}
              height={702}
            />
            <div
              className="absolute z-20 flex justify-center items-center"
              style={videoContainerStyle}
            >
              <video
                src={Video}
                controls
                autoPlay
                loop
                muted
                style={videoStyle}
              ></video>
            </div>
            <div
              className="absolute z-20 flex justify-center items-center"
              style={buttonContainerStyle}
            >
              <button
                className="absolute bg-[#ea563b] text-white px-4 py-2 rounded hover:[#a24534] transition-colors"
                onClick={() => navigateToSignUp()}
              >
                SignUp Now
              </button>
            </div>
            <div
              className="absolute z-20 flex justify-center items-center"
              style={logoContainerStyle}
            >
              <img src={Logo} alt="logo" width={850} height={702} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
