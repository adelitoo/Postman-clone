import React from 'react';
import { ResponseTab } from '../types/types';

interface RequestTabsProps {
  activeTab: ResponseTab;
  onTabChange: (tab: ResponseTab) => void;
}

const RequestTabs: React.FC<RequestTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex px-6">
        <button
          className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === "params"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onTabChange("params")}
        >
          Params
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
            activeTab === "body"
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onTabChange("body")}
        >
          Body
        </button>
      </div>
    </div>
  );
};

export default RequestTabs; 