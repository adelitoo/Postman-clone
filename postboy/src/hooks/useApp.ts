import { useState, useEffect } from "react";
import { SavedRequest, Collection } from "../types/types";
import { useRequestStore } from "./useRequestStore";

const API_URL = "https://supsi-ticket.cloudns.org/supsi-http-client/bff/collections";

export const useApp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    savedRequests,
    saveRequest,
    updateRequest,
    activeRequest,
    setActiveRequest,
  } = useRequestStore();

  const fetchCollections = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      const data: Collection[] = await response.json();
      
      const collectionsWithRequests = await Promise.all(
        data.map(async (collection) => {
          try {
            const requestsResponse = await fetch(
              `https://supsi-ticket.cloudns.org/supsi-http-client/bff/collections/${collection.id}/requests?apiKey=adel`
            );
            if (!requestsResponse.ok) {
              throw new Error(`Failed to fetch requests for collection ${collection.id}`);
            }
            const requestsData = await requestsResponse.json();
            
            const existingCollection = collections.find(c => c.id === collection.id);
            return {
              ...collection,
              isOpen: existingCollection?.isOpen || true,
              requests: requestsData
            };
          } catch (err) {
            console.error(`Error fetching requests for collection ${collection.id}:`, err);
            return {
              ...collection,
              isOpen: false,
              requests: []
            };
          }
        })
      );
      
      setCollections(collectionsWithRequests);
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleRequestSelect = (request: SavedRequest) => {
    setActiveRequest(request);
  };

  const handleCreateNewRequest = async (collectionId: number) => {
    const newRequest: Omit<SavedRequest, "id"> = {
      name: "New Request",
      method: "GET",
      url: "",
      queryParams: [],
      headers: [],
      collectionId,
    };

    try {
      const savedRequest = await saveRequest(newRequest, collectionId);
      setActiveRequest(savedRequest);
      await fetchCollections();
    } catch (err) {
      console.error("Failed to create new request:", err);
      setError("Failed to create new request");
    }
  };

  const handleSaveRequest = async (request: Omit<SavedRequest, "id">, collectionId: number) => {
    try {
      const savedRequest = await saveRequest(request, collectionId);
      await fetchCollections();
      return savedRequest;
    } catch (err) {
      console.error("Failed to save request:", err);
      setError("Failed to save request");
      throw err;
    }
  };

  const handleUpdateRequest = async (request: SavedRequest) => {
    try {
      const updatedRequest = await updateRequest(request);
      await fetchCollections();
      return updatedRequest;
    } catch (err) {
      console.error("Failed to update request:", err);
      setError("Failed to update request");
      throw err;
    }
  };

  return {
    sidebarVisible,
    collections,
    loading,
    error,
    savedRequests,
    activeRequest,
    toggleSidebar,
    handleRequestSelect,
    handleCreateNewRequest,
    handleSaveRequest,
    handleUpdateRequest,
  };
}; 