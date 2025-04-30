import React, { useEffect, useState } from "react";
import { X, Camera } from "lucide-react";
import { getUserById, updateUser, deleteUser } from "../../services/user_services";
import CustomTextField from "../../components/ui/custom_textfield";
import { UsercardProps } from "../../components/users/users_card";
import { getGroupsByUserId } from "../../services/groups_service";

interface Props {
  userId: string;
  onClose: () => void;
}

const UpdateUserDrawer: React.FC<Props> = ({ userId, onClose }) => {
  const [user, setUser] = useState<UsercardProps | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Nouveau
  const [loading, setLoading] = useState<boolean>(true);
  
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
      setLoading(false); // 👈 Fin du chargement ici
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
    setSelectedFile(file); // Garde le fichier pour l'envoi
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
        await updateUser(user.id, user, selectedFile ?? undefined);
        // Important : passer le fichier ici
      onClose();
    }
  };
  

  const handleDelete = async () => {
    if (user && confirm("Supprimer l'utilisateur ?")) {
      await deleteUser(user.id);
      onClose();
    }
  };
  const Loader = () => (
    <div className="fixed inset-0 z-50 flex ">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" ></div>
      <div className="w-full md:w-[30%] bg-white p-6 shadow-lg overflow-y-auto">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-orange-500 font-medium">Chargement...</span>
      </div>
    </div>
  );
  
  if (loading) return <Loader />;
  if (!user) return null;
  

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay flou */}
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

      {/* Drawer */}
      <div className="w-full md:w-[30%] bg-white p-6 shadow-lg overflow-y-auto">
        {/* Header avec titre et bouton fermeture */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Modifier utilisateur</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
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
<label htmlFor="statut" className="text-sm text-gray-500 mb-1">Statut</label>
          <select
            name="statut"
            
            value={user.statut}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-full"
          >
            <option value="">-- Statut --</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
            <option value="enqueteur">Enquêteur</option>
            <option value="visiteur">Visiteur</option>
          </select>

          <CustomTextField name="groupe" label="Groupe" value={user.groupe} onChange={handleInputChange} />

          <div className="flex justify-between gap-4 pt-4">
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full">
              Enregistrer
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-full"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDrawer;
