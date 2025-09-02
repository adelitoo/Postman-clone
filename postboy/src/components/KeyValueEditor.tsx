import React from "react";
import { KeyValuePair } from "../types/types";

export interface KeyValueEditorProps {
  items: KeyValuePair[];
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: "key" | "value" | "enabled",
    value: string | boolean
  ) => void;
  onRemove: (id: string) => void;
  title: string;
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({
  items = [],
  onAdd,
  onUpdate,
  onRemove,
  title,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{title}</h3>
        <button
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex space-x-2 items-center">
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={(e) => onUpdate(item.id, "enabled", e.target.checked)}
              className="h-4 w-4"
            />
            <input
              type="text"
              value={item.key}
              onChange={(e) => onUpdate(item.id, "key", e.target.value)}
              placeholder="Key"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => onUpdate(item.id, "value", e.target.value)}
              placeholder="Value"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyValueEditor;
