import "./style.css";
import { Button } from '../components/ui/button';
import { FaBox, FaMotorcycle, FaUser } from 'react-icons/fa';
import CaracteristiquesEtAvantages from "./tutoriel";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import TestimonialsSection from "./avis";
import DownloadSection from "./dowload";
import Footer from "./footer";
import DevenirLivreur from "./livreur";

// Remplace "/background.jpg" par le chemin de ton image


export default function LifasoLandingPage() {
  const [, setMobileMenuOpen] = useState(false);

const HERO_IMAGES = ["/fond1.png", "/fond2.png", "/fond.png"]; // Mets tes images ici

function BlurryCarouselBG() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {HERO_IMAGES.map((img, i) => (
        <img
          key={img}
          src={img}
          alt=""
          className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${i === index ? "opacity-00" : "opacity-0"}  bur `}
          style={{ transitionProperty: "opacity" }}
        />
      ))}
      <div className="absolute inset-0 bg-black/10" /> {/* assombrit */}
    </div>
  );
}
  // Refs pour scroll
  const sections = {
    Accueil: useRef<HTMLDivElement>(null),
    Fonctionnement: useRef<HTMLDivElement>(null),
    Avantage: useRef<HTMLDivElement>(null),
    FAQs: useRef<HTMLDivElement>(null),
    Contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const scrollToSection = (section: keyof typeof sections) => {
    sections[section].current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-sans">
    <div
  ref={sections.Accueil}
  className="relative text-white overflow-visible mx-0 pb-52 mt-0 min-h-[600px]"
>
  <BlurryCarouselBG />
  {/* Navbar */}
<nav className="px-4 py-4 max-w-7xl mx-auto relative z-10">
  <div className="flex flex-row items-center justify-between w-full">
    <h1 className="hidden md:flex flex-1 text-2xl font-bold text-white whitespace-nowrap">LIFASO</h1>
    <ul className="flex flex-row items-center gap-2 sm:gap-4 text-white text-sm">
      <li>
        <button
          onClick={() => scrollToSection("Accueil")}
          className="hover:bg-white hover:text-[#015D4E] hover:underline bg-transparent border-none px-1 py-1 rounded transition-colors duration-200"
        >
          Accueil
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("Fonctionnement")}
          className="hover:bg-white hover:text-[#015D4E] hover:underline bg-transparent border-none px-1 py-1 rounded transition-colors duration-200"
        >
          Fonctionnement
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("Avantage")}
          className="hover:bg-white hover:text-[#015D4E] hover:underline bg-transparent border-none px-1 py-1 rounded transition-colors duration-200"
        >
          Avantage
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("FAQs")}
          className="hover:bg-white hover:text-[#015D4E] hover:underline bg-transparent border-none px-1 py-1 rounded transition-colors duration-200"
        >
          FAQs
        </button>
      </li>
      <li>
        <button
          onClick={() => scrollToSection("Contact")}
          className="hover:bg-white hover:text-[#015D4E] hover:underline bg-transparent border-none px-1 py-1 rounded transition-colors duration-200"
        >
          Contact
        </button>
      </li>
    </ul>
  </div>
</nav>

  {/* Content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 lg:px-20 pt-10">
    {/* Left Content */}
    <div className="order-1 lg:order-none max-w-xl space-y-8 lg:space-y-20 text-center lg:text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug" data-aos="fade-up">
        Simple et moins cher.<br />La livraison qu’il vous faut.
      </h2>
      <p className="text-white/90" data-aos="fade-up" data-aos-delay="200">
        Envoyez (presque) tout, partout au Burkina<br />
        C’est pratique et simple à utiliser.<br />
        Bienvenue sur Lifaso !
      </p>
      <div className="flex flex-row gap-4 justify-center items-center sm:justify-start">
        <Button
          variant="outline"
          className="bg-white text-black flex flex-col items-center gap-1 p-2 rounded-md
            h-16 w-32 text-xs
            sm:h-20 sm:w-40 sm:text-base
            lg:h-24 lg:w-62 lg:text-lg"
        >
          Télécharger sur App Store
          <img src="/apple.png" alt="App Store" className="w-20 h-20 sm:w-8 sm:h-8 lg:w-30 lg:h-30" />
        </Button>
        <Button
          variant="outline"
          className="bg-white text-black flex flex-col items-center gap-1 p-2 rounded-md
            h-16 w-32 text-xs
            sm:h-20 sm:w-40 sm:text-base
            lg:h-24 lg:w-62 lg:text-lg"
        >
          Télécharger sur Google Play
          <img src="/google.png" alt="Google Play" className="w-20 h-20 sm:w-8 sm:h-8 lg:w-30 lg:h-30" />
        </Button>
      </div>
    </div>
 
          {/* Phone mockup */}
       <div className="order-2 lg:order-none relative w-80 h-96 mt-10 lg:mt-0 flex justify-center mx-auto">
  <div className="w-full animate-flip-phone pt-3">
    <img
      src="/livraison.png"
      alt="Face avant"
      className="w-full h-auto rounded-xl shadow-xl backface-hidden absolute"
    />
    <img
      src="/map.png"
      alt="Face arrière"
      className="w-full h-auto rounded-xl shadow-xl backface-hidden rotateY-180 absolute"
    />
  </div>
</div>
        </div>
      </div>

      {/* Fonctionnement Section */}
      <section ref={sections.Fonctionnement} className="bg-white text-[#015D4E] pt-20 pb-16 px-10 lg:px-20 relative z-0">
        <h3 className="text-2xl font-bold mb-6 text-center w-full" data-aos="zoom-in">
          <span className="relative inline-block after:block after:h-[2px] after:bg-[#015D4E] after:mt-2 after:mx-auto after:w-full">
            Fonctionnement
          </span>
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-center max-w-6xl mx-auto">
          {/* Étape 1 - Expéditeur */}
          <div className="flex flex-col items-center text-center" data-aos="fade-up">
            <div className="bg-[#015D4E] rounded-full p-5 mb-4">
              <FaBox className="text-white text-3xl" />
            </div>
            <p className="font-bold text-lg">1. Expéditeur</p>
            <p className="text-sm">Publiez votre demande</p>
          </div>
          <span className="hidden md:inline-block text-3xl">→</span>
          {/* Étape 2 - Livreur */}
          <div className="flex flex-col items-center text-center " data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#015D4E] rounded-full p-5 mb-4">
              <FaMotorcycle className="text-white text-3xl" />
            </div>
            <p className="font-bold text-lg">2. Livreur</p>
            <p className="text-sm">Acceptez la course</p>
          </div>
          <span className="hidden md:inline-block text-3xl">→</span>
          {/* Étape 3 - Destinataire */}
          <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-[#015D4E] rounded-full p-5 mb-4">
              <FaUser className="text-white text-3xl" />
            </div>
            <p className="font-bold text-lg">3. Destinataire</p>
            <p className="text-sm">Suivez en temps réel la livraison</p>
          </div>
        </div>
        
      </section>
      <DevenirLivreur />
      <div ref={sections.Avantage}><CaracteristiquesEtAvantages /></div>
      <div ref={sections.FAQs}><TestimonialsSection /></div>
      <div ref={sections.Contact}><DownloadSection /></div>
      <Footer />
    </div>
  );
}