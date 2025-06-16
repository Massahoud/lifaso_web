
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
const steps = [
  {
    title: "1. Inscription",
    desc: "Remplis le formulaire d’inscription avec tes informations personnelles.",
    img: "/livraison.png",
  },
  {
    title: "2. Validation",
    desc: "Notre équipe vérifie tes documents et valide ton profil.",
    img: "/map.png",
  },
  {
    title: "3. Formation",
    desc: "Suis une courte formation pour bien démarrer.",
    img: "/livraison.png",
  },
  {
    title: "4. Commence à livrer",
    desc: "Tu es prêt ! Reçois tes premières missions et commence à livrer.",
    img: "/map.png",
  },
];

const backgroundImages = [
  "/fond.png",
  "/fond2.png",
  "/fond1.png",
];
export default function DevenirLivreur() {
  const [selected, setSelected] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false, // ✅ chaque fois qu'on scroll dans la section
  });

  // Recharge AOS sur chaque update du DOM (utile si tu ajoutes des sections dynamiquement)
  AOS.refresh();
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change toutes les 4 secondes
    return () => clearInterval(interval);
  }, []);
// ...existing code...
  return (
     <div className="py-12 bg-white overflow-x-hidden" data-aos="fade-right">
        
      <h2 className="text-2xl font-semibold text-center text-teal-800 mb-2">
        Devenir livreur?
      </h2>
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-16 py-8 gap-6 md:gap-12 bg-white">
      {/* Colonne gauche : étapes avec image de fond */}
      <div
        data-aos="fade-right"
        className="flex-1 w-full max-w-full md:max-w-2xl min-h-[28rem] md:min-h-[42rem] h-full flex items-center justify-center relative rounded-xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImages[bgIndex]}')`,
        }}
      >
        {/* Overlay pour lisibilité */}
        <div className="absolute inset-0 bg-emerald-900/10 z-0" />
        <div className="relative z-10 p-4 sm:p-6 w-full">
         
          <ol className="space-y-4 sm:space-y-6">
            {steps.map((step, idx) => (
              <li
                key={idx}
                className={`p-3 sm:p-4 rounded-lg cursor-pointer transition border ${
                  selected === idx
                    ? "bg-white/80 text-emerald-900 border-emerald-900"
                    : "bg-white/40 text-white border-transparent"
                }`}
                onMouseEnter={() => setSelected(idx)}
                onClick={() => setSelected(idx)}
              >
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm">{step.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>

     
        
      <div
        data-aos="fade-left"
        className="hidden md:flex flex-1 items-center justify-center min-h-[18rem] md:min-h-[32rem] w-full max-w-full"
      >
        <img
          src={steps[selected].img}
          alt={steps[selected].title}
          className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain  transition-all duration-500"
        />
      </div>
    </div>
    </div>
  );

}