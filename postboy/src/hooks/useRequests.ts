import { useState } from "react";
import { KeyValuePair, RequestResponse } from "../types/types";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RequestResponse | null>(null);
  const [queryParams, setQueryParams] = useState<KeyValuePair[]>([
    { id: '1', key: '', value: '', enabled: false } 
  ]);  
  const [requestHeaders, setRequestHeaders] = useState<KeyValuePair[]>([
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
    { id: '2', key: 'Accept', value: 'application/json', enabled: true }
  ]);

  const addQueryParam = () => {
    setQueryParams([...queryParams, { id: Date.now().toString(), key: '', value: '', enabled: true }]);
  };

  const updateQueryParam = (id: string, field: 'key' | 'value' | 'enabled', newValue: string | boolean) => {
    setQueryParams(queryParams.map(param => 
      param.id === id ? { ...param, [field]: newValue } : param
    ));
  };

  const removeQueryParam = (id: string) => {
    setQueryParams(queryParams.filter(param => param.id !== id));
  };

  const addRequestHeader = () => {
    setRequestHeaders([...requestHeaders, { id: Date.now().toString(), key: '', value: '', enabled: true }]);
  };

  const updateRequestHeader = (id: string, field: 'key' | 'value' | 'enabled', newValue: string | boolean) => {
    setRequestHeaders(requestHeaders.map(header => 
      header.id === id ? { ...header, [field]: newValue } : header
    ));
  };

  const removeRequestHeader = (id: string) => {
    setRequestHeaders(requestHeaders.filter(header => header.id !== id));
  };

  const parseUrlQueryParams = (url: string) => {
    try {
      const urlObj = new URL(url);
      const params = Array.from(urlObj.searchParams.entries()).map(([key, value], index) => ({
        id: (index + 1).toString(),
        key,
        value,
        enabled: true
      }));
      return params;
    } catch (error) {
      return [];
    }
  };

  const buildUrlWithParams = (baseUrl: string) => {
    const url = new URL(baseUrl);
    queryParams
      .filter(param => param.enabled && param.key)
      .forEach(param => {
        url.searchParams.append(param.key, param.value);
      });
    return url.toString();
  };

  const getActiveHeaders = () => {
    return requestHeaders
      .filter(header => header.enabled && header.key)
      .reduce((acc, header) => {
        acc[header.key] = header.value;
        return acc;
      }, {} as Record<string, string>);
  };

  const sendRequest = async (method: string, url: string, bodyType?: string, bodyContent?: any) => {
    if (!url.trim()) return;
    

    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Parse and set query parameters from the URL
      const parsedParams = parseUrlQueryParams(url);
      if (parsedParams.length > 0) {
        setQueryParams(parsedParams);
      }

      const finalUrl = buildUrlWithParams(url);
      const headers = getActiveHeaders();

      let requestBody;
      if (method !== "GET" && bodyType && bodyContent) {
        switch (bodyType) {
          case "raw":
            requestBody = bodyContent;
            break;
          case "form-data":
            const formData = new FormData();
            if (Array.isArray(bodyContent)) {
              bodyContent.forEach((item: any) => {
                if (item.enabled && item.key) {
                  formData.append(item.key, item.value);
                }
              });
            }
            requestBody = formData;
            break;
          case "x-www-form-urlencoded":
            const urlEncoded = new URLSearchParams();
            if (Array.isArray(bodyContent)) {
              bodyContent.forEach((item: any) => {
                if (item.enabled && item.key) {
                  urlEncoded.append(item.key, item.value);
                }
              });
            }
            requestBody = urlEncoded;
            break;
        }
      }

      if (method === "DELETE" && finalUrl.includes("lotr/random-character")) {
        const response = await fetch(finalUrl, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const responseHeaders = Object.fromEntries(response.headers.entries());

        setResponse({
          method,
          url: finalUrl,
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseData,
          time: responseTime,
        });
        return;
      }

      if (method === "PUT" && finalUrl.includes("lotr/random-character")) {
        const response = await fetch(finalUrl, {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const responseHeaders = Object.fromEntries(response.headers.entries());

        setResponse({
          method,
          url: finalUrl,
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseData,
          time: responseTime,
        });
        return;
      }

      if (method === "POST" && finalUrl.includes("lotr/random-character")) {
        const response = await fetch(finalUrl, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const responseHeaders = Object.fromEntries(response.headers.entries());

        setResponse({
          method,
          url: finalUrl,
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseData,
          time: responseTime,
        });
        return;
      }

      

      if (method === "GET" && finalUrl.includes("lotr/random-character")) {
        const response = await fetch(finalUrl, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const responseHeaders = Object.fromEntries(response.headers.entries());

        setResponse({
          method,
          url: finalUrl,
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseData,
          time: responseTime,
        });
        return;
      }

      if (method === "GET") {
        const proxyRequest = {
          method,
          uri: finalUrl,
          headers: {
            "Accept": ["application/json"]
          }
        };

        const proxyResponse = await fetch(
          "https://supsi-ticket.cloudns.org/supsi-http-client/proxy/execute",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*"
            },
            body: JSON.stringify(proxyRequest),
          }
        );

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (!proxyResponse.ok) {
          throw new Error(`HTTP error! status: ${proxyResponse.status}`);
        }

        const responseText = await proxyResponse.text();
        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = {
            status: proxyResponse.status,
            statusText: proxyResponse.statusText,
            headers: Object.fromEntries(proxyResponse.headers.entries()),
            body: responseText,
          };
        }

        setResponse({
          method,
          url: finalUrl,
          status: responseData.status || proxyResponse.status,
          statusText: responseData.statusText || "",
          headers: responseData.headers || {},
          body: responseData.body || "",
          time: responseTime,
        });
        return;
      }

      // For all other requests, use the proxy
      const proxyRequest = {
        method,
        uri: finalUrl,
        headers: Object.entries(headers).reduce((acc, [key, value]) => {
          acc[key] = [value];
          return acc;
        }, {} as Record<string, string[]>),
        body: requestBody,
      };

      console.log(proxyRequest);

      const proxyResponse = await fetch(
        "https://supsi-ticket.cloudns.org/supsi-http-client/proxy/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
          },
          body: JSON.stringify(proxyRequest),
        }
      );

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const contentType = proxyResponse.headers.get('content-type') || '';

      let responseType: 'text' | 'image' | 'json' | 'html' | 'pdf' | undefined = 'text';
      
      if (contentType.includes('application/pdf')) {
        responseType = 'pdf';
      } else if (contentType.includes('image/')) {
        responseType = 'image';
      } else if (contentType.includes('application/json')) {
        responseType = 'json';
      } else if (contentType.includes('text/html')) {
        responseType = 'html';
      } else if (contentType.includes('text/plain')) {
        responseType = 'text';
      }
      
      let responseData;
      let body;
      
      // Handle binary responses (images, PDFs)
      if (contentType.includes('image/') || 
          contentType.includes('application/octet-stream') || 
          contentType.includes('application/pdf')) { // Added PDF back to binary handling
        const blob = await proxyResponse.blob();
        const reader = new FileReader();
      
        body = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      
        responseData = {
          status: proxyResponse.status,
          statusText: proxyResponse.statusText,
          headers: Object.fromEntries(proxyResponse.headers.entries()),
          body
        };
      } else {
        // Handle text-based responses
        const responseText = await proxyResponse.text();
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = {
            status: proxyResponse.status,
            statusText: proxyResponse.statusText,
            headers: Object.fromEntries(proxyResponse.headers.entries()),
            body: responseText,
          };
        }
      }
      
      if (!responseData) {
        throw new Error('Invalid response data');
      }
      
      setResponse({
        method,
        url: finalUrl,
        status: responseData.status || proxyResponse.status,
        statusText: responseData.statusText || "",
        headers: responseData.headers || {},
        body: responseData.body || "",
        time: responseTime,
        type: responseType,
      });

    } catch (error) {
      const endTime = Date.now();
      setResponse({
        method,
        url,
        status: 0,
        statusText: "Failed",
        headers: {},
        body: error instanceof Error ? error.message : "Unknown error",
        time: endTime - startTime,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    response,
    queryParams,
    requestHeaders,
    addQueryParam,
    updateQueryParam,
    removeQueryParam,
    addRequestHeader,
    updateRequestHeader,
    removeRequestHeader,
    sendRequest,
    setQueryParams,    
    setRequestHeaders,
  };
};