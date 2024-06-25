import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch }) => (
  <input
    type="text"
    placeholder="검색"
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
    value={searchQuery}
    onChange={handleSearch}
  />
);

export default SearchBar;
