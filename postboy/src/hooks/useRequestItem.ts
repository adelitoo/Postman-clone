import { useState, useRef, useEffect } from 'react';
import { SavedRequest } from '../types/types';

export const useRequestItem = (request: SavedRequest, onDelete?: (requestId: string) => void) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `https://supsi-ticket.cloudns.org/supsi-http-client/bff/requests/${request.id}?apiKey=adel`,
        { method: 'DELETE' }
      );
      
      if (response.ok && onDelete) {
        onDelete(request.id);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
    setIsMenuOpen(false);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return {
    isMenuOpen,
    menuRef,
    handleMenuClick,
    handleDelete,
    getMethodColor,
  };
}; 