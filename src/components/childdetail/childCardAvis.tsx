import React from "react";
import { Pencil } from "lucide-react";

const UserCard = () => {
  return (
    <div className="  max-w-lg  p-1">
      {/* Ligne supérieure : Image, Nom, Rôle, et Icône d'édition */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="David Demange"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              David Demange
            </h2>
            <p className="text-sm text-gray-500">
              Admin, Consultant, Enquêteur
            </p>
          </div>
        </div>

        {/* Icône d'édition */}
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Pencil size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Ligne de séparation */}
      <div className="border-t border-gray-200 mt-2 pt-2">
        <p className="text-gray-600 text-sm leading-relaxed">
          Kwame vit avec ses parents dans une habitation louée, située dans les
          zones non aménagées du secteur 05. Sa mère travaille comme
          couturière, tandis que son père, sans emploi stable, effectue
          occasionnellement des travaux de déchargement de camions à l’autogare.
          En plus de la distance qui le sépare de l'école, Kwame doit souvent
          aider ses parents pour subvenir aux besoins de la famille. Chaque
          matin, il se lève avant l'aube pour aller chercher de l'eau au puits
          communal, une tâche essentielle dans leur quartier...
        </p>
      </div>
    </div>
  );
};

export default UserCard;
