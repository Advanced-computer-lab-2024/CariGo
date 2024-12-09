// import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import ModalVideo from "./model-video";
import VideoThumb from "./images/hero-image-01.jpg";
import Video from "./videos/video.mp4";
import { useNavigate } from "react-router-dom";


export default function Hero() {
  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // const handlePlayClick = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };
  const navigate = useNavigate();


  const navigateToSignUp = () => {
    localStorage.setItem('s',"signUp")
    navigate(
      "/signIn-Up"
    );
  };  
  
  const navigateToLogIn = () => {
    localStorage.setItem('s',"signIn")
    navigate(
      "/signIn-Up"
    );
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="bg-gradient-to-r from-[#01324c] to-[#01324c] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
            Carigo: Hat Shantitk w El Ba2i 3alina
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-transparent bg-gradient-to-r from-[#4f7489] to-[#037bba] bg-clip-text lg:mt-6">
            Carry the vibe, leave the rest to us!
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 lg:items-start lg:flex-row lg:mt-10">
            <Button
              className="btn group w-full max-w-sm bg-gradient-to-t from-[#FF683C] to-[#037bba] bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
              href="#0"
              onClick={navigateToSignUp}
            >
              <span className="relative inline-flex items-center">
                SignUp Now
                <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </Button>
            <Button
              className="btn relative w-full max-w-sm bg-gradient-to-b from-[#037bba] to-[#FF683C] bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent  hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
              href="#0"
              onClick={navigateToLogIn}
            >
              Log-in to CariGo
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 lg:pl-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <ModalVideo
              thumb={VideoThumb}
              thumbWidth={1500}
              thumbHeight={900}
              thumbAlt="Modal video thumbnail"
              video={Video}
              videoWidth={1920}
              videoHeight={1080}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
