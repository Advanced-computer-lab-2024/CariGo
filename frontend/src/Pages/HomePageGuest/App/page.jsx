import Hero from "../components/hero";
import Features from "../components/features";
import ProductJourney from "../components/product-journey";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
import PageIllustration from "../components/page-illustration";
import Cta from "../components/cta";
import NavBar from "../../../Pages/Tourist/components/GuestNavBarHome";
// import SideBar from "../../../Pages/Tourist/components/GuestSideBar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const navigateToHowToUse = () => {
    navigate("/how-to-use");
  };

  return (
    <div className="min-h-screen bg-[#dde6ed] text-black">
      <main className="relative flex grow flex-col">
        <NavBar />
        {/* <SideBar /> */}
        <PageIllustration />
        <Hero />
        <ProductJourney />
        <Features />
        <Testimonials />
        {/* <Cta /> */}
      </main>
      <Footer />
      <motion.button
        onClick={navigateToHowToUse}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#ff6b35] text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0px 0px 8px rgba(255, 107, 53, 0.5)",
            "0px 0px 16px rgba(255, 107, 53, 0.7)",
            "0px 0px 8px rgba(255, 107, 53, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <HelpCircle size={24} />
      </motion.button>
    </div>
  );
}
