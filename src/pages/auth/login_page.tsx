import React from 'react';
import LoginForm from '../../components/auth/login_form';
import téléchargement from '../../assets/asdm.png';
import noomdo from '../../assets/noomdo.jpg';

const LoginPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex">
      {/* Section image (grands écrans uniquement) */}
      <div className="hidden md:flex flex-7">
        <img
          src={noomdo}
          alt="Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Section formulaire */}
      <div className="flex-1 md:flex-3 flex items-center justify-center bg-white px-10 py-6">
        <div className="max-w-md w-full space-y-6 ">
          <img src={téléchargement} alt="Logo" className="h-36 mx-auto" />
          <p className="text-gray-700 text-base text-center">
            Pour une prise en charge équitable des enfants et des jeunes
            vulnérables au BF.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
