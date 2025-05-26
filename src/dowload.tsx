import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from '../components/ui/button';
const DownloadSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-16">
      <div className="flex flex-col lg:flex-row  gap-20 w-full max-w-6xl">
        {/* Colonne gauche */}
        <div className="flex-[1.5]" data-aos="fade-up">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-semibold">
              Obtenez plus avec notre <span className="text-teal-700">Application</span>
            </h2>
            <p className="mt-4 text-gray-700 max-w-lg mx-auto lg:mx-0">
              Aussi bien pensée pour les expéditeurs que les transporteurs, notre application vous suit partout ! Disponible dès maintenant en scannant le QR code. Allez-y, c’est gratuit.
            </p>
          </div>

          {/* Espacement entre texte et QR + boutons */}
          <div className="mt-30 flex flex-col sm:flex-row items-center gap-8">
            {/* QR Code agrandi */}
            <img
              src="/qrcode.png"
              alt="QR Code"
              className="w-80 h-80"
            />

            {/* Boutons de téléchargement */}
            <div className="flex flex-col gap-15">
              
          <Button variant="outline" className="bg-white text-black flex flex-col items-center gap-2 p-2 rounded-md h-20">
            Télécharger sur App Store
            <img src="/apple.png" alt="App Store" className="w-40 h-25" />
          </Button>
          <Button variant="outline" className="bg-white text-black flex flex-col items-center gap-2 p-2 rounded-md h-20">
            Télécharger sur Google Play
            <img src="/google.png" alt="Google Play" className="w-40 h-25" />
          </Button>
      
            </div>
          </div>
        </div>

        {/* Colonne droite : image téléphone */}
     <div className="flex-[1]" data-aos="fade-up" data-aos-delay="300">
          <img
            src="/livraison.png"
            alt="Aperçu de l’application"
            className="w-72 sm:w-86 rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
