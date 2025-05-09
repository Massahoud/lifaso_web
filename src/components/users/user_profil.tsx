import React, { useEffect, useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; 

import { getUserById, updateUser } from "../../services/user_services";
import CustomTextField from "../../components/ui/custom_textfield";
import { UsercardProps } from "../../components/users/users_card";
import { getGroupsByUserId } from "../../services/groups_service";

const UserProfile: React.FC = () => {
    const { id: userId } = useParams(); // 👈 Récupère l'id depuis l'URL
    const [user, setUser] = useState<UsercardProps | null>(null);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate(); // 👈 Hook pour naviguer

    useEffect(() => {
        if (!userId) return;
      
        const fetch = async () => {
          const data = await getUserById(userId);
      
          try {
            const groups = await getGroupsByUserId(userId);
            const groupNames = groups.map((g: any) => g.nom).join(", ");
            setUser({ ...data, groupe: groupNames });
          } catch (e) {
            setUser({ ...data, groupe: "Aucun groupe" });
          }
      
          if (data.photo) setImage(data.photo);
        };
      
        fetch();
      }, [userId]);
      

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (user) setUser({ ...user, [name]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            await updateUser(user.id, user, selectedFile ?? undefined);
        }
    };

   

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center p-4">
            {/* AppBar */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-white text-black flex items-center justify-between px-4 shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-orange-600 transition"
                >
                    <ArrowLeft className="w-8 h-8" />
                </button>
                <h1 className="text-lg font-semibold">Profile Utilisateur</h1>
                <div className="w-8" />
            </div>


            {/* Drawer */}
            <div className="w-full max-w-xl bg-white p-6  shadow-2xl overflow-y-auto m">
                {/* Header avec titre et bouton fermeture */}

                <form onSubmit={handleSubmit} className=" space-y-3 pt-16">
                    <div className="flex flex-col items-center">
                        <div className="relative w-30 h-30 rounded-full overflow-hidden group">
                            {image ? (
                                <img src={image.toString()} alt="profil" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl"></div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow">
                                <Camera className="w-4 h-4 text-red-500" />
                            </div>
                        </div>
                        <span className="text-xs text-red-500 mt-1">modifier</span>
                    </div>

                    <CustomTextField name="nom" label="Nom" value={user.nom} onChange={handleInputChange} />
                    <CustomTextField name="prenom" label="Prénom" value={user.prenom} onChange={handleInputChange} />
                    <CustomTextField name="email" label="Email" value={user.email} onChange={handleInputChange} />
                    <CustomTextField name="telephone" label="Téléphone" value={user.telephone} onChange={handleInputChange} />
                    <div className="w-full flex flex-col items-start">
                        <label className="text-sm text-gray-500 mt-1 self-start">Statut</label>
                        <div className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-800 text-sm text-left">
                            {user.statut}
                        </div>

                    </div>
                    <div className="w-full flex flex-col items-start">
                        <label className="text-sm text-gray-500 mt-1 self-start">Groupe</label>
                        <div className="w-full px-4 py-3 bg-gray-100 rounded-full text-gray-800 text-sm text-left">
                            {user.groupe}
                        </div>

                    </div>




                    <div className="flex justify-between gap-4 pt-4">
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full">
                            Enregistrer
                        </button>
                       
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
