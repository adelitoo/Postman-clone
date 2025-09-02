import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  visible?: boolean;
}

export const SearchBar = ({ searchTerm, onSearchChange, visible = true }: SearchBarProps) => {
  if (!visible) return null;

  return (
    <div className="p-4 border-b border-gray-700">
      <div className="relative">
        <input
          type="text"
          placeholder="Search collections..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>
  );
};
