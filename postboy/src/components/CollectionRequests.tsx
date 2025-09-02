import { SavedRequest } from "../types/types";
import { RequestItem } from "./RequestItem";

interface CollectionRequestsProps {
  requests: SavedRequest[];
  onRequestSelect: (request: SavedRequest) => void;
  onRequestDelete?: (requestId: string) => void;
}

const CollectionRequests = ({
  requests,
  onRequestSelect,
  onRequestDelete,
}: CollectionRequestsProps) => {
  if (requests.length === 0) {
    return (
      <div className="text-gray-400 text-sm p-2">
        No requests in this collection
      </div>
    );
  }

  return (
    <>
      {requests.map((request) => (
        <RequestItem
          key={request.id}
          request={request}
          onSelect={onRequestSelect}
          onDelete={onRequestDelete}
        />
      ))}
    </>
  );
};
export default CollectionRequests;

