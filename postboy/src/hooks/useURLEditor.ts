import { useState, useEffect } from 'react';

export const useURLEditor = (initialMethod: string = 'GET', initialUrl: string = '') => {
  const [selectedMethod, setSelectedMethod] = useState<string>(initialMethod);
  const [url, setUrl] = useState<string>(initialUrl);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    setSelectedMethod(initialMethod);
    setUrl(initialUrl);
  }, [initialMethod, initialUrl]);

  const methods = ['GET', 'POST', 'PUT', 'DELETE'];

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setIsDropdownOpen(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-600 text-white';
      case 'POST':
        return 'bg-green-600 text-white';
      case 'PUT':
        return 'bg-amber-600 text-white';
      case 'DELETE':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return {
    selectedMethod,
    url,
    isDropdownOpen,
    methods,
    handleMethodSelect,
    handleUrlChange,
    toggleDropdown,
    getMethodColor,
  };
}; 