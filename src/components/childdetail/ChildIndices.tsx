import React, { useState, useEffect } from "react";

interface IndicatorsCardProps {
  indicators: string[]; // Tableau de chaînes
}

const indicatorLabels: Record<string, string> = {
  RUE: "EN RUE",
  BOURSE: "BENEFICIAIRE DE BOURSE",
  CENTRE: "PRISE EN CHARGE PAR UN CENTRE",
  SEXE: "ABUS SEXUEL",
  ARME: "EN CONTACT AVEC DES ARMES",
  OP: "ORPHELIN DE PERE",
  OM: "ORPHELIN DE MERE",
  PH: "PERSONNE HANDICAPEE",
  MH: "MERE HANDICAPEE",
};

const IndicatorsCard: React.FC<IndicatorsCardProps> = ({ indicators }) => {
  const [loading, setLoading] = useState(true);
  const [validIndicators, setValidIndicators] = useState<string[]>([]);

  useEffect(() => {
    // Simuler un délai pour le chargement des données
    setTimeout(() => {
      setValidIndicators(
        indicators.filter((indicator) =>
          Object.keys(indicatorLabels).includes(indicator)
        )
      );
      setLoading(false);
    }, 10000); // Simule un chargement d'1 seconde
  }, [indicators]);

  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Indicateurs à retenir
      </h2>

      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div className="text-blue-500 text-sm animate-pulse">
            Chargement des indicateurs...
          </div>
        ) : validIndicators.length > 0 ? (
          validIndicators.map((indicator, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-600 text-sm px-5 py-1 rounded-full"
            >
              {indicatorLabels[indicator]}
            </span>
          ))
        ) : (
          <p className="text-gray-500">Aucun indicateur disponible.</p>
        )}
      </div>
    </div>
  );
};

export default IndicatorsCard;
