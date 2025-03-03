import React from "react";
import { Pencil } from "lucide-react"; // Icône d'édition

const ResponsesCard = () => {
  const responses = [
    { id: 1, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 2, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 3, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 4, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 5, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 6, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 7, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 8, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 9, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 10, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
    { id: 11, question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", answer: "Oui" },
  ];

  return (
    <div className=" p-4">
      {/* En-tête avec le titre et l'icône d'édition */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Réponses aux questions</h2>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Pencil className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Liste des réponses avec scroll */}
      <div className="max-h-100 overflow-y-auto">
        {responses.map((item) => (
          <div key={item.id} className="border-b py-2 flex justify-between items-center">
            <span className="font-regular text-gray-600">Q{item.id}. {item.question}</span>
            <span className="font-regular text-gray-900 ml-4">{item.answer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsesCard;
