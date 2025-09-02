import React from 'react';
import { ResponseTab, KeyValuePair, BodyType, BodyContent } from '../types/types';
import KeyValueEditor from './KeyValueEditor';
import RequestTabs from './RequestTabs';
import RequestBodyEditor from './RequestBodyEditor';

interface RequestConfigProps {
  activeTab: ResponseTab;
  onTabChange: (tab: ResponseTab) => void;
  queryParams: KeyValuePair[];
  requestHeaders: KeyValuePair[];
  bodyType: BodyType;
  bodyContent: BodyContent;
  onQueryParamAdd: () => void;
  onQueryParamUpdate: (id: string, field: "key" | "value" | "enabled", value: string | boolean) => void;
  onQueryParamRemove: (id: string) => void;
  onRequestHeaderAdd: () => void;
  onRequestHeaderUpdate: (id: string, field: "key" | "value" | "enabled", value: string | boolean) => void;
  onRequestHeaderRemove: (id: string) => void;
  onBodyTypeChange: (type: BodyType) => void;
  onBodyContentChange: (content: BodyContent) => void;
}

const RequestConfig: React.FC<RequestConfigProps> = ({
  activeTab,
  onTabChange,
  queryParams,
  requestHeaders,
  bodyType,
  bodyContent,
  onQueryParamAdd,
  onQueryParamUpdate,
  onQueryParamRemove,
  onRequestHeaderAdd,
  onRequestHeaderUpdate,
  onRequestHeaderRemove,
  onBodyTypeChange,
  onBodyContentChange,
}) => {
  return (
    <>
      <RequestTabs activeTab={activeTab} onTabChange={onTabChange} />
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        {activeTab === "params" && (
          <KeyValueEditor
            items={queryParams}
            onAdd={onQueryParamAdd}
            onUpdate={onQueryParamUpdate}
            onRemove={onQueryParamRemove}
            title="Query Parameters"
          />
        )}
        {activeTab === "headers" && (
          <KeyValueEditor
            items={requestHeaders}
            onAdd={onRequestHeaderAdd}
            onUpdate={onRequestHeaderUpdate}
            onRemove={onRequestHeaderRemove}
            title="Request Headers"
          />
        )}
        {activeTab === "body" && (
          <RequestBodyEditor
            bodyType={bodyType}
            bodyContent={bodyContent}
            onBodyTypeChange={onBodyTypeChange}
            onBodyContentChange={onBodyContentChange}
          />
        )}
      </div>
    </>
  );
};

export default RequestConfig; 