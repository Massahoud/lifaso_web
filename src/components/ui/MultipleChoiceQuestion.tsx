import React, { useState } from "react";

interface MultipleChoiceQuestionProps {
  questionNumber: string;
  question: string;
  options: string[];
  onChanged: (selectedOptions: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionNumber,
  question,
  options,
  onChanged,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSelection = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    onChanged(newSelectedOptions);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Question Number and Text */}
      <div className="fontSize: '16px', fontWeight: 500">
        {questionNumber}. {question}
      </div>

      {/* Options with Checkbox */}
      {options.map((option) => (
        <div
          key={option}
          className="bg-gray-100 rounded-sm shadow-sm px-3 py-2"
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => toggleSelection(option)}
              className="accent-orange-500"
              style={{ transform: 'scale(1.5)', marginRight: '8px' }} // Agrandir la checkbox
            />
            <span className="fontSize: '16px', fontWeight: 500">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
