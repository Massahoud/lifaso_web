
import "./style.css"; // Importer les styles globaux et Tailwind
import { Button } from '../components/ui/button';
import {  FaBox, FaMotorcycle, FaUser } from 'react-icons/fa';
import CaracteristiquesEtAvantages from "./tutoriel";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import TestimonialsSection from "./avis";
import DownloadSection from "./dowload";
import Footer from "./footer";

import { useState } from "react";
import { FaBars } from "react-icons/fa"; // icône hamburger




export default function LifasoLandingPage() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, // ✅ chaque fois qu'on scroll dans la section
  });

  // Recharge AOS sur chaque update du DOM (utile si tu ajoutes des sections dynamiquement)
  AOS.refresh();
}, []);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative bg-[#015D4E] text-white overflow-visible rounded-[3rem] mx-4 lg:mx-10 pb-32 mt-2">
        {/* Navbar */}
      <nav className="px-4 py-4 max-w-7xl mx-auto">
  <div className="flex flex-col lg:flex-row items-center justify-between">
    {/* Top Row with Logo and Hamburger */}
    <div className="flex w-full justify-between items-center lg:w-auto">
      <h1 className="text-2xl font-bold text-white">LIFASO</h1>

      {/* Hamburger Button - only visible on small screens */}
      <button
        className="lg:hidden text-white text-2xl"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>
    </div>

    {/* Menu Items */}
    <ul
      className={`flex-col lg:flex lg:flex-row items-center gap-4 lg:gap-6 text-white text-sm transition-all duration-300 ${
        isMobileMenuOpen ? "flex" : "hidden"
      } lg:flex`}
    >
      <li><a href="#" className="hover:underline">Accueil</a></li>
      <li><a href="#" className="hover:underline">Fonctionnement</a></li>
      <li><a href="#" className="hover:underline">Avantage</a></li>
      <li><a href="#" className="hover:underline">FAQs</a></li>
      <li><a href="#" className="hover:underline">Contact</a></li>
    </ul>
  </div>
</nav>



        {/* Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 lg:px-20 pt-10">
  {/* Left Content */}
 <div className="max-w-xl space-y-8 lg:space-y-20 text-center lg:text-left">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug" data-aos="fade-up">
    Simple et moins cher.<br />La livraison qu’il vous faut.
  </h2>


<p className="text-white/90" data-aos="fade-up" data-aos-delay="200">
  Envoyez (presque) tout, partout en au Burkina<br />
  C’est pratique et simple à utiliser.<br />
  Bienvenue sur Lifaso !
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-center">

          <Button variant="outline" className="bg-white text-black flex flex-col items-center gap-2 p-2 rounded-md h-20">
            Télécharger sur App Store
            <img src="/apple.png" alt="App Store" className="w-30 h-25" />
          </Button>
          <Button variant="outline" className="bg-white text-black flex flex-col items-center gap-2 p-2 rounded-md h-20">
            Télécharger sur Google Play
            <img src="/google.png" alt="Google Play" className="w-30 h-25" />
          </Button>
        </div>
  </div>





          {/* Phone mockup */}
       <div className=" hidden lg:block relative w-96 h-96">

  <div className="w-34 md:w-80  animate-flip-phone pt-3 right-4">
   <div className="block lg:hidden w-full mt-10 px-10">
  <img src="/livraison.png" alt="Mobile livraison" className="mx-auto w-3/4 max-w-xs rounded-xl shadow-md" />
</div>

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
      <section className="bg-white text-[#015D4E] pt-20 pb-16 px-10 lg:px-20 relative z-0">
 <h3
  className="text-2xl font-bold mb-6 text-center w-full"
  data-aos="zoom-in"
>
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
  <p className="text-sm">Publier votre demande</p>
</div>


    {/* Flèche */}
    <span className="hidden md:inline-block text-3xl">→</span>

    {/* Étape 2 - Livreur */}
    <div className="flex flex-col items-center text-center " data-aos="fade-up" data-aos-delay="200">
      <div className="bg-[#015D4E] rounded-full p-5 mb-4">
        <FaMotorcycle className="text-white text-3xl" />
      </div>
      <p className="font-bold text-lg">2. Livreur</p>
      <p className="text-sm">Accepte la course</p>
    </div>

    {/* Flèche */}
    <span className="hidden md:inline-block text-3xl">→</span>

    {/* Étape 3 - Destinataire */}
    <div className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="400">
      <div className="bg-[#015D4E] rounded-full p-5 mb-4">
        <FaUser className="text-white text-3xl" />
      </div>
      <p className="font-bold text-lg">3. Destinataire</p>
      <p className="text-sm">Suit en temps réel la livraison</p>
    </div>
  </div>
</section>

< CaracteristiquesEtAvantages />
<TestimonialsSection />
<DownloadSection/>
<Footer />
    </div>
  );
}
