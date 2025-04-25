import React, { useState } from "react";
import { sendInvite } from "../../services/user_services"; // Assure-toi que ce service existe bien
import CustomTextField from "../../components/ui/custom_textfield";

const SendInviteForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInvite = async () => {
    if (isLoading) return;
    if (!email || !selectedRole) {
      setHasError(true);
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setIsLoading(true);
    try {
      await sendInvite(email, selectedRole);
      onClose();
      alert("L'utilisateur a été invité avec succès !");
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
      <CustomTextField name="email" placeholder="Entrez l'e-mail de l'utilisateur" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
     

      <p className="font-semibold mb-2">Rôle</p>
      <RoleOption
        title="Super Admin"
        description="Consulter, modifier et commenter les enquêtes."
        value="superadmin"
      />
      <RoleOption
        title="Admin"
        description="Modifier un utilisateur, le modifier ou le consulter."
        value="admin"
      />
      <RoleOption
        title="Enquêteur"
        description="Faire une enquête, modifier une enquête."
        value="enqueteur"
      />

      <button
        onClick={handleSendInvite}
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full mt-6"
      >
        {isLoading ? "Envoi..." : "Créer et envoyer un e-mail d'accès"}
      </button>
    </div>
  );
};

export default SendInviteForm;
