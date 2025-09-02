// components/SaveRequestDialog.tsx
import React from "react";
import { Collection } from "../types/types";
import { useSaveRequestDialog } from "../hooks/useSaveRequestDialog";

interface SaveRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, collectionId: number) => void;
  collections: Collection[];
  initialCollectionId?: number;
  initialName?: string;
  isEditing?: boolean;
  error?: string | null;
}

const SaveRequestDialog: React.FC<SaveRequestDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  collections,
  initialCollectionId,
  initialName = "",
  isEditing = false,
  error = null,
}) => {
  const {
    requestName,
    setRequestName,
    selectedCollectionId,
    setSelectedCollectionId,
    handleSave,
    handleOverlayClick,
  } = useSaveRequestDialog({
    isOpen,
    onClose,
    onSave,
    collections,
    initialCollectionId,
    initialName,
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.25)] flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Request" : "Save Request"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="requestName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Request Name
          </label>
          <input
            type="text"
            id="requestName"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter request name"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="collection"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Collection
          </label>
          <select
            id="collection"
            value={selectedCollectionId}
            onChange={(e) => setSelectedCollectionId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {collections.length === 0 ? (
              <option value="">No collections available</option>
            ) : (
              collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!requestName.trim() || !selectedCollectionId}
            className={`px-4 py-2 text-white rounded
              ${
                !requestName.trim() || !selectedCollectionId
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRequestDialog;
