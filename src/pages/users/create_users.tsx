import React, { useState, useEffect } from "react";
import { sendInvite } from "../../services/user_services";
import { getAllOrganismes } from "../../services/organisme_services";
import CustomTextField from "../../components/ui/custom_textfield";

interface Organisme {
  id: string;
  nom: string;
}

const SendInviteForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedOrganisme, setSelectedOrganisme] = useState<string>("");
  const [organismes, setOrganismes] = useState<Organisme[]>([]);
  const [, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOrganismes = async () => {
      try {
        const data = await getAllOrganismes();
       
        setOrganismes(data);
      } catch (err) {
        console.error(" Erreur de chargement des organismes:", err);
      }
    };
    fetchOrganismes();
  }, []);
  
  

  const handleSendInvite = async () => {
    if (!email || !selectedRole || !selectedOrganisme) {
      setHasError(true);
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    try {
      await sendInvite(email, selectedRole, selectedOrganisme);
      console.log("email", email);
      console.log("selectedRole", selectedRole);
      console.log("selectedOrganisme", selectedOrganisme);
      alert("L'utilisateur a été invité avec succès !");
      onClose();
    } catch (err) {
      alert(`Erreur: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const RoleOption = ({ title, description, value }: { title: string; description: string; value: string }) => {
    const selected = selectedRole === value;
    return (
      <div
        onClick={() => setSelectedRole(value)}
        className={`cursor-pointer p-4 rounded border ${
          selected ? "border-orange-500 bg-orange-100" : "border-gray-300"
        } mb-2`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div>
            {selected ? (
              <span className="text-orange-500">&#x2714;</span>
            ) : (
              <span className="text-gray-400">&#x25CB;</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md bg-white p-6 rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Créer un utilisateur</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <p className="text-sm text-gray-600 mb-4">Complétez ces informations pour créer l'utilisateur.</p>

      <CustomTextField
        name="email"
        placeholder="Entrez l'e-mail de l'utilisateur"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className="font-semibold mb-2 mt-4">Organisme</p>
      <select
        value={selectedOrganisme}
        onChange={(e) => setSelectedOrganisme(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">-- Sélectionnez un organisme --</option>
        {organismes.map((org) => (
          <option key={org.id} value={org.id}>
            {org.nom}
          </option>
        ))}
      </select>

      <p className="font-semibold mb-2">Rôle</p>
      <RoleOption title="Super Admin" description="Consulter, modifier et commenter les enquêtes." value="superadmin" />
      <RoleOption title="Admin" description="Modifier un utilisateur, le modifier ou le consulter." value="admin" />
      <RoleOption title="Enquêteur" description="Faire une enquête, modifier une enquête." value="enqueteur" />

      <button
        onClick={handleSendInvite}
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full mt-6"
      >
        {isLoading ? "Envoi..." : "Créer et envoyer un e-mail d'accès"}
      </button>
    </div>
  );
};

export default SendInviteForm;
