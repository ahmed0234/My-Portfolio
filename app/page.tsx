import { HeroSection } from "@/components/hero";
import ArchitectureRoom from "@/components/sections/ArchitectureRoom";
import HowIThink from "@/components/sections/HowIThink";
import SelectedWork from "@/components/sections/SelectedWork";
import Journey from "@/components/sections/Journey";
import LaunchFeedback from "@/components/sections/LaunchFeedback";
import WorthRemembering from "@/components/sections/WorthRemembering";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <HowIThink />
      <SelectedWork />
      <ArchitectureRoom />
      <Journey />
      <LaunchFeedback />
      <WorthRemembering />
    </main>
  );
}
