import About from "@/components/About";
import CareerLine from "@/components/CareerLine";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import SkillsProcess from "@/components/SkillsProcess";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <CareerLine />
        <About />
        <SkillsProcess />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
