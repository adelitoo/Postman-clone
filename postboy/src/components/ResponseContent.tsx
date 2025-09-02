import React from "react";
import { ResponseTab } from "../types/types";

interface ResponseContentProps {
  activeTab: ResponseTab;
  response: {
    body: any;
    headers: Record<string, string>;
    error?: string;
  };
  formatResponse: (
    body: any,
    headers: Record<string, string>
  ) => {
    type: string;
    content: any;
  };
}

const ResponseContent: React.FC<ResponseContentProps> = ({
  activeTab,
  response,
  formatResponse,
}) => {
  const renderBodyContent = () => {
    if (response.error) {
      return (
        <pre className="text-sm font-mono whitespace-pre-wrap break-words text-red-600 bg-red-50 p-4 rounded-md">
          {response.error}
        </pre>
      );
    }

    const formattedResponse = formatResponse(
      response.body || "",
      response.headers
    );

    if (!formattedResponse || !formattedResponse.type) {
      return (
        <pre className="text-sm font-mono whitespace-pre-wrap break-words text-gray-800 bg-gray-50 p-4 rounded-md">
          {formattedResponse ? formattedResponse.content : "Invalid response"}
        </pre>
      );
    }

    switch (formattedResponse.type) {
      case "image":
        return (
          <div className="flex items-center justify-center p-4">
            <img
              src={formattedResponse.content}
              alt="Response image"
              className="max-w-full max-h-[500px] rounded-lg shadow-sm"
            />
          </div>
        );
      case "html":
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-gray-800 bg-gray-50 p-4 rounded-md">
            {formattedResponse.content}
          </pre>
        );
      case "json":
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-gray-800 bg-gray-50 p-4 rounded-md">
            {JSON.stringify(formattedResponse.content, null, 2)}
          </pre>
        );
      case "pdf":
        return (
          <div className="p-4">
            <iframe
              src={formattedResponse.content}
              title="PDF Viewer"
              className="w-full h-[600px] border rounded-lg shadow-sm pdf-iframe"
              loading="lazy"
              role="document"
            />
          </div>
        );
      default:
        console.log("PDF src value:", formattedResponse.content);
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-gray-800 bg-gray-50 p-4 rounded-md">
            {formattedResponse.content}
          </pre>
        );
    }
  };

  const renderHeadersContent = () => (
    <div className="text-sm">
      <h3 className="font-medium mb-4 text-gray-900">Response Headers</h3>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-600 font-medium">
              Name
            </th>
            <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-600 font-medium">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(response.headers).map(([key, value]) => (
            <tr key={key} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-900">{key}</td>
              <td className="py-3 px-4 break-all text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRawContent = () => (
    <pre className="text-sm font-mono whitespace-pre-wrap break-words text-gray-800 bg-gray-50 p-4 rounded-md">
      {JSON.stringify(response, null, 2)}
    </pre>
  );

  const renderPreviewContent = () => {
    const formattedResponse = formatResponse(
      response.body || "",
      response.headers
    );
    if (formattedResponse.type === "html") {
      return (
        <iframe
          srcDoc={formattedResponse.content}
          className="w-full h-full border border-gray-200 rounded-md"
          title="HTML Preview"
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 h-full">
      {activeTab === "body" && (
        <div className="h-full">{renderBodyContent()}</div>
      )}
      {activeTab === "preview" && (
        <div className="h-full">{renderPreviewContent()}</div>
      )}
      {activeTab === "headers" && renderHeadersContent()}
      {activeTab === "raw" && renderRawContent()}
    </div>
  );
};

export default ResponseContent;
