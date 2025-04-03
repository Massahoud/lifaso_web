import React, { useState, useEffect } from "react";
import { getUserRole } from "../../services/role";
import { jsPDF } from "jspdf";

interface ResponseItem {
  numero: string;
  question_text: string;
  reponse_text: string;
}

interface ResponsesCardProps {
  responses: ResponseItem[];
}
export const exportToPDF = (responses: ResponseItem[]) => {
 

  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  let y = 20;

 
  doc.setFontSize(16);
  doc.text("Réponses aux questions", 10, y);
  y += 10; 


  responses.forEach((item) => {
    if (y > pageHeight - 20) { 
      doc.addPage(); 
      y = 20; 
    }

    doc.setFontSize(12);
    doc.text(`${item.numero}. ${item.question_text}`, 10, y);
    y += 7; 
    doc.setFontSize(10);
    doc.text(`Réponse: ${item.reponse_text}`, 10, y);
    y += 10; 
  });


  doc.save("reponses.pdf");
};
export const ResponsesCard: React.FC<ResponsesCardProps> = ({ responses }) => {
  const [, setUserStatus] = useState<string | null>(null);

  useEffect(() => {
    getUserRole().then(setUserStatus);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Réponses aux questions</h2>
      </div>

      <div className="max-h-100 overflow-y-auto">
        {responses.length > 0 ? (
          responses.map((item, index) => (
            <div key={index} className="border-b py-2 flex justify-between items-center">
              <span className="font-regular text-gray-600">
                {item.numero}. {item.question_text}
              </span>
              <span className="font-regular text-gray-900 ml-4">{item.reponse_text}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune réponse disponible.</p>
        )}
      </div>
    </div>
  );
};