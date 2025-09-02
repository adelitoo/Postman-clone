import { useState } from 'react';
import { SavedRequest } from '../types/types';

interface UseRequestStoreReturn {
  savedRequests: SavedRequest[];
  saveRequest: (request: Omit<SavedRequest, 'id'>, collectionId?: number) => Promise<SavedRequest>;
  updateRequest: (request: SavedRequest) => Promise<SavedRequest>;
  deleteRequest: (requestId: string) => Promise<void>;
  loadRequest: (requestId: string) => Promise<SavedRequest | undefined>;
  setActiveRequest: (request: SavedRequest | null) => void;
  activeRequest: SavedRequest | null;
  loading: boolean;
  error: string | null;
}

const API_URL = 'https://supsi-ticket.cloudns.org/supsi-http-client/bff';
const API_KEY = 'adel';

export const useRequestStore = (): UseRequestStoreReturn => {
  const [savedRequests, setSavedRequests] = useState<SavedRequest[]>([]);
  const [activeRequest, setActiveRequest] = useState<SavedRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveRequest = async (
    requestData: Omit<SavedRequest, 'id'>,
    collectionId?: number
  ): Promise<SavedRequest> => {
    setLoading(true);
    setError(null);
    try {
      if (!collectionId) {
        throw new Error('Collection ID is required to save a request');
      }

      const url = `${API_URL}/collections/${collectionId}/requests?apiKey=${API_KEY}`;
      
      // Format the request data to match the API's expectations
      const formattedRequest = {
        name: requestData.name || "New Request",
        uri: requestData.url || "",
        method: requestData.method || "GET",
        headers: requestData.headers.reduce((acc, header) => {
          if (header.key && header.value) {
            acc[header.key] = [header.value];
          }
          return acc;
        }, {} as Record<string, string[]>),
        body: requestData.bodyContent || "",
        collectionId: collectionId
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedRequest)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to save request: ${response.status} ${response.statusText}`);
      }
      
      const savedRequest = await response.json();
      setSavedRequests(prev => [...prev, savedRequest]);
      return savedRequest;
    } catch (error) {
      console.error('Failed to save request:', error);
      setError(error instanceof Error ? error.message : 'Failed to save request');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (request: SavedRequest): Promise<SavedRequest> => {
    setLoading(true);
    setError(null);
    try {
      // Format the request body to match server expectations
      const formattedRequest = {
        id: request.id,
        name: request.name,
        uri: request.url,
        method: request.method,
        headers: request.headers.reduce((acc, header) => {
          if (header.key && header.value) {
            acc[header.key] = [header.value];
          }
          return acc;
        }, {} as Record<string, string[]>),
        body: request.bodyContent || "",
        collectionId: request.collectionId,
        queryParams: request.queryParams.reduce((acc, param) => {
          if (param.key && param.value) {
            acc[param.key] = param.value;
          }
          return acc;
        }, {} as Record<string, string>)
      };

      const url = `https://supsi-ticket.cloudns.org/supsi-http-client/bff/requests/${request.id}?apiKey=${API_KEY}`;
      
      console.log('Updating request at URL:', url); // Debug log
      console.log('Request body:', formattedRequest); // Debug log

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedRequest)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to update request: ${response.status} ${response.statusText}`);
      }
      
      const updatedRequest = await response.json();
      
      setSavedRequests(prev => 
        prev.map(r => r.id === updatedRequest.id ? updatedRequest : r)
      );
      
      setActiveRequest(prev => 
        prev?.id === updatedRequest.id ? updatedRequest : prev
      );
      
      return updatedRequest;
    } catch (error) {
      console.error('Failed to update request', error);
      setError('Failed to update request');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (requestId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/requests/${requestId}?apiKey=${API_KEY}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete request');
      }
      
      setSavedRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Failed to delete request', error);
      setError('Failed to delete request');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadRequest = async (requestId: string): Promise<SavedRequest | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/requests/${requestId}?apiKey=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to load request');
      }
      const request = await response.json();
      return request;
    } catch (error) {
      console.error('Failed to load request', error);
      setError('Failed to load request');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    savedRequests,
    saveRequest,
    updateRequest,
    deleteRequest,
    loadRequest,
    setActiveRequest,
    activeRequest,
    loading,
    error
  };
};