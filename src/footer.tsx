import { FaPhone, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Colonne Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="flex items-center gap-3 mb-3">
            <FaPhone />
            <span>00 00 00 00</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaWhatsapp />
            <span>00 00 00 00</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope />
            <span>lifaso@liFaso.com</span>
          </div>
        </div>

        {/* Colonne Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Réseau sociaux</h3>
          <div className="flex items-center gap-3 mb-3">
            <SiTiktok />
            <span>Tiktok</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaFacebookF />
            <span>Facebook</span>
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram />
            <span>Instagramme</span>
          </div>
        </div>

        {/* Colonne Partenaire */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Partenaire</h3>
          <img
            src="/orange.png"
            alt="Partenaire Orange"
            className="w-16 h-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
