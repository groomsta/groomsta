import Hero from "../components/landingpage/Hero";
import ServiceModes from "../components/landingpage/ServiceModes";
import PopularCategories from "../components/landingpage/PopularCategories";
import HowItWorks from "../components/landingpage/HowItWorks";
import WhyChooseUs from "../components/landingpage/WhyChooseUs";
import Reviews from "../components/landingpage/Reviews";
import ServiceabilityCheck from "../components/landingpage/ServiceabilityCheck";
import CTABanner from "../components/landingpage/CTABanner";

export default function CustomerLandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServiceModes />
      <PopularCategories />
      <HowItWorks />
      <WhyChooseUs />
      <Reviews />
      <ServiceabilityCheck />
      <CTABanner />
    </main>
  );
}