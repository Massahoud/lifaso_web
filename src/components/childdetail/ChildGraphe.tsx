import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "../../../components/ui/card";
import { fetchQuartiles } from "../../services/childDetail_Service"; // Assurez-vous que le chemin est correct

interface RadarChartData {
  subject: string;
  value: number;
}

interface RadarChartProps {
  data: RadarChartData[]; // Données pour le graphique
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
  const [quartiles, setQuartiles] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    const loadQuartiles = async () => {
      try {
        const fetchedQuartiles = await fetchQuartiles();
        console.log("Quartiles formatés :", fetchedQuartiles);
        setQuartiles(fetchedQuartiles);
      } catch (error) {
        console.error("Erreur lors du chargement des quartiles :", error);
      }
    };

    loadQuartiles();
  }, []);
  const normalizeKey = (key: string): string => {
    return key.toLowerCase().replace(/ /g, "_");
  };
  console.log("Quartiles formatés :", quartiles);
data.forEach((item) => {
  console.log(`Clé normalisée pour ${item.subject} :`, normalizeKey(item.subject));
});
  // Fonction pour déterminer la couleur en fonction des quartiles
  const getColor = (subject: string, value: number): string => {
    const normalizedSubject = normalizeKey(subject); // Normaliser la clé
    const subjectQuartiles = quartiles[normalizedSubject];
  
    console.log(`Sujet : ${subject}, Valeur : ${value}`);
    console.log(`Quartiles pour ${normalizedSubject} :`, subjectQuartiles);
  
    if (!subjectQuartiles) {
      console.log(`Aucun quartile trouvé pour ${subject}, couleur par défaut appliquée.`);
      return "bg-gray-200"; // Couleur par défaut si les quartiles ne sont pas disponibles
    }
  
    if (value <= subjectQuartiles.quartile1) {
      console.log(`${subject} est inférieur ou égal à quartile1 (${subjectQuartiles.quartile1}), couleur verte.`);
      return "bg-green-500"; // Vert
    }
    if (value <= subjectQuartiles.quartile2) {
      console.log(`${subject} est inférieur ou égal à quartile2 (${subjectQuartiles.quartile2}), couleur jaune.`);
      return "bg-yellow-500"; // Jaune
    }
    if (value <= subjectQuartiles.quartile3) {
      console.log(`${subject} est inférieur ou égal à quartile3 (${subjectQuartiles.quartile3}), couleur orange.`);
      return "bg-orange-500"; // Orange
    }
  
    console.log(`${subject} est supérieur à quartile3 (${subjectQuartiles.quartile3}), couleur rouge.`);
    return "bg-red-500"; // Rouge
  };

  return (
    <Card className="w-full max-w-lg p-2">
      <CardContent className="flex flex-col items-center">
        {/* Graphique Radar */}
        <RadarChart cx={200} cy={130} outerRadius={100} width={400} height={240} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" className="text-sm" />
          <PolarRadiusAxis domain={[0, 5]} />
          <Radar name="Score" dataKey="value" stroke="#FF5733" fill="#FF5733" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>

        {/* Légende personnalisée */}
        <div className="mt-4 w-full text-center">
          <ul className="flex flex-wrap justify-center gap-4 mt-2">
            {data.map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-center w-30 h-5 rounded-full text-xs text-center ${getColor(
                  item.subject,
                  item.value
                )}`}
              >
                {item.subject}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadarChartComponent;