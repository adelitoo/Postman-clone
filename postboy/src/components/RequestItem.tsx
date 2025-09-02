import { FiMoreHorizontal } from "react-icons/fi";
import { SavedRequest } from "../types/types";
import { useRequestItem } from "../hooks/useRequestItem";

interface RequestItemProps {
  request: SavedRequest;
  onSelect: (request: SavedRequest) => void;
  onDelete?: (requestId: string) => void;
}

export const RequestItem = ({ request, onSelect, onDelete }: RequestItemProps) => {
  const {
    isMenuOpen,
    menuRef,
    handleMenuClick,
    handleDelete,
    getMethodColor,
  } = useRequestItem(request, onDelete);

  return (
    <div
      className="flex items-center px-2 py-1.5 hover:bg-gray-700 cursor-pointer rounded mr-2 relative"
      onClick={() => onSelect(request)}
    >
      <span
        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded mr-2 ${getMethodColor(
          request.method
        )}`}
      >
        {request.method}
      </span>
      <span className="truncate flex-1">{request.name}</span>
      <div ref={menuRef}>
        <button
          onClick={handleMenuClick}
          className="p-1 hover:bg-gray-600 rounded ml-2"
        >
          <FiMoreHorizontal className="text-gray-300" />
        </button>
        
        {isMenuOpen && (
          <div 
            className="absolute right-0 top-full mt-1 w-48 bg-gray-700 rounded-md shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
