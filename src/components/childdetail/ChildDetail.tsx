import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { MapPin, Calendar, User, Book, Phone } from "lucide-react";
import imageName from '../../assets/image.png';

const ChildDetail = ({  }) => {
  return (
    <div className=" w-5/5 space-y-5">
      <div className="relative rounded-2xl">
        <img
          src={imageName}
          alt={'name'}
          className="w-full h-130 object-cover rounded-xl "
        />
        <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
          Nouveau
        </Badge>
      </div>
      <Card className="mt-4 rounded-2xl shadow-lg bg-white">
        <p className="text-gray-500 flex items-center">
          < div className="w-5 h-5 mr-2" /> Réalisée le {'date'}
        </p>
        <p className=" flex items-center">
          <Calendar className="w-5 h-4 mr-2" /> {'age'} ans
        </p>
        <p className="flex items-center mt-2">
          <User className="w-5 h-4 mr-2" />{'gender'}
        </p>
        <p className="flex items-center mt-2">
          <MapPin className="w-5 h-4 mr-2" /> {'location'}
        </p>
        <p className="flex items-center mt-2">
          <Book className="w-5 h-4 mr-2" /> {'classLevel'}
        </p>
        <div className="mt-4 border-t pt-2">
          <p className="text-gray-600 font-semibold">Contact</p>
          <p className="font-medium">{'contactName'}</p>
          <p className="flex items-center text-blue-500 mt-1">
            <Phone className="w-4 h-4 mr-2" /> {'contactPhone'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChildDetail;