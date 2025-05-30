import {
  FaTiktok,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaDollarSign,
  FaStar,
  FaCheck,
} from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



const CaracteristiquesEtAvantages = () => {
 useEffect(() => {
   AOS.init({
     duration: 1000,
     once: false, // ✅ chaque fois qu'on scroll dans la section
   });
 
   // Recharge AOS sur chaque update du DOM (utile si tu ajoutes des sections dynamiquement)
   AOS.refresh();
 }, []);
  return (
    <div>
 <h3 className="text-2xl font-bold mb-6 text-center w-full text-[#015D4E]" data-aos="fade-up">
  <span className="relative inline-block after:block after:h-[2px] after:bg-[#015D4E] after:mt-2 after:mx-auto after:w-full">
    Tutoriel disponible sur
  </span>
</h3>


      {/* Réseaux sociaux */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-10 bg-white text-black">
  <div className="flex flex-col items-center text-[#000] hover:text-[#69C9D0]" data-aos="zoom-in" data-aos-delay="100">
    <FaTiktok size={30} />
    <p className="mt-2">Tiktok</p>
  </div>
  <div className="flex flex-col items-center text-[#3b5998] hover:text-blue-700" data-aos="zoom-in" data-aos-delay="200">
    <FaFacebookF size={30} />
    <p className="mt-2">Facebook</p>
  </div>
  <div className="flex flex-col items-center text-[#E1306C] hover:text-pink-600" data-aos="zoom-in" data-aos-delay="300">
    <FaInstagram size={30} />
    <p className="mt-2">Instagram</p>
  </div>
  <div className="flex flex-col items-center text-[#FF0000] hover:text-red-600" data-aos="zoom-in" data-aos-delay="400">
    <FaYoutube size={30} />
    <p className="mt-2">YouTube</p>
  </div>
</div>


 <div className="relative">
  {/* Image de fond floutée */}
  <div
    className="absolute inset-0 bg-cover bg-center filter  brightness-75"
    style={{ backgroundImage: "url('/fonde.png')" }}
  ></div>

  {/* Contenu avec fond semi-transparent */}
  <div className="relative bg-[#015D4E] text-white px-6 py-12 lg:px-20 flex justify-center backdrop-blur-sm">
    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      
      {/* Image */}
      <div className="flex justify-center" data-aos="fade-right">
        <img
          src="/fond.png"
          alt="Illustration"
          className="w-full max-w-xs h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Caractéristiques principales */}
      <div>
        <h3 className="font-bold text-lg mb-6" data-aos="fade-up">Caractéristiques principales</h3>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center gap-3 mb-1">
            <FaMapMarkerAlt className="text-yellow-300" />
            <p className="font-bold">Suivi en temps réel</p>
          </div>
          <p className="ml-7 text-sm text-white/90">Suivez votre colis du retrait à la livraison</p>
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center gap-3 mb-1">
            <FaDollarSign className="text-green-300" />
            <p className="font-bold">Calcul automatique des prix</p>
          </div>
          <p className="ml-7 text-sm text-white/90">Prix précis selon la distance et le poids</p>
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center gap-3 mb-1">
            <FaStar className="text-orange-400" />
            <p className="font-bold">Système de notation des livreurs</p>
          </div>
          <p className="ml-7 text-sm text-white/90">Notez chaque expérience de livraison</p>
        </div>
      </div>

      {/* Avantages */}
      <div>
        <h3 className="font-bold text-lg mb-6" data-aos="fade-up">Avantages</h3>
        <div className="space-y-5">
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="100">
            <FaCheck className="text-lime-400" />
            <p>Facile à utiliser</p>
          </div>
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="200">
            <FaCheck className="text-lime-400" />
            <p>Rapidité de livraison</p>
          </div>
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="300">
            <FaCheck className="text-lime-400" />
            <p>Tarification transparente</p>
          </div>
          <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="400">
            <FaCheck className="text-lime-400" />
            <p>Sécurité des livraisons</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>


    </div>
  );
};

export default CaracteristiquesEtAvantages;
