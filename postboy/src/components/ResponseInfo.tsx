import React from 'react';

interface ResponseInfoProps {
  status: number;
  statusText: string;
  time: number;
  size: number;
}

const ResponseInfo: React.FC<ResponseInfoProps> = ({ status, statusText, time, size }) => {
  const getStatusClass = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 300 && status < 400) return 'bg-yellow-100 text-yellow-800';
    if (status >= 400 && status < 500) return 'bg-red-100 text-red-800';
    if (status >= 500) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <span className="text-gray-600 mr-3">Status:</span>
          <span className={`px-3 py-1.5 rounded-md text-sm font-medium ${getStatusClass(status)}`}>
            {status} {statusText}
          </span>
        </div>
        <div className="text-gray-600 text-sm">
          Time: {time} ms
        </div>
        <div className="text-gray-600 text-sm">
          Size: {size} B
        </div>
      </div>
    </div>
  );
};

export default ResponseInfo; 