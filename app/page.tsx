import Navbar from "@/app/components/layout/navbar";
import Hero from "@/app/components/sections/hero";
import Work from "@/app/components/sections/work";
import About from "@/app/components/sections/about";
import Experience from "@/app/components/sections/experience";
import Contact from "@/app/components/sections/contact";
import Spotlight from "@/app/components/ui/spotlight";
import ProgressBar from "@/app/components/ui/progress-bar";
import Footer from "@/app/components/sections/footer";
import CommandMenu from "@/app/components/ui/command-menu";

export default function Home() {
  return (
    <>

      <ProgressBar />
      <Spotlight />
      <CommandMenu />
      
      <Navbar />
      

<main className="bg-[#09090B] text-white">
<Hero />
<Work />
<About />
<Experience />
<Contact />
<Footer />
</main>
    </>
  );
}