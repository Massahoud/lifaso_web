import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../components/ui/custom_textfield';
import backgroundImg from '../../assets/noomdo.jpg';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        'https://api.enquetesoleil.com/api/auth/request-reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setMessage('Un email de réinitialisation a été envoyé.');
      } else {
        setMessage(`Erreur : ${data.message}`);
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Vérifiez votre connexion internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* ✅ Background image */}
      <img
        src={backgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 " />

      {/* ✅ Form */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6 space-y-6">
          {/* Header with close button */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Réinitialiser mon mot de passe
            </h2>
            <button
              className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
              onClick={() => navigate(-1)}
            >
              <span className="text-black font-bold">&times;</span>
            </button>
          </div>

          <CustomTextField
          name='email'
            label="E-mail"
            placeholder="Votre e-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit Button */}
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              onClick={handleReset}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition"
            >
              Réinitialiser
            </button>
          )}

          {message && (
            <p className="text-center text-sm text-red-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
