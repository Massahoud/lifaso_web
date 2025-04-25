import React from "react";

interface CustomTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  error = false,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm text-gray-500 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
          error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-orange-300'
        }`}
          />
    </div>
  );
};

export default CustomTextField;
