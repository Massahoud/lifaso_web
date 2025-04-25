
import {  FaChevronRight } from "react-icons/fa";

export interface UsercardProps {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    telephone: string;
    statut: string;
    groupe: string;
    photo?: string;
    date_creation?: string;
    numero: string;
  }
  
  interface Props {
    user: UsercardProps;
    onClick?: () => void;
  }
  
  const UsersCard: React.FC<Props> = ({ user, onClick }) => {

  
 

  return (
    <div onClick={onClick} className="w-full flex flex-wrap md:flex-nowrap items-center p-4 rounded-2xl shadow-lg bg-white min-h-[88px] gap-y-4 md:gap-x-6">
      <div className="w-full md:w-[15%] flex flex-col items-start md:items-center">
        <span className="font-semibold text-gray-600 text-base">{user.numero}</span>
        <span className="text-xs text-gray-500">{user.date_creation}</span>
      </div>

      <div className="w-full md:w-[25%] flex items-center gap-x-4">
        <div
          className="w-14 h-14 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.photo})`,
            backgroundPosition: "top 30%",
          }}
        ></div>
        <div className="max-w-[180px]">
  <p className="font-semibold text-gray-600 text-base truncate whitespace-nowrap overflow-hidden text-ellipsis">
    {user.nom} {user.prenom}
  </p>
  <p className="text-xs text-gray-500 truncate">{user.email}</p>
</div>

      </div>

      <div className="w-full md:w-[15%] flex justify-start md:justify-center">
        {user.statut}
      </div>

      <div className="w-full md:w-[30%] text-gray-600 font-semibold text-xs text-left md:text-center">
        {user.groupe}
      </div>

      <div className=" hidden md:block w-full md:w-[5%] flex justify-end md:justify-center items-center">
       <FaChevronRight className="text-gray-500 text-2xl" />
      </div>
    </div>
  );
};

export default UsersCard;