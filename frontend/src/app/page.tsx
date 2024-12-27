import FAQSection from "../components/FAQSection";
import HeroSection from "../components/HeroSection";
import Testimonial from "../components/TestimonialSection";
import Blogs from "./blog/page";


const page = () => {
  return (
    <div>
      <HeroSection />
      <Testimonial />
      <Blogs />
      <FAQSection />
    </div>
  );
};

export default page;
