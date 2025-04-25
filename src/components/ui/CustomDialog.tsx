import React from "react";
import { X } from "lucide-react"; // pour l'icône "close"

interface CustomDialogProps {
  title: string;
  content: string;
  buttonText: string;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  content,
  buttonText,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-[450px] p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <p className="text-gray-700 mt-4">{content}</p>
        <button
          onClick={onConfirm}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full text-base font-medium transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CustomDialog;
