import { useState } from "react";

type ResponseTab = "params" | "headers" | "body" | "raw" | "preview";

export const useResponseView = () => {
  const [activeTab, setActiveTab] = useState<ResponseTab>("params");
  const [lastResponseTab, setLastResponseTab] = useState<ResponseTab>("body");

  const switchToTab = (tab: ResponseTab, isResponse = false) => {
    if (isResponse) {
      setLastResponseTab(tab);
    }
    setActiveTab(tab);
  };

  const detectResponseType = (data: any, headers: Record<string, string>): string => {
    // Check content-type header first
    const contentType = headers['content-type']?.toLowerCase() || '';
    
    if (contentType.includes('image/')) {
      return 'image';
    } else if (contentType.includes('text/html')) {
      return 'html';
    } else if (contentType.includes('application/json')) {
      return 'json';
    } else if (contentType.includes('text/')) {
      return 'text';
    }
    
    // Fallback type detection
    if (typeof data === 'string') {
      // Check if it's a base64 encoded image
      if (data.match(/^data:image\/(png|jpeg|gif|webp);base64,/)) {
        return 'image';
      }
      if (data.startsWith('<') && data.endsWith('>')) {
        return 'html';
      }
      try {
        JSON.parse(data);
        return 'json';
      } catch {
        return 'text';
      }
    }
    
    return 'text';
  };

  const formatResponse = (data: any, headers: Record<string, string> = {}): { type: string; content: any } => {
    if (data === null || data === undefined) {
      return { type: 'text', content: '' };
    }

    const type = detectResponseType(data, headers);
    
    switch (type) {
      case 'image':
        // If the data is already a base64 data URL, return it as is
        if (typeof data === 'string' && data.match(/^data:image\/(png|jpeg|gif|webp);base64,/)) {
          return { type: 'image', content: data };
        }
        // If it's binary data, convert it to a base64 data URL
        const contentType = headers['content-type'] || 'image/png';
        const base64Data = typeof data === 'string' ? data : btoa(String.fromCharCode(...new Uint8Array(data)));
        return { 
          type: 'image', 
          content: `data:${contentType};base64,${base64Data}`
        };
      case 'html':
        return { type: 'html', content: data };
      case 'json':
        return { 
          type: 'json', 
          content: typeof data === 'string' ? JSON.parse(data) : data 
        };
      default:
        return { type: 'text', content: String(data) };
    }
  };

  const getStatusClass = (status: number): string => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
    if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800";
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800";
    if (status >= 500) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return { 
    activeTab, 
    switchToTab,
    lastResponseTab,
    formatResponse, 
    getStatusClass 
  };
};