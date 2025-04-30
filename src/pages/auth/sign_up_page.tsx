import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CustomTextField from '../../components/ui/custom_textfield';
import backgroundImg from '../../assets/noomdo.jpg';
import logoImg from '../../assets/asdm.png';
import { createUser } from '../../services/user_services';
import CustomDialog from '../../components/ui/CustomDialog'; // Chemin à ajuster si besoin

interface DecodedToken {
  email: string;
  statut: string;
  organismeid: string;
}

const SignupWithInvitePage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [statut, setStatut] = useState('');
  const [email, setEmail] = useState('');
  const [organismeid, setOrganismeid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      try {
       
        const decoded = jwtDecode<DecodedToken>(token);
        setEmail(decoded.email || '');
       
        setStatut(decoded.statut || '');
        setOrganismeid(decoded.organismeid || '');
       
      } catch (err) {
        setErrorMessage('Token invalide ou expiré.');
        setHasError(true);
      }
    } else {
      setErrorMessage('Aucun token fourni dans l’URL.');
      setHasError(true);
    }
  }, [location.search]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setHasError(false);
    setErrorMessage('');
  
    if (nom && prenom && telephone.length >= 8 && password.length >= 6) {
      setIsLoading(true);
      try {
        const newUser = {
          nom,
          prenom,
          email,
          mot_de_passe: password,
          telephone,
          statut,
          organismeid,
        };
  
        await createUser(newUser, image ?? undefined);
  
        // Afficher le dialogue de succès
        setShowSuccessDialog(true);
      } catch (err: any) {
        setHasError(true);
  
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('Erreur lors de la création de l’utilisateur.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setHasError(true);
      setErrorMessage('Veuillez remplir tous les champs correctement.');
    }
  };
  

  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }} />
      <div className="w-2/5 bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-10 py-8">
          <div className="flex justify-center mb-4">
            <img src={logoImg} alt="logo" className="h-36" />
          </div>
          <p className="text-center text-gray-600 mb-4">Complétez vos informations pour continuer.</p>

          <div className="flex justify-center mb-4">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500">📷</span>
                )}
              </div>
              <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <CustomTextField name='nom' label="Nom" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
          <CustomTextField name='prenom' label="Prénom" placeholder="Entrez votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          <CustomTextField name='telephone' label="Téléphone" placeholder="Votre numéro de téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          <CustomTextField name='motdepasse' label="Mot de passe" type="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />

          {hasError && <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition"
          >
            {isLoading ? 'Chargement...' : "S'inscrire"}
          </button>
        </div>
      </div>
      {showSuccessDialog && (
  <CustomDialog
    title="Inscription réussie"
    content="Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
    buttonText="Aller à la connexion"
    onClose={() => setShowSuccessDialog(false)}
    onConfirm={() => navigate('/')}
  />
)}

    </div>
  );
};

export default SignupWithInvitePage;
