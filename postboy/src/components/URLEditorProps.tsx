import React from 'react';
import { useURLEditor } from '../hooks/useURLEditor';

interface URLEditorProps {
  onSend: (method: string, url: string) => void;
  initialMethod?: string;
  initialUrl?: string;
}

const URLEditor: React.FC<URLEditorProps> = ({
  onSend,
  initialMethod = 'GET',
  initialUrl = '',
}) => {
  const {
    selectedMethod,
    url,
    isDropdownOpen,
    methods,
    handleMethodSelect,
    handleUrlChange,
    toggleDropdown,
    getMethodColor,
  } = useURLEditor(initialMethod, initialUrl);

  const handleSend = () => {
    if (url.trim()) {
      onSend(selectedMethod, url);
    }
  };

  return (
    <div className="w-full flex items-center border border-gray-300 rounded-md shadow-sm bg-white">
      {/* Method Selector */}
      <div className="relative">
        <button
          type="button"
          className={`${getMethodColor(
            selectedMethod
          )} px-4 py-2 rounded-l-md min-w-24 flex items-center justify-between font-medium`}
          onClick={toggleDropdown}
        >
          <span>{selectedMethod}</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {methods.map((method) => (
              <button
                key={method}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  method === selectedMethod ? 'font-medium' : ''
                }`}
                onClick={() => handleMethodSelect(method)}
              >
                {method}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* URL Input */}
      <input
        type="text"
        className="flex-1 px-4 py-2 focus:outline-none"
        placeholder="Enter request URL"
        value={url}
        onChange={handleUrlChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />

      {/* Send Button */}
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-md font-medium transition-colors"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default URLEditor;
