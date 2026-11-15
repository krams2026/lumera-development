import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Snow from "@/components/Snow";

export default function Home() {
  return (
    <>
      <Snow />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Pricing />
          <About />
          <Resources />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
