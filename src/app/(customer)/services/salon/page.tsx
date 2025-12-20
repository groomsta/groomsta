import SalonHero from '@/app/components/salon/SalonHero';
import SalonCategories from '@/app/components/salon/SalonCategories';
import FeaturedSalons from '@/app/components/salon/FeaturedSalons';
import WhyChooseSalon from '@/app/components/salon/WhyChooseSalon';
import Reviews from '@/app/components/landingpage/Reviews';
import CTABanner from '@/app/components/landingpage/CTABanner';

export default function SalonServicesPage() {
    return (
        <main className="min-h-screen">
            <SalonHero />
            <SalonCategories />
            <FeaturedSalons />
        </main>
    );
}
