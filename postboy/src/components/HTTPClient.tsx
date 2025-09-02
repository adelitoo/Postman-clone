import { SavedRequest } from "../types/types";
import MainContent from "./MainContent";
import { Sidebar } from "./Sidebar";

interface HTTPClientProps {
  sidebarVisible: boolean;
  collections: any[];
  loading: boolean;
  error: string | null;
  activeRequest: any;
  toggleSidebar: () => void;
  handleRequestSelect: (request: any) => void;
  handleCreateNewRequest: (collectionId: number) => Promise<void>;
  handleSaveRequest: (
    request: Omit<SavedRequest, "id">,
    collectionId: number
  ) => Promise<SavedRequest>;
  handleUpdateRequest: (request: SavedRequest) => Promise<SavedRequest>;
}

const HTTPClient: React.FC<HTTPClientProps> = ({
  sidebarVisible,
  collections,
  loading,
  error,
  activeRequest,
  toggleSidebar,
  handleRequestSelect,
  handleCreateNewRequest,
  handleSaveRequest,
  handleUpdateRequest,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isVisible={sidebarVisible}
        toggleVisibility={toggleSidebar}
        onRequestSelect={handleRequestSelect}
        onCreateNewRequest={handleCreateNewRequest}
        collections={collections}
        loading={loading}
        error={error}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 text-center">{error}</div>
        )}
        <MainContent
          collections={collections}
          onSaveRequest={handleSaveRequest}
          onUpdateRequest={handleUpdateRequest}
          activeRequest={activeRequest}
        />
      </div>
    </div>
  );
};

export default HTTPClient;
