export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestResponse {
  method: string;
  url: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  time: number;
  error?: string;
  type?: 'text' | 'image' | 'json' | 'html' | 'pdf';
}

export interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  queryParams: KeyValuePair[];
  headers: KeyValuePair[];
  bodyType?: BodyType;
  bodyContent?: BodyContent;
  collectionId: number;
}

export interface Collection {
  id: number;
  name: string;
  isOpen?: boolean;
  requests: SavedRequest[];
}

export type BodyType = 'none' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'binary';
export type BodyContent = string | FormData | URLSearchParams | KeyValuePair[];

export type ResponseTab = "body" | "headers" | "raw" | "preview" | "params";