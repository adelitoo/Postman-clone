import React, { useState, useEffect } from "react";
import URLEditor from "./URLEditorProps";
import { useRequest } from "../hooks/useRequests";
import { useResponseView } from "../hooks/useResponseView";
import SaveRequestDialog from "./SaveRequestDialog";
import ResponseInfo from "./ResponseInfo";
import ResponseTabs from "./ResponseTabs";
import ResponseContent from "./ResponseContent";
import RequestConfig from "./RequestConfig";
import {
  SavedRequest,
  Collection,
  BodyType,
  BodyContent,
} from "../types/types";
import { FiSave } from "react-icons/fi";
import internet from "../assets/internet.png";

interface MainContentProps {
  collections: Collection[];
  onSaveRequest: (request: Omit<SavedRequest, "id">, collectionId: number) => Promise<SavedRequest>;
  onUpdateRequest: (request: SavedRequest) => Promise<SavedRequest>;
  activeRequest: any | null;
}

const MainContent: React.FC<MainContentProps> = ({
  collections,
  onSaveRequest,
  onUpdateRequest,
  activeRequest,
}) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [bodyType, setBodyType] = useState<BodyType>("none");
  const [bodyContent, setBodyContent] = useState<BodyContent>("");
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
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
  } = useRequest();

  const {
    activeTab,
    switchToTab,
    lastResponseTab,
    formatResponse,
  } = useResponseView();

  useEffect(() => {
    if (activeRequest) {
      console.log(activeRequest);
      setMethod(activeRequest.method);
      setUrl(activeRequest.url || activeRequest.uri || "");
      
      const headersArray = Array.isArray(activeRequest.headers) 
        ? activeRequest.headers 
        : Object.entries(activeRequest.headers || {}).map(([key, value]) => ({
            id: Date.now().toString() + Math.random(),
            key,
            value: Array.isArray(value) ? value[0] : value,
            enabled: true
          }));

      setQueryParams(activeRequest.queryParams || []);
      setRequestHeaders(headersArray);
      setBodyType(activeRequest.bodyType || "none");
      setBodyContent(activeRequest.bodyContent || activeRequest.body || "");
    }
  }, [activeRequest, setQueryParams, setRequestHeaders]);

  const handleSendRequest = async (
    requestMethod: string,
    requestUrl: string
  ) => {
    if (!requestUrl.trim()) return;

    setMethod(requestMethod);
    setUrl(requestUrl);

    try {
      await sendRequest(requestMethod, requestUrl, bodyType, bodyContent);
      switchToTab(lastResponseTab, true);
    } catch (error) {
      switchToTab("body", true);
    }
  };

  const handleSaveRequest = () => {
    setIsSaveDialogOpen(true);
  };

  const handleSaveConfirm = async (name: string, collectionId: number) => {
    try {
      setSaveError(null);
      
      if (!collectionId) {
        throw new Error('Please select a collection to save the request');
      }

      const formattedHeaders = requestHeaders
        .filter(header => header.enabled && header.key)
        .map(header => ({
          id: header.id,
          key: header.key,
          value: header.value,
          enabled: header.enabled
        }));

      const formattedQueryParams = queryParams
        .filter(param => param.enabled && param.key)
        .map(param => ({
          id: param.id,
          key: param.key,
          value: param.value,
          enabled: param.enabled
        }));

      const requestToSave: Omit<SavedRequest, "id"> = {
        name: name || '',
        method: method || 'GET',
        url: url || '',
        queryParams: formattedQueryParams,
        headers: formattedHeaders,
        bodyType: bodyType || 'none',
        bodyContent: bodyContent || '',
        collectionId: collectionId,
      };

      if (activeRequest) {
        await onUpdateRequest({
          ...requestToSave,
          id: activeRequest.id,
        });
      } else {
        await onSaveRequest(requestToSave, collectionId);
      }

      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error('Error saving request:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save request');
    }
  };

  const hasPreview = response?.body && formatResponse(response.body, response.headers).type === 'html';

  return (
    <div className="flex flex-col h-full bg-white">
      <SaveRequestDialog
        isOpen={isSaveDialogOpen}
        onClose={() => {
          setIsSaveDialogOpen(false);
          setSaveError(null);
        }}
        onSave={handleSaveConfirm}
        collections={collections}
        initialCollectionId={activeRequest?.collectionId}
        initialName={activeRequest?.name || ""}
        isEditing={!!activeRequest}
        error={saveError}
      />

      <div className="p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="flex-1">
            <URLEditor
              onSend={handleSendRequest}
              initialMethod={method}
              initialUrl={url}
            />
          </div>
          <button
            onClick={handleSaveRequest}
            className="ml-4 p-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            title="Save request"
          >
            <FiSave className="text-blue-600" />
          </button>
        </div>
      </div>

      <RequestConfig
        activeTab={activeTab}
        onTabChange={switchToTab}
        queryParams={queryParams}
        requestHeaders={requestHeaders}
        bodyType={bodyType}
        bodyContent={bodyContent}
        onQueryParamAdd={addQueryParam}
        onQueryParamUpdate={updateQueryParam}
        onQueryParamRemove={removeQueryParam}
        onRequestHeaderAdd={addRequestHeader}
        onRequestHeaderUpdate={updateRequestHeader}
        onRequestHeaderRemove={removeRequestHeader}
        onBodyTypeChange={setBodyType}
        onBodyContentChange={setBodyContent}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {response && (
          <>
            <ResponseInfo
              status={response.status}
              statusText={response.statusText}
              time={response.time}
              size={response.body ? (typeof response.body === 'string' ? response.body.length : JSON.stringify(response.body).length) : 0}
            />
            <ResponseTabs
              activeTab={activeTab}
              onTabChange={(tab) => switchToTab(tab, true)}
              hasPreview={hasPreview}
            />
          </>
        )}

        <div className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : response ? (
            <ResponseContent
              activeTab={activeTab}
              response={response}
              formatResponse={formatResponse}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <img src={internet} alt="internet" className="w-16 h-16 mb-6" />
              <p className="text-lg font-medium">
                Send a request to see the response
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Enter a URL and click Send to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
