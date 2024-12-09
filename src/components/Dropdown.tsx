import React, { useState } from 'react';

interface DropdownProps {
  options: { value: string; label: string }[]; 
  selectedValue: "posts" | "comments";  
  onChange: (value: "posts" | "comments") => void;  
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "posts" | "comments";  
    onChange(value);
  };

  return (
    <div className="mb-4 w-64">
      <select
        id="content-type"
        value={selectedValue}
        className="border border-gray-300 rounded px-3 py-2 w-full"
        onChange={handleChange} 
      >
        {options
          .filter(option => option.label !== 'Select content type')
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};


export default Dropdown;
