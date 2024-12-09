import { TicketsPlane, Sparkles, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import Spotlight from "./spotlight";
import WorflowImg01 from "./images/workflow-01.png";
import WorflowImg02 from "./images/workflow-02.png";
import WorflowImg03 from "./images/workflow-03.png";

export default function ProductJourney() {
  const navigate = useNavigate();

  const navigateToBookServices = () => {
    navigate("/book-services");
  };  
 
  const navigateToItirenaries = () => {
    navigate("/user_itineraries");
  };  
  
  const navigateToProducts = () => {
    navigate("/Tourist/Products");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
        <h4 className="bg-gradient-to-r from-[#01324c] via-[#01324c] to-[#01324c] bg-clip-text text-2xl font-semibold text-transparent md:text-5xl">
          _______ 🦌 _______
        </h4>
        <p className="mt-4 text-lg text-transparent bg-gradient-to-r from-[#4f7489] to-[#037bba] bg-clip-text">
          Escape the chaos of daily life and find tranquility in just a few
          minutes. Carigo makes it easy for you to plan out your journey from A
          to Z.
        </p>
      </div>
      <Spotlight
        className="group mx-auto mt-16 grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3"
        spotlightColor="#037bba"
      >
        <Card
          className="bg-[#01324c] text-white"
          onClick={navigateToBookServices}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketsPlane className="h-5 w-3 text-white" />
              <span>Smooth Travel</span>
            </CardTitle>
          </CardHeader>
          <div className="flex justify-center items-center">
            <img
              className="inline-flex"
              src={WorflowImg01}
              width={250}
              height={188}
              alt="Workflow 01"
            />
          </div>
          <CardContent span="Book flights and hotels">
            <p className="text-sm text-gray-300">
              Find flights and book hotels for yor destinations. With everything
              you need to take care of in one place, traveling couldn't be any
              easier.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#01324c] text-white" onClick={navigateToItirenaries}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-3 text-white" />
              <span>Exciting Journeys</span>
            </CardTitle>
          </CardHeader>
          <div className="flex justify-center items-center">
            <img
              className="inline-flex"
              src={WorflowImg02}
              width={250}
              height={188}
              alt="Workflow 02"
            />
          </div>
          <CardContent span="Find Itineraries and Activities">
            <p className="text-sm text-gray-300">
              Whether you're searching for a relaxing activity, or wanting a
              full thrilling journey, Find Itineraries and Activities that match
              your needs.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#01324c] text-white" onClick={navigateToProducts}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-3 text-white" />
              <span>Easy Purchase</span>
            </CardTitle>
          </CardHeader>
          <div className="flex justify-center items-center">
            <img
              className="inline-flex"
              src={WorflowImg03}
              width={250}
              height={188}
              alt="Workflow 03"
            />
          </div>
          <CardContent span="Buy Products">
            <p className="text-sm text-gray-300">
              Why not go shopping for a souviner? Only you don't have to search
              around for what you want. All products are just at the tip of your
              fingers.
            </p>
          </CardContent>
        </Card>
      </Spotlight>
    </section>
  );
}
