import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mb-8">
      <input
        id="query"
        type="text"
        className="w-full p-5 text-base bg-white border-2 border-gray-200 rounded-xl outline-none shadow-sm transition-all duration-300 focus:border-red-600 hover:border-red-600"
        placeholder="Enter the title of the video"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
