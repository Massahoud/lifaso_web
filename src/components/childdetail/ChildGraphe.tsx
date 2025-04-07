import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "../../../components/ui/card";


interface RadarChartData {
  subject: string;
  value: number;
}

interface RadarChartProps {
  data: RadarChartData[];
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
 
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
                className="flex items-center justify-center w-30 h-5 rounded-full bg-gray-200 text-xs text-center"
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