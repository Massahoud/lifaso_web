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
    <div className="flex flex-col space-y-2">
      {/* Question Number and Text */}
      <div className="text-base font-medium mb-2">
        {questionNumber}. {question}
      </div>

      {/* Options with Checkbox */}
      {options.map((option) => (
        <div
          key={option}
          className="bg-gray-100 rounded-xl shadow-sm px-3 py-2"
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => toggleSelection(option)}
              className="accent-orange-500"
            />
            <span className="text-base font-medium">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
