import React from 'react';
import { BodyType, BodyContent, KeyValuePair } from '../types/types';
import KeyValueEditor from './KeyValueEditor';

interface RequestBodyEditorProps {
  bodyType: BodyType;
  bodyContent: BodyContent;
  onBodyTypeChange: (type: BodyType) => void;
  onBodyContentChange: (content: BodyContent) => void;
}

const RequestBodyEditor: React.FC<RequestBodyEditorProps> = ({
  bodyType,
  bodyContent,
  onBodyTypeChange,
  onBodyContentChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Request Body</h3>
        <select
          value={bodyType}
          onChange={(e) => onBodyTypeChange(e.target.value as BodyType)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="none">None</option>
          <option value="raw">Raw</option>
          <option value="form-data">Form Data</option>
          <option value="x-www-form-urlencoded">x-www-form-urlencoded</option>
        </select>
      </div>
      {bodyType === "raw" && (
        <textarea
          value={typeof bodyContent === "string" ? bodyContent : ""}
          onChange={(e) => onBodyContentChange(e.target.value)}
          className="w-full h-48 p-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter request body..."
        />
      )}
      {(bodyType === "form-data" || bodyType === "x-www-form-urlencoded") && (
        <KeyValueEditor
          items={Array.isArray(bodyContent) ? bodyContent : []}
          onAdd={() => {
            const newItem: KeyValuePair = {
              id: Date.now().toString(),
              key: "",
              value: "",
              enabled: true,
            };
            onBodyContentChange([
              ...(Array.isArray(bodyContent) ? bodyContent : []),
              newItem,
            ]);
          }}
          onUpdate={(id, field, value) => {
            const updatedItems = (Array.isArray(bodyContent) ? bodyContent : []).map(
              (item) => (item.id === id ? { ...item, [field]: value } : item)
            );
            onBodyContentChange(updatedItems);
          }}
          onRemove={(id) => {
            const filteredItems = (Array.isArray(bodyContent) ? bodyContent : []).filter(
              (item) => item.id !== id
            );
            onBodyContentChange(filteredItems);
          }}
          title="Body Parameters"
        />
      )}
    </div>
  );
};

export default RequestBodyEditor; 