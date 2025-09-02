import { Collection } from "../types/types";
import { SavedRequest } from "../types/types";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import CollectionRequests from "./CollectionRequests";

interface CollectionItemProps {
  collection: Collection; 
  onToggle: (collectionId: number) => void;
  onCreateNewRequest: (collectionId: number) => void;
  onRequestSelect: (request: SavedRequest) => void;
  onRequestDelete?: (collectionId: number, requestId: string) => void;
}

export const CollectionItem = ({
  collection,
  onToggle,
  onCreateNewRequest,
  onRequestSelect,
  onRequestDelete,
}: CollectionItemProps) => {
  const handleRequestDelete = (requestId: string) => {
    if (onRequestDelete) {
      onRequestDelete(collection.id, requestId);
    }
  };

  return (
    <div className="mb-2">
      <div className="flex items-center px-4 py-2 hover:bg-gray-700">
        <button
          onClick={() => onToggle(collection.id)}
          className="flex items-center flex-1 cursor-pointer"
        >
          {collection.isOpen ? (
            <FiChevronDown className="mr-2" />
          ) : (
            <FiChevronRight className="mr-2" />
          )}
          <span>{collection.name}</span>
        </button>
        <button
          onClick={() => onCreateNewRequest(collection.id)}
          className="p-1 hover:bg-gray-600 rounded"
          title="Create new request"
        >
          <FiPlus className="text-gray-300" />
        </button>
      </div>
      {collection.isOpen && (
        <div className="ml-6 pl-2 border-l border-gray-700">
          <CollectionRequests
            requests={collection.requests}
            onRequestSelect={onRequestSelect}
            onRequestDelete={handleRequestDelete}
          />
        </div>
      )}
    </div>
  );
};
