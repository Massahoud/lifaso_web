import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth_service';
import CustomTextField from '../../components/ui/custom_textfield';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail') || '';
    const savedPassword = localStorage.getItem('savedPassword') || '';
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setMotDePasse(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      try {
        return decodeURIComponent(decodeURIComponent(redirect));
      } catch (error) {
        console.error('Erreur de décodage d’URL :', redirect);
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // validation simple
    if (!email || !motDePasse) {
      setErrorMessage('Veuillez remplir tous les champs.');
      setIsLoading(false);
      return;
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setErrorMessage('Veuillez entrer un email valide.');
      setIsLoading(false);
      return;
    }
    if (motDePasse.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      setIsLoading(false);
      return;
    }

    try {
      await AuthService.login(email, motDePasse);

      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', motDePasse);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }

      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        navigate(`/redirect?to=${encodeURIComponent(redirectUrl)}`);
      } else {
        navigate('/users');
      }
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      setErrorMessage(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <CustomTextField
       name="email"
        label="Email"
       
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre email"
        error={!!errorMessage && !email}
      />
      <CustomTextField
        label="Mot de passe"
        name='motdepasse'
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        placeholder="Entrez votre mot de passe"
        error={!!errorMessage && !motDePasse}
      />

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 text-orange-500">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Se souvenir de moi
        </label>

        <button
          type="button"
          onClick={() => navigate('/motdepasse_oublie')}
          className="text-orange-500 text-sm"
        >
          Mot de passe oublié ?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-orange-500 text-white font-bold py-3 px-6 w-full rounded-full hover:bg-orange-600 transition"
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </button>
    </form>
  );
};

export default LoginForm;
