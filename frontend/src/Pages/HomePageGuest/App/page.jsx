import Hero from "../components/hero";
import Features from "../components/features";
import ProductJourney from "../components/product-journey";
import Testimonials from "../components/testimonials";
import Footer from "../components/footer";
import PageIllustration from "../components/page-illustration";
import Cta from "../components/cta";
import NavBar from "../../../components/NavBarTourist";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#dde6ed] text-black">
      <main className="relative flex grow flex-col">
        <NavBar />
        <PageIllustration />
        <Hero />
        <ProductJourney />
        <Features />
        <Testimonials />
        {/* <Cta /> */}
      </main>
      <Footer />
    </div>
  );
}
