import { useState, useEffect } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { Collection, SavedRequest } from "../types/types";
import { SearchBar } from "./SearchBar";
import { CollectionItem } from "./CollectionItem";

interface SidebarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
  onRequestSelect: (request: SavedRequest) => void;
  onCreateNewRequest: (collectionId: number) => void;
  collections: Collection[];
  showSearch?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const Sidebar = ({
  isVisible,
  toggleVisibility,
  onRequestSelect,
  onCreateNewRequest,
  collections,
  showSearch = true,
  loading = false,
  error = null,
}: SidebarProps) => {
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(collections);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCollections(collections);
    } else {
      const filtered = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCollections(filtered);
    }
  }, [searchTerm, collections]);

  const handleRequestDelete = (collectionId: number, requestId: string) => {
    setFilteredCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              requests: collection.requests.filter((req) => req.id !== requestId),
            }
          : collection
      )
    );
  };

  return (
    <>
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed left-0 top-0 m-2 p-1 rounded hover:bg-gray-700 z-10"
          title="Show sidebar"
        >
          <FiMenu className="text-gray-300" />
        </button>
      )}

      <div
        className={`${
          isVisible ? "w-64" : "w-0"
        } bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden h-full`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isVisible && (
            <button
              onClick={toggleVisibility}
              className="p-1 rounded hover:bg-gray-700"
              title="Hide sidebar"
            >
              <FiX className="text-gray-300" />
            </button>
          )}
        </div>

        {isVisible && (
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            visible={showSearch}
          />
        )}

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-400">{error}</div>
          ) : filteredCollections.length === 0 ? (
            <div className="p-4 text-gray-400">No collections found</div>
          ) : (
            filteredCollections.map((collection) => (
              <CollectionItem
                key={collection.id}
                collection={collection}
                onToggle={(id) => {
                  setFilteredCollections((prev) =>
                    prev.map((c) =>
                      c.id === id ? { ...c, isOpen: !c.isOpen } : c
                    )
                  );
                }}
                onCreateNewRequest={onCreateNewRequest}
                onRequestSelect={onRequestSelect}
                onRequestDelete={handleRequestDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};
