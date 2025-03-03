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

const data = [
  { subject: "CADRE DE VIE", value: 4 },
  { subject: "PAUVRETÉ", value: 2.9 },
  { subject: "VIOLENCE", value: 3.9 },
  { subject: "SANTÉ PHYSIQUE", value: 3.9 },
  { subject: "ÉDUCATION", value: 2.9 },
  { subject: "ALIMENTATION", value: 1.9 },
];

const RadarChartComponent = () => {
  return (
    <Card className="w-full max-w-lg p-2 ">
      <CardContent className="flex justify-center">
        <RadarChart cx={200} cy={130} outerRadius={100} width={400} height={240} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" className="text-sm" />
          <PolarRadiusAxis domain={[0, 4]} />
          <Radar name="Score" dataKey="value" stroke="#FF5733" fill="#FF5733" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      </CardContent>
    </Card>
  );
};

export default RadarChartComponent;
