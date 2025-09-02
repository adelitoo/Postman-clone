import React from 'react';
import { ResponseTab } from '../types/types';

interface ResponseTabsProps {
  activeTab: ResponseTab;
  onTabChange: (tab: ResponseTab) => void;
  hasPreview: boolean;
}

const ResponseTabs: React.FC<ResponseTabsProps> = ({ activeTab, onTabChange, hasPreview }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6 justify-between items-center">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === "body"
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("body")}
          >
            Body
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === "headers"
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("headers")}
          >
            Headers
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === "raw"
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onTabChange("raw")}
          >
            Raw
          </button>
        </div>
        {hasPreview && (
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === "preview"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onTabChange("preview")}
          >
            Preview
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponseTabs; 