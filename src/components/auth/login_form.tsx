import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth_service';
import CustomTextField from '../../components/ui/custom_textfield';
import Cookies from 'js-cookie'; // ⬅️ Importation de js-cookie

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    const savedEmail = Cookies.get('savedEmail') || '';
    const savedPassword = Cookies.get('savedPassword') || '';
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setMotDePasse(savedPassword);
      setRememberMe(true);
    }
  }, []);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

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
        Cookies.set('savedEmail', email, { expires: 7 }); 
        Cookies.set('savedPassword', motDePasse, { expires: 7 });
      } else {
        Cookies.remove('savedEmail');
        Cookies.remove('savedPassword');
      }

      
      navigate('/childs'); // Redirection vers le formulaire après connexion réussie
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 400 || status === 401) {
          setErrorMessage('Email ou mot de passe incorrect.');
        } else if (status === 429) {
          setErrorMessage('Trop de tentatives. Veuillez réessayer plus tard.');
        } else {
          setErrorMessage(data.message || 'Une erreur est survenue.');
        }
      } else {
        setErrorMessage('Erreur de connexion au serveur.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        name="motdepasse"
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
            className="form-checkbox h-5 w-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 checked:bg-orange-500"
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
