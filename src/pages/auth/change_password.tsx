import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomTextField from '../../components/ui/custom_textfield';
import backgroundImg from '../../assets/noomdo.jpg';
import logoImg from '../../assets/asdm.png';

const ResetPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!token) {
      setMessage('Token introuvable dans l’URL.');
      setHasError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setMessage(null);
    setHasError(false);

    try {
      const response = await fetch('https://api.enquetesoleil.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage('Mot de passe réinitialisé avec succès.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(`Erreur : ${data.message}`);
        setHasError(true);
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Vérifiez votre connexion internet.");
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div
        className="w-3/5 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      <div className="w-2/5 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="flex justify-center">
            <img src={logoImg} alt="logo" className="h-36" />
          </div>
          <p className="text-center text-gray-600">
            Complétez vos informations pour continuer.
          </p>

          <CustomTextField
            name="password"
            label="Nouveau mot de passe"
            placeholder="Votre nouveau mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={hasError}
          />

          <CustomTextField
            name="confirmPassword"
            label="Confirmer le mot de passe"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={hasError}
          />

          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              onClick={resetPassword}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition"
            >
              Réinitialiser le mot de passe
            </button>
          )}

          {message && (
            <p className={`text-center text-sm ${hasError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
