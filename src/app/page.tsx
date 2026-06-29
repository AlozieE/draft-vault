import { LandingDisclaimerSection } from "@/components/landing/landing-disclaimer-section";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingProblemSection } from "@/components/landing/landing-problem-section";
import { LandingSiteFooter } from "@/components/landing/landing-site-footer";
import { LandingSiteHeader } from "@/components/landing/landing-site-header";

export default function HomePage() {
  return (
    <div className="landing-page flex min-h-screen min-w-0 flex-col overflow-x-hidden">
      <LandingSiteHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingProblemSection />
        <LandingHowItWorks />
        <LandingFeatures />
        <LandingDisclaimerSection />
      </main>
      <LandingSiteFooter />
    </div>
  );
}
