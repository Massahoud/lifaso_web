import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IoChevronBack } from "react-icons/io5";
interface ScatterData {
  total: number;
  totale: number;
  numero: string;
  id: string;
}

const ScatterPlotPage: React.FC = () => {
  const [data, setData] = useState<ScatterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNumero, setSelectedNumero] = useState<string | null>(null);
  const [isPointHighlighted, setIsPointHighlighted] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedNumero) {
      timer = setInterval(() => {
        setIsPointHighlighted((prev) => !prev);
      }, 500);
    }
    return () => clearInterval(timer);
  }, [selectedNumero]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token non trouvé");

      const res = await axios.get("https://soleilmainapi.vercel.app/api/datanuage", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = res.data
        .filter(
          (item: any) =>
            item.moyenneali &&
            item.moyenneviol &&
            item.numero !== undefined &&
            item.id !== undefined
        )
        .map((item: any) => ({
          total: parseFloat(item.moyenneali),
          totale: parseFloat(item.moyenneviol),
          numero: item.numero.toString(),
          id: item.id.toString(),
        }));

      setData(formatted);
    } catch (e: any) {
      if (e.response?.status === 401 || e.response?.status === 403) {
        alert("Session expirée, veuillez vous reconnecter.");
        navigate("/login");
      } else {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedNumero(search);
  };

  const redirectToDetail = (id: string) => {
    navigate(`/child-detail/${id}`);
  };

  const renderCustomShape = (props: any) => {
    const { cx, cy, payload } = props;
    const isSelected = selectedNumero === payload.numero;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected && isPointHighlighted ? 10 : 5}
        fill={isSelected ? (isPointHighlighted ? "red" : "orange") : "orange"}
        stroke="#333"
        strokeWidth={isSelected ? 2 : 1}
      />
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* AppBar avec retour et recherche */}
      <div className="bg-white px-4 py-3 shadow flex items-center justify-between">
        <button 
               onClick={() => navigate(-1)}
               className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition cursor-pointer"
               title="Retour"
               aria-label="Retour"
             >
               <IoChevronBack size={24} />
             </button>
        <form onSubmit={handleSearch} className="flex ">
          <input
            type="text"
            placeholder="Rechercher un numéro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-1 border border-gray-300 rounded-l-full outline-none"
          />
          <button type="submit" className="px-4 py-1 bg-orange-500 text-white rounded-r-full">
            Rechercher
          </button>
        </form>
      </div>

      {/* ScatterChart */}
      {isLoading ? (
        <div className="text-center text-gray-500 mt-10">Chargement...</div>
      ) : (
        <div className="w-full h-[86vh] flex justify-center items-center">
          <ResponsiveContainer width="90%" height="100%">
            <ScatterChart>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="totale"
                name="Alimentation"
                domain={[0, 5]}
                tickCount={6}
                label={{
                  value: "Alimentation / Pauvreté / Éducation",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                type="number"
                dataKey="total"
                name="Violence"
                domain={[0, 5]}
                tickCount={6}
                label={{
                  value: "Violence / Santé physique / Cadre de vie",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                name="Enfants"
                data={data}
                shape={renderCustomShape}
                onClick={(point) => redirectToDetail(point.payload.id)}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ScatterPlotPage;
