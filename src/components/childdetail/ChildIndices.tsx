import React from "react";

const IndicatorsCard = () => {
  const indicators = [
    "BÉNÉFICIAIRE DE BOURSE",
    "ABUS SEXUEL",
    "EN CONTACT AVEC DES ARMES",
    "EN RUE",
    "MÈRE HANDICAPÉ",
    "ORPHELIN DE MÈRE",
    
  ];

  return (
    <div className=" ">
      {/* Titre */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Indicateurs à retenir
      </h2>

      {/* Liste des indicateurs */}
      <div className="flex flex-wrap gap-2">
        {indicators.map((indicator, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-600 text-sm px-5 py-1 rounded-full"
          >
            {indicator}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IndicatorsCard;
