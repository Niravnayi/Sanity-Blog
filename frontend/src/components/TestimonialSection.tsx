import { SanityImageAssetDocument } from "next-sanity";
import client from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/imageUrlBuilder";
import { SECTION_QUERY } from "../sanity/lib/queries ";
import { AnimatedTestimonials } from "./ui/animated-testimonials";



interface Testimonial {
  message: string;
  name: string;
  role: string;
  photo:{
    asset: SanityImageAssetDocument;
  };
}

export default async function Testimonial() {
  const TestimonialData = await client.fetch(SECTION_QUERY);
  const testimonials = TestimonialData[0].content[0].testimonials.map(
    (testimonial: Testimonial) => ({
      quote: testimonial.message,
      name: testimonial.name,
      designation: testimonial.role,
      src: urlFor(testimonial.photo?.asset).url() || "",
    })
  );
  return <AnimatedTestimonials testimonials={testimonials} />;
}
