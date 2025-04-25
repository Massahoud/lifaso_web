import React, { useState } from "react";

interface SingleChoiceQuestionProps {
  questionNumber: string;
  question: string;
  options: string[];
  onChanged: (selectedOption: string | null) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  questionNumber,
  question,
  options,
  onChanged,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedOption(value);
    onChanged(value);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Question text */}
      <div className="text-base font-medium mb-2">
        {questionNumber}. {question}
      </div>

      {/* Options with radio buttons */}
      {options.map((option) => (
        <div
          key={option}
          className="bg-gray-100 rounded-xl shadow-sm px-3 py-2"
        >
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={`single-choice-${questionNumber}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleChange(option)}
              className="accent-orange-500"
            />
            <span className="text-base font-medium">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;
